// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// Mobile menu toggle
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
burger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// Scroll reveal
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(
  '#about .about-grid, #projects .project-card, #test .quiz-wrapper, #contact .contact-inner, .stats-row'
).forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// ── Fabric quiz ──
const answers = {};
let currentStep = 1;
const totalSteps = 3;

const fabricResults = {
  // [use][priority] → result
  apparel: {
    luxury:      { title: 'Lumière Silk',    desc: 'Hand-woven Suzhou silk — the pinnacle of apparel elegance. Breathable, lustrous, and unmistakably premium.' },
    durability:  { title: 'Alpine Merino',   desc: 'Ultra-fine 17.5-micron merino delivers both softness and remarkable durability for high-wear apparel.' },
    sustainability: { title: 'Terra Linen',  desc: 'GOTS-certified organic linen — carbon-light and getting softer with every wash.' },
    performance: { title: 'Alpine Merino',   desc: 'Natural thermoregulation and moisture-wicking make merino the top-tier performance fabric.' },
  },
  home: {
    luxury:      { title: 'Dusk Velvet',     desc: 'Deep-pile cut velvet with moisture-resistant treatment — opulent and practical for interiors.' },
    durability:  { title: 'Canvas Studio',   desc: 'Heavy-weight recycled cotton canvas built to last decades in high-traffic interior applications.' },
    sustainability: { title: 'Terra Linen',  desc: 'Organic linen breathes beautifully in home environments and biodegrade when it eventually reaches end-of-life.' },
    performance: { title: 'Canvas Studio',   desc: 'Structural, cleanable, and resilient — the workhorse for performance home textiles.' },
  },
  accessories: {
    luxury:      { title: 'Heritage Jacquard', desc: 'Digitally-programmed jacquard patterns elevate any accessory into a statement piece.' },
    durability:  { title: 'Canvas Studio',   desc: 'Recycled canvas handles daily wear beautifully — ideal for bags, straps, and hard-use accessories.' },
    sustainability: { title: 'Terra Linen',  desc: 'Certified organic linen is lightweight, sturdy, and tells a credible sustainability story for your brand.' },
    performance: { title: 'Alpine Merino',   desc: 'Fine merino wool regulates temperature and resists odour — perfect for scarves and travel accessories.' },
  },
  industrial: {
    luxury:      { title: 'Heritage Jacquard', desc: 'Precision-woven technical jacquard for custom-specification industrial textile applications.' },
    durability:  { title: 'Canvas Studio',   desc: 'Heavy recycled cotton canvas excels in industrial contexts requiring structural textile strength.' },
    sustainability: { title: 'Terra Linen',  desc: 'Organic linen\'s natural properties make it ideal for sustainable industrial and filtration uses.' },
    performance: { title: 'Canvas Studio',   desc: 'Proven tensile strength and chemical resistance make canvas the industrial benchmark.' },
  },
};

function showStep(n) {
  document.querySelectorAll('.quiz-step').forEach(s => s.classList.remove('active'));
  const step = document.getElementById(`step-${n}`);
  if (step) step.classList.add('active');

  const fill = Math.round(((n - 1) / totalSteps) * 100);
  document.getElementById('progressFill').style.width = fill + '%';
  document.getElementById('progressLabel').textContent = `Step ${n} of ${totalSteps}`;
}

function showResult() {
  document.querySelectorAll('.quiz-step').forEach(s => s.classList.remove('active'));
  document.getElementById('progressFill').style.width = '100%';
  document.getElementById('progressLabel').textContent = 'Complete';

  const use = answers[1] || 'apparel';
  const priority = answers[2] || 'luxury';
  const result = (fabricResults[use] && fabricResults[use][priority])
    ? fabricResults[use][priority]
    : { title: 'Lumière Silk', desc: 'A versatile premium fabric suited to a wide range of applications.' };

  document.getElementById('resultTitle').textContent = `Your match: ${result.title}`;
  document.getElementById('resultDesc').textContent = result.desc;

  const quizResult = document.getElementById('quizResult');
  quizResult.classList.add('visible');
}

document.querySelectorAll('.q-option').forEach(btn => {
  btn.addEventListener('click', () => {
    const step = parseInt(btn.dataset.step);
    const value = btn.dataset.value;

    btn.closest('.quiz-options').querySelectorAll('.q-option').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    answers[step] = value;

    setTimeout(() => {
      if (step < totalSteps) {
        currentStep = step + 1;
        showStep(currentStep);
      } else {
        showResult();
      }
    }, 300);
  });
});

document.getElementById('retakeBtn').addEventListener('click', () => {
  Object.keys(answers).forEach(k => delete answers[k]);
  currentStep = 1;
  document.querySelectorAll('.q-option').forEach(b => b.classList.remove('selected'));
  document.getElementById('quizResult').classList.remove('visible');
  showStep(1);
});

// Contact form
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const success = document.getElementById('formSuccess');
  success.classList.add('visible');
  e.target.reset();
  setTimeout(() => success.classList.remove('visible'), 5000);
});
