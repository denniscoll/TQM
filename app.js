
const canvas = document.getElementById("fondo-estrellas");
const ctx = canvas.getContext("2d");

function ajustarCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

ajustarCanvas();

let estrellas = [];

function generarEstrellas() {
  estrellas = [];
  for (let i = 0; i < 200; i++) {
    estrellas.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random(),
      delta: Math.random() * 0.02
    });
  }
}

generarEstrellas();

function animarEstrellas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let estrella of estrellas) {
    estrella.alpha += estrella.delta;
    if (estrella.alpha <= 0 || estrella.alpha >= 1) {
      estrella.delta *= -1;
    }
    ctx.beginPath();
    ctx.arc(estrella.x, estrella.y, estrella.radius, 0, 2 * Math.PI);
    ctx.fillStyle = `rgba(255, 255, 255, ${estrella.alpha})`;
    ctx.fill();
  }
  requestAnimationFrame(animarEstrellas);
}

animarEstrellas();


window.addEventListener("resize", () => {
  ajustarCanvas();
  generarEstrellas();
});


const mainHeart = document.getElementById("main-heart");
const container = document.getElementById("container");
const message = document.getElementById("message");

mainHeart.addEventListener("click", () => {
  mainHeart.classList.add("growing");

  setTimeout(() => {
    mainHeart.remove();
    lanzarParticulas(250); 
    mostrarMensaje("¡TE QUIERO MUCHO! 💖");
  }, 1500);
});

function lanzarParticulas(cantidad) {
  const centroX = window.innerWidth / 2;
  const centroY = window.innerHeight / 2;

  for (let i = 0; i < cantidad; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");
    container.appendChild(particle);

    let x = centroX;
    let y = centroY;

    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 6 + 2;
    let vx = Math.cos(angle) * speed;
    let vy = Math.sin(angle) * speed;

    const gravity = 0.05 + Math.random() * 0.05;
    let opacity = 1;
    const lifespan = 500 + Math.random() * 3000;

    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;

    let start = Date.now();

    function animar() {
      const tiempo = Date.now() - start;

      if (x <= 0 || x >= window.innerWidth - 20) vx *= -1;
      if (y <= 0 || y >= window.innerHeight - 20) vy *= -1;

      vy += gravity;
      x += vx;
      y += vy;

      opacity -= 0.002;

      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.opacity = opacity;

      if (tiempo < lifespan && opacity > 0) {
        requestAnimationFrame(animar);
      } else {
        particle.remove();
      }
    }

    animar();
  }
}

function mostrarMensaje(texto) {
  message.innerText = texto;
  message.style.display = "block";
  message.classList.add("visible");
}
