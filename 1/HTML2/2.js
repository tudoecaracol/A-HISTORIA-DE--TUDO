const canvas = document.getElementById('fibonacciCanvas');
const ctx = canvas.getContext('2d');

// Variáveis globais
const centerX = canvas.width / 2; // Centro do canvas
const centerY = canvas.height / 2;
const totalCircles = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144]; // Quantidade de círculos por etapa
let currentStep = 0; // Etapa atual
let circleData = []; // Para armazenar dados das bolas desenhadas

// Função para desenhar uma bola oca com borda preta
function drawBall(x, y, radius) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2); // Desenha o círculo
  ctx.fillStyle = "white"; // Cor interna da esfera
  ctx.fill(); // Preenche o interior da esfera
  ctx.strokeStyle = "black"; // Cor da borda
  ctx.lineWidth = 2; // Largura da borda
  ctx.stroke(); // Desenha a borda
}

// Função para posicionar as bolas de forma estética
function calculateCirclePosition(index, radius) {
  // Define a posição das bolas de maneira radial (em círculos concêntricos)
  const angle = (index * Math.PI * 2) / totalCircles[currentStep]; // Calcula o ângulo para cada bola
  const distance = 200; // Distância do centro

  const x = centerX + distance * Math.cos(angle);
  const y = centerY + distance * Math.sin(angle);

  return { x, y };
}

// Função para criar animação suave de transição
function animateStep(step, callback) {
  const currentCircleCount = totalCircles[step];

  // Animação para adicionar novos círculos
  let currentCircleIndex = 0;
  function animationFrame() {
    if (currentCircleIndex < currentCircleCount) {
      const radius = 20 + currentCircleIndex * 10; // Raio das bolas aumenta progressivamente
      const position = calculateCirclePosition(currentCircleIndex, radius);
      drawBall(position.x, position.y, radius); // Desenha a nova bola

      circleData.push({ x: position.x, y: position.y, radius }); // Armazena os dados da bola
      currentCircleIndex++;

      requestAnimationFrame(animationFrame); // Continua a animação
    } else {
      callback(); // Chama o próximo passo após desenhar todas as bolas
    }
  }
  requestAnimationFrame(animationFrame); // Inicia a animação
}

// Controlador das etapas
function nextStep() {
  if (currentStep < totalCircles.length) {
    animateStep(currentStep, () => {
      currentStep++;
      if (currentStep < totalCircles.length) {
        setTimeout(nextStep, 1000); // Tempo entre cada etapa
      }
    });
  } else {
    clearInterval(intervalId); // Finaliza a animação
  }
}

// Inicia a animação ao clicar no botão
document.getElementById('startAnimation').addEventListener('click', () => {
  currentStep = 0; // Reinicia a animação
  circleData = []; // Limpa o array de bolas
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa o canvas
  intervalId = setInterval(nextStep, 1000); // Intervalo entre as etapas
});
