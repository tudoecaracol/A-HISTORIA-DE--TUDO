//Funções de Interação e Personalização


// Alterar o sentido da espiral
function mudarSentido() {
    sentidoHorario = !sentidoHorario; // Alterna entre horário e anti-horário
}

// Ativar festa aleatória
function festaAleatoria() {
    if (festaAtiva) return;
    festaAtiva = true;

    const loopFesta = () => {
        if (!festaAtiva) return;

        if (document.getElementById('colorOscillation').checked) {
            espiralColor = getRandomColor();
            document.getElementById('colorPicker').value = espiralColor;
        }
        if (document.getElementById('frequencyOscillation').checked) {
            frequencyRange = getRandomInRange(20, 2000);
            document.getElementById('frequencyRange').value = frequencyRange;
        }
        if (document.getElementById('speedOscillation').checked) {
            spiralSpeed = parseFloat(getRandomInRange(0.05, 0.5).toFixed(2));
            document.getElementById('spiralSpeed').value = spiralSpeed;
        }

        setTimeout(loopFesta, 500); // Repetição contínua
    };

    loopFesta();
}

// Parar a festa aleatória
function pararFesta() {
    festaAtiva = false;
}

// Gerar uma cor aleatória
function getRandomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

// Gerar um valor aleatório em um intervalo
function getRandomInRange(min, max) {
    return Math.random() * (max - min) + min;
}

// Girar o canvas continuamente
function girarCanvas() {
    rotacaoCanvas += 0.01; // Incremento do ângulo de rotação
    requestAnimationFrame(girarCanvas); // Chama novamente para manter a rotação
}
