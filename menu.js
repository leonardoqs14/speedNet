// Mobile menu functionality
const btnMenu = document.getElementById('btn-menu');
const menu = document.getElementById('menu-mobile');
const overlay = document.getElementById('overlay-menu');

if (btnMenu) {
  btnMenu.addEventListener('click', () => {
    menu.classList.add('abrir-menu');
  });
}

if (menu) {
  menu.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' || e.target.closest('.btn-fechar')) {
      menu.classList.remove('abrir-menu');
    }
  });
}

if (overlay) {
  overlay.addEventListener('click', () => {
    menu.classList.remove('abrir-menu');
  });
}

// Accordion functionality
function initAccordion() {
  const tabs = document.querySelectorAll('.tab input');
  tabs.forEach((tab) => {
    tab.addEventListener('change', (e) => {
      const activeLabel = e.target.nextElementSibling;
      if (e.target.checked) {
        // Close other tabs in same group
        const group = e.target.name;
        document.querySelectorAll(`input[name="${group}"]:checked`).forEach((otherTab) => {
          if (otherTab !== e.target) {
            otherTab.checked = false;
          }
        });
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', initAccordion);

// Contact form to WhatsApp
function enviarWhats(event) {
  event.preventDefault();

  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const mensagem = document.getElementById('mensagem').value;
  const telefone = '5561991043595';

  if (!nome || !mensagem) {
    alert('Por favor, preencha todos os campos obrigatórios');
    return;
  }

  const texto = `Olá! Me chamo ${nome}, meu email é ${email}. ${mensagem}`;
  const msgFormatada = encodeURIComponent(texto);
  const url = `https://api.whatsapp.com/send?phone=${telefone}&text=${msgFormatada}`;

  window.open(url, '_blank');

  // Clear form
  document.getElementById('formulario').reset();
}

// Hero slider functionality
function initSlider() {
  const sliderTrack = document.querySelector('.slider-track');
  const slides = document.querySelectorAll('.slide');

  if (!sliderTrack || slides.length === 0) return;

  let index = 0;
  let slideCount = slides.length / 2; // Counts only original images

  // Clone slides for infinite loop
  slides.forEach((slide) => {
    const clone = slide.cloneNode(true);
    sliderTrack.appendChild(clone);
  });

  function moveToSlide(i) {
    sliderTrack.style.transition = 'transform 0.5s ease-in-out';
    sliderTrack.style.transform = `translateX(-${i * 100}%)`;
  }

  function nextSlide() {
    index++;
    moveToSlide(index);

    // Reset to beginning when reaching clones
    if (index === slideCount) {
      setTimeout(() => {
        sliderTrack.style.transition = 'none';
        sliderTrack.style.transform = 'translateX(0)';
        index = 0;
      }, 500);
    }
  }

  // Auto-play slider every 5 seconds
  const slideInterval = setInterval(nextSlide, 5000);

  // Pause on hover/focus
  sliderTrack.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
  });

  sliderTrack.addEventListener('mouseleave', () => {
    setInterval(nextSlide, 5000);
  });
}

document.addEventListener('DOMContentLoaded', initSlider);

// Smooth scroll behavior for anchor links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && document.querySelector(href)) {
        e.preventDefault();
        const target = document.querySelector(href);
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
        
        // Close mobile menu if open
        const menu = document.getElementById('menu-mobile');
        if (menu && menu.classList.contains('abrir-menu')) {
          menu.classList.remove('abrir-menu');
        }
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', initSmoothScroll);

// Reveal elements on scroll
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.card-plano, .cards, .review-card, .qualidade-card, .cobertura-info');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealElements.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'all 0.6s ease-out';
      observer.observe(el);
    });
  }
}

document.addEventListener('DOMContentLoaded', initScrollReveal);

// Lazy loading for images with data-src
function initLazyLoading() {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          observer.unobserve(img);
        }
      });
    }, { rootMargin: '50px' });

    document.querySelectorAll('img[data-src]').forEach((img) => {
      imageObserver.observe(img);
    });
  }
}

document.addEventListener('DOMContentLoaded', initLazyLoading);

