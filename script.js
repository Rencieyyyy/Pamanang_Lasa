const burger = document.getElementById('burger-menu');
const navLinks = document.getElementById('nav-links');

burger.addEventListener('click', () => {
    // Toggle the classes
    burger.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    // Accessibility: update aria-expanded
    const isOpen = navLinks.classList.contains('active');
    burger.setAttribute('aria-expanded', isOpen);
});

// Close menu when a link is clicked (Mobile UX)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        burger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Filter tabs
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });
 
  // Add to cart
  let toastTimer;
  function addToCart(btn) {
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
  }
 
  // Scroll reveal
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.08 });
 
  document.querySelectorAll('.product-card, .gift-banner, .about-inner > *').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(32px)';
    el.style.transition = `opacity 0.7s ease ${i * 0.1}s, transform 0.7s ease ${i * 0.1}s`;
    observer.observe(el);
  });

  function handleContactSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const data = new FormData(form);
  const subject = encodeURIComponent('Gintong Sarap Inquiry: ' + (data.get('subject') || 'General'));
  const body = encodeURIComponent(
    'Name: ' + data.get('firstName') + ' ' + data.get('lastName') + '\n' +
    'Phone: ' + (data.get('phone') || 'N/A') + '\n' +
    'Subject: ' + (data.get('subject') || 'N/A') + '\n\n' +
    'Message:\n' + data.get('message')
  );
  window.open('mailto:lioneleemn@gmail.com?subject=' + subject + '&body=' + body);
  form.reset();
  const toast = document.getElementById('gs-toast');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}

document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // 1. Remove 'active' class from all buttons and add to the clicked one
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      // 2. Filter the cards
      productCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');

        if (filterValue === 'all' || filterValue === cardCategory) {
          card.style.display = 'block';
          // Optional: Add a small fade-in animation
          card.style.opacity = '0';
          setTimeout(() => { card.style.opacity = '1'; }, 10);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
});