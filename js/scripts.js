AOS.init();

// Burger menu
const burgerMenu = document.querySelector('#showBtn');
const backdrop = document.querySelector('.backdrop');
const menuBody = document.getElementById('menu');
let clickCountMenu = 0;

burgerMenu.addEventListener('click', function () {
  clickCountMenu++;
  if (clickCountMenu % 2 !== 0) {
    backdrop.style.opacity = 1;
    backdrop.style.pointerEvents = 'all';
    menuBody.style.pointerEvents = 'all';
    menuBody.style.display = 'block';
  } else {
    backdrop.style.opacity = 0;
    backdrop.style.pointerEvents = 'none';
    menuBody.style.pointerEvents = 'none';
    menuBody.style.display = 'none';
  }
  console.log('click');
});

backdrop.addEventListener('click', function () {
  if (clickCountMenu % 2 !== 0) {
    clickCountMenu++;
    burgerMenu.checked = false;
    backdrop.style.opacity = 0;
    backdrop.style.pointerEvents = 'none';
    menuBody.style.pointerEvents = 'none';
    menuBody.style.display = 'none';
  }
});

const links = document.querySelectorAll('.nav-box--link');

links.forEach(function (el) {
  el.addEventListener('click', function () {
    clickCountMenu++;
    burgerMenu.checked = false;
    backdrop.style.opacity = 0;
    backdrop.style.pointerEvents = 'none';
    menuBody.style.pointerEvents = 'none';
    menuBody.style.display = 'none';
  });
});

// Плавна прокрутка до блоку
const anchors = document.querySelectorAll('a[href*="#s-"]');

for (let anchor of anchors) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const blockID = anchor.getAttribute('href');
    document.querySelector('' + blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  });
}

// Прокрутка до першого блоку стрілкою
const arrowScroll = document.querySelector('.hero--arrow-down');
arrowScroll.addEventListener('click', (e) => {
  console.log('click', arrowScroll);
  e.preventDefault;
  document.querySelector('#s-rental').scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
});

// Активний клас для навігації при скролі
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        document.querySelectorAll('a[href*="#s-"]').forEach((link) => {
          // Забираємо хештег і зрівнюємо id
          if (link.getAttribute('href').replace('#', '') === entry.target.id) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  },
  {
    threshold: 0.5,
  }
);

document.querySelectorAll('section').forEach((section) => {
  observer.observe(section);
});
