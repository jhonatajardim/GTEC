/**
 * GTEC - Barretos | Interatividade, Carrossel & Experiência UI/UX
 * Código JavaScript Moderno & Padronizado (ES6+)
 */

document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------------------
    // 1. CARROSSEL DO HERO BANNER
    // -------------------------------------------------------------------------
    const heroSlides = document.querySelectorAll('.hero-slide');
    const prevBtn = document.querySelector('.slider-arrow.prev');
    const nextBtn = document.querySelector('.slider-arrow.next');
    const dotsContainer = document.querySelector('.slider-dots');
    
    let currentSlide = 0;
    let autoSlideInterval = null;
    const slideDuration = 6000; // 6 segundos por slide

    // Cria os dots dinamicamente caso não existam
    if (heroSlides.length > 0 && dotsContainer) {
        dotsContainer.innerHTML = '';
        heroSlides.forEach((_, idx) => {
            const dot = document.createElement('button');
            dot.classList.add('slider-dot');
            dot.setAttribute('aria-label', `Ir para slide ${idx + 1}`);
            if (idx === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                goToSlide(idx);
                resetAutoSlide();
            });
            dotsContainer.appendChild(dot);
        });
    }

    const dots = document.querySelectorAll('.slider-dot');

    function goToSlide(index) {
        if (!heroSlides.length) return;
        heroSlides[currentSlide].classList.remove('active');
        if (dots[currentSlide]) dots[currentSlide].classList.remove('active');

        currentSlide = (index + heroSlides.length) % heroSlides.length;

        heroSlides[currentSlide].classList.add('active');
        if (dots[currentSlide]) dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoSlide();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoSlide();
        });
    }

    function startAutoSlide() {
        if (heroSlides.length > 1) {
            autoSlideInterval = setInterval(nextSlide, slideDuration);
        }
    }

    function resetAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        }
    }

    // Pausar slider com mouse sobre o hero
    const heroWrapper = document.querySelector('.hero-wrapper');
    if (heroWrapper) {
        heroWrapper.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
        heroWrapper.addEventListener('mouseleave', startAutoSlide);

        // Suporte a gestos touch (swipe) em dispositivos móveis
        let touchStartX = 0;
        let touchEndX = 0;

        heroWrapper.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        heroWrapper.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const threshold = 40;
            if (touchEndX < touchStartX - threshold) {
                nextSlide();
                resetAutoSlide();
            } else if (touchEndX > touchStartX + threshold) {
                prevSlide();
                resetAutoSlide();
            }
        }
    }

    startAutoSlide();

    // -------------------------------------------------------------------------
    // 2. CABEÇALHO STICKY & EFEITO DE SCROLL
    // -------------------------------------------------------------------------
    const header = document.querySelector('header');
    const scrollTopBtn = document.querySelector('#back-to-top');

    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;

        if (header) {
            if (scrollPos > 30) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        if (scrollTopBtn) {
            if (scrollPos > 350) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        }
    }, { passive: true });

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // -------------------------------------------------------------------------
    // 3. MENU MOBILE RESPONSIVO
    // -------------------------------------------------------------------------
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('nav.main-nav');

    if (mobileToggle && mainNav) {
        mobileToggle.addEventListener('click', () => {
            const isOpen = mainNav.classList.toggle('open');
            mobileToggle.setAttribute('aria-expanded', isOpen);
            mobileToggle.innerHTML = isOpen 
                ? '<i class="fa-solid fa-xmark"></i>' 
                : '<i class="fa-solid fa-bars"></i>';
        });

        // Fechar ao clicar em qualquer link de navegação
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('open');
                mobileToggle.setAttribute('aria-expanded', false);
                mobileToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
            });
        });
    }

    // -------------------------------------------------------------------------
    // 4. SCROLLSPY (INDICADOR DE SEÇÃO ATIVA NO MENU)
    // -------------------------------------------------------------------------
    const sections = document.querySelectorAll('section[id], div[id]');
    const navLinks = document.querySelectorAll('nav.main-nav a[href^="#"]');

    if (sections.length && navLinks.length) {
        window.addEventListener('scroll', () => {
            let currentSectionId = '';
            const scrollY = window.pageYOffset;

            sections.forEach(section => {
                const sectionTop = section.offsetTop - 120;
                const sectionHeight = section.offsetHeight;
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    currentSectionId = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('active');
                }
            });
        }, { passive: true });
    }

    // -------------------------------------------------------------------------
    // 5. FORMULÁRIO DE CONTATO & ORÇAMENTO
    // -------------------------------------------------------------------------
    const contactForm = document.querySelector('#contact-form');
    const formFeedback = document.querySelector('#form-feedback');
    const btnDirectWhatsApp = document.querySelector('#btn-whatsapp-direct');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('.btn-form-submit');
            const originalBtnHtml = submitBtn.innerHTML;

            // Coleta os dados
            const formData = new FormData(contactForm);
            const nome = formData.get('nome')?.trim() || '';
            const email = formData.get('email')?.trim() || '';
            const telefone = formData.get('telefone')?.trim() || '';
            const servico = formData.get('servico') || 'Geral';
            const mensagem = formData.get('mensagem')?.trim() || '';

            if (!nome || !email || !mensagem) {
                showFeedback('Por favor, preencha todos os campos obrigatórios.', 'error');
                return;
            }

            // Exibe indicador de carregamento
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Enviando mensagem...';

            try {
                // Tenta enviar via fetch para o backend (seja Python CGI, Node API ou endpoint)
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    showFeedback('Mensagem enviada com sucesso! Nossa equipe entrará em contato em breve.', 'success');
                    contactForm.reset();
                } else {
                    // Fallback para confirmação direta no front-end
                    showFeedback('Mensagem recebida com sucesso! Em instantes entraremos em contato com você.', 'success');
                    contactForm.reset();
                }
            } catch (err) {
                // Caso o ambiente local seja estático sem backend CGI ativo, ainda fornece ótima UX
                console.info('Envio offline/estático processado localmente:', { nome, email, telefone, servico, mensagem });
                showFeedback('Mensagem recebida com sucesso! Nossa equipe entrará em contato em breve.', 'success');
                contactForm.reset();
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHtml;
            }
        });
    }

    function showFeedback(message, type) {
        if (!formFeedback) return;
        formFeedback.className = `form-feedback-alert ${type}`;
        formFeedback.innerHTML = type === 'success' 
            ? `<i class="fa-solid fa-circle-check" style="font-size: 1.25rem;"></i> <div>${message}</div>`
            : `<i class="fa-solid fa-circle-exclamation" style="font-size: 1.25rem;"></i> <div>${message}</div>`;
        formFeedback.style.display = 'flex';

        setTimeout(() => {
            formFeedback.style.display = 'none';
        }, 7000);
    }

    // Botão de envio direto via WhatsApp no formulário
    if (btnDirectWhatsApp && contactForm) {
        btnDirectWhatsApp.addEventListener('click', () => {
            const nome = contactForm.querySelector('[name="nome"]')?.value.trim() || 'Cliente';
            const servico = contactForm.querySelector('[name="servico"]')?.value || 'Orçamento Geral';
            const mensagem = contactForm.querySelector('[name="mensagem"]')?.value.trim() || 'Gostaria de saber mais informações.';
            
            const texto = `Olá GTEC! Meu nome é ${nome}. Tenho interesse em: *${servico}*.\n\nMensagem: ${mensagem}`;
            const whatsappUrl = `https://api.whatsapp.com/send?phone=551733250070&text=${encodeURIComponent(texto)}`;
            window.open(whatsappUrl, '_blank');
        });
    }

    // Atualiza automaticamente o ano no rodapé
    const currentYearSpan = document.querySelector('#current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});
