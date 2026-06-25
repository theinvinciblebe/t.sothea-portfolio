function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}
// Scroll to top
document.getElementById('scrollUp').addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Scroll to bottom
document.getElementById('scrollDown').addEventListener('click', function () {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'  
    });
});

window.addEventListener('scroll', function () {
    let scrollUp = document.getElementById('scrollUp');

    if (window.scrollY > 200) {
        scrollUp.style.display = 'block';
    } else {
        scrollUp.style.display = 'none';
    }
});

    const swiper = new Swiper(".projectSwiper", {
      loop: true,
      spaceBetween: 30,

      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },

      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },

      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },

      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1200: {
          slidesPerView: 3,
        },
      },
    });
