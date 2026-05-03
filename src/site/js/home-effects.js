// Particles.js for cosmic knowledge constellation (lightweight, no deps)
(function() {
  if (!document.getElementById('particles-js')) return;

  const canvas = document.createElement('canvas');
  canvas.id = 'particles-canvas';
  canvas.style.position = 'absolute';
  canvas.style.inset = '0';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '1';
  document.querySelector('.particles-container').appendChild(canvas);

  const c = canvas.getContext('2d');
  let particles = [];
  const numParticles = 100;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.radius = Math.random() * 2 + 0.5;
      this.color = `hsl(${Math.random()*60 + 50}, 70%, 60%)`; // Gold-ish stars
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    draw() {
      c.save();
      c.globalAlpha = 0.8;
      c.fillStyle = this.color;
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      c.fill();
      c.restore();
    }
  }

  for (let i = 0; i < numParticles; i++) particles.push(new Particle());

  function animate() {
    c.fillStyle = 'rgba(26,26,46,0.1)';
    c.fillRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }
  animate();

  // Parallax on scroll (subtle)
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-bg');
    if (parallax) parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
  }, { passive: true });
})();
