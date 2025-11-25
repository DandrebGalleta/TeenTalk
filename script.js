const navbar = document.querySelector('.navbar');
const links = document.querySelectorAll('.navbar a');
const homeSection = document.getElementById('home');
const joinBtn = document.querySelector('.join-btn');
const loginBtn = document.querySelector('.btn-outline');
const signupBtn = document.querySelector('.btn-fill');
const heroSection = document.getElementById('home');

links.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    links.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    const targetId = link.getAttribute('href').substring(1);
    const target = document.getElementById(targetId);
    const navbarHeight = navbar.offsetHeight;
    const targetPosition = target.offsetTop - navbarHeight;
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  });
});

window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;
  const navbarHeight = navbar.offsetHeight;
  if(scrollPosition >= homeSection.offsetHeight) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

joinBtn.addEventListener('click', () => {
  const navbarHeight = navbar.offsetHeight;
  const targetPosition = heroSection.offsetTop - navbarHeight;
  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  });
  setTimeout(() => {
    [loginBtn, signupBtn].forEach(btn => {
      btn.classList.add('btn-breathe');
      btn.addEventListener('animationend', () => {
        btn.classList.remove('btn-breathe');
      }, { once: true });
    });
  }, 600);
});
