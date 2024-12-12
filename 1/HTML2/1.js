const circleContainer = document.getElementById('circle-container');
const nextStepButton = document.getElementById('next-step');

let currentStep = 0;

// Função para criar um círculo com transições
function createCircle(x, y, size) {
  const circle = document.createElement('div');
  circle.className = 'circle hidden'; // Inicia com escala 0
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.left = `${x - size / 2}px`;
  circle.style.top = `${y - size / 2}px`;
  setTimeout(() => {
    circle.classList.add('visible'); // Faz o círculo aparecer suavemente
    circle.classList.remove('hidden');
  }, 50); // Pequeno atraso para animação
  return circle;
}

// Função para executar cada etapa
function executeStep(step) {
  // Esconde os círculos da etapa anterior
  const circles = circleContainer.querySelectorAll('.circle');
  circles.forEach(circle => {
    circle.classList.add('hidden');
    setTimeout(() => circle.remove(), 800); // Remove os círculos após a animação de ocultar
  });

  setTimeout(() => {
    switch (step) {
      case 0:
        break; // Apenas o fundo vazio
      case 1:
        circleContainer.appendChild(createCircle(360, 360, 240)); // Um círculo centralizado
        break;
      case 2:
        circleContainer.appendChild(createCircle(240, 360, 200));
        circleContainer.appendChild(createCircle(480, 360, 200)); // Dois círculos
        break;
      case 3:
        circleContainer.appendChild(createCircle(360, 260, 160));
        circleContainer.appendChild(createCircle(280, 420, 160));
        circleContainer.appendChild(createCircle(440, 420, 160)); // Três círculos em triângulo
        break;
      case 4:
        const positions = [
          [360, 240, 120],
          [300, 360, 120],
          [420, 360, 120],
          [360, 480, 120],
          [360, 360, 80]
        ];
        positions.forEach(([x, y, size]) =>
          circleContainer.appendChild(createCircle(x, y, size))
        ); // Cinco círculos
        break;
      case 5:
        for (let i = 0; i < 8; i++) {
          const angle = (i * Math.PI) / 3;
          const x = 360 + Math.cos(angle) * 120;
          const y = 360 + Math.sin(angle) * 120;
          circleContainer.appendChild(createCircle(x, y, 180));
          
        }
        break;
      default:
        currentStep = -1; // Reinicia o contador
    }
  }, 800); // Espera a animação anterior terminar
}

// Evento para avançar etapas
nextStepButton.addEventListener('click', () => {
  currentStep++;
  executeStep(currentStep);
});

// Inicializa no estado vazio
executeStep(currentStep);
