const slider = document.querySelector('.slider');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentIndex = 0;

function slideTo(index) {
    currentIndex = index;
    const translateX = -currentIndex * 100;
    slider.style.transform = `translateX(${translateX}%)`;
}

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % 3;
    slideTo(currentIndex);
});

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + 3) % 3;
    slideTo(currentIndex);
});