// Performance: Debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Handle active navigation link on scroll
function initActiveNav() {
  const navLinks = document.querySelectorAll('.menuDesktop a[href^="#"], .menu-mobile a[href^="#"]');
  
  window.addEventListener('scroll', debounce(() => {
    let currentSection = '';
    
    document.querySelectorAll('section[id]').forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (window.pageYOffset >= sectionTop - 200) {
        currentSection = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }, 200));
}

document.addEventListener('DOMContentLoaded', initActiveNav);

// WhatsApp button widget configuration
(function () {
  const options = {
    base: {
      selectedChannels: ['whatsapp'],
      config: null,
    },
    customize: {
      buttonColor: '#4dc247',
      buttonImage: null,
      buttonStyle: 'classic',
      buttonText: 'Fale Conosco',
      closeText: 'Fechar',
      animationEnabled: true,
      animationType: 'moveIn',
      borderEnabled: false,
      notificationEnabled: true,
      backgroundStyle: 'solid',
      buttonSize: 60,
      shadow: 0.4,
      position: 'right',
      shiftX: 0,
      shiftY: 0,
      showMode: 'all',
      showOn: '',
      dontShowOn: '',
    },
    boost: {
      greetingEnabled: true,
      displayFrequency: 'every_3_hours',
      greetingDelay: 3,
      startChatText: 'Falar com Atendente',
      greetingMessage: 'Olá 👋 Como podemos ajudar? Envie-nos uma mensagem agora mesmo para obter assistência.',
      mirrorEnabled: false,
      agentName: 'SpeedNet',
      agentPosition: 'Atendimento',
      callToAction: 'Fale Conosco',
      googleAnalyticsEnabled: false,
      websiteUrl: 'https://speed-net-snowy.vercel.app',
    },
    apps: {
      whatsapp: {
        numbers: ['+5561991043595'],
        globalConfig: {
          buttonColor: '#4dc247',
          hoverText: 'WhatsApp SpeedNet',
          buttonImage: '',
          formTitle: 'Comece uma conversa',
          popupSubtitle: 'Clique para falar com nosso atendente',
        },
        agentConfigs: [
          {
            agentName: 'Atendimento SpeedNet',
            agentPosition: 'Suporte',
            preFilledMessage: 'Olá! Gostaria de falar com um atendente da SpeedNet.',
            agentAvatar: '',
          },
        ],
      },
    },
    displayRules: {
      showMode: 'all',
      include: [],
      exclude: [],
    },
    meta: {
      version: 1,
    },
  };

  window.ButtonKitWidgetOptions = window.ButtonKitWidgetOptions || [];
  window.ButtonKitWidgetOptions.push(options);

  // Load WhatsApp widget script with performance optimization
  function loadWhatsAppWidget() {
    const script = document.createElement('script');
    script.src = 'https://waplus.oss-us-west-1.aliyuncs.com/mix_deck/widget-loader.min.js';
    script.async = true;
    script.defer = true;
    script.setAttribute('data-buttonkit', 'widget-loader');

    const firstScript = document.getElementsByTagName('script')[0];
    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript);
    } else if (document.head) {
      document.head.appendChild(script);
    }
  }

  // Lazy load widget after page is fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadWhatsAppWidget);
  } else {
    loadWhatsAppWidget();
  }
})();

// Monitor Core Web Vitals
if ('PerformanceObserver' in window) {
  try {
    // Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
    });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

    // First Input Delay
    const fidObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        console.log('FID:', entry.processingDuration);
      });
    });
    fidObserver.observe({ entryTypes: ['first-input'] });

    // Cumulative Layout Shift
    const clsObserver = new PerformanceObserver((list) => {
      let cls = 0;
      list.getEntries().forEach((entry) => {
        if (!entry.hadRecentInput) {
          cls += entry.value;
        }
      });
      console.log('CLS:', cls);
    });
    clsObserver.observe({ entryTypes: ['layout-shift'] });
  } catch (e) {
    console.log('PerformanceObserver not fully supported');
  }
}

// Detect mobile device
function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Optimize for mobile
if (isMobileDevice()) {
  document.addEventListener('DOMContentLoaded', () => {
    const desktopSlides = document.querySelectorAll('.slide.desktop');
    desktopSlides.forEach(slide => slide.style.display = 'none');
  });
}

// Accessibility: Add skip to main link
function addAccessibilityFeatures() {
  // Skip link already in HTML
  
  // Add focus visible styles
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-nav');
    }
  });
  
  document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
  });
}

document.addEventListener('DOMContentLoaded', addAccessibilityFeatures);

// Service Worker registration for PWA capabilities
if ('serviceWorker' in navigator && location.protocol === 'https:') {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((reg) => {
        console.log('Service Worker registered successfully');
      })
      .catch((err) => {
        console.log('Service Worker registration failed:', err);
      });
  });
}

// Prefetch important links for performance
function prefetchLinks() {
  const prefetchLinks = document.querySelectorAll('a[data-prefetch]');
  
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      prefetchLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && !href.startsWith('http')) {
          const prefetch = document.createElement('link');
          prefetch.rel = 'prefetch';
          prefetch.href = href;
          document.head.appendChild(prefetch);
        }
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', prefetchLinks);

// Export functions for use in HTML
window.enviarWhats = enviarWhats;
