const audio = document.getElementById('audioPlayer');
const progressBar = document.getElementById('progressBar');
const status = document.getElementById('status');
const scaleValue = document.getElementById('scaleValue');
const canvas = document.getElementById('spiralCanvas');
const ctx = canvas.getContext('2d');

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const audioSource = audioContext.createMediaElementSource(audio);
const analyser = audioContext.createAnalyser();

audioSource.connect(analyser);
analyser.connect(audioContext.destination);

analyser.fftSize = 512;
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

let isAudioContextResumed = false;

let angle = 0;
let radius = 5;
let centerX = canvas.width / 2;
let centerY = canvas.height / 2;

const maxRadius = Math.min(canvas.width, canvas.height) / 2 - 10;
let currentRadius = radius;
let bolinhas = [];

let espiralColor = '#ff5733';
let frequencyRange = 500;
let spiralSpeed = 0.1;

function tocarMusica() {
    if (audioContext.state === 'suspended' && !isAudioContextResumed) {
        audioContext.resume().then(() => {
            isAudioContextResumed = true;
            audio.play();
            status.innerHTML = "Música tocando...";
            analisarRitmo();
        });
    } else {
        audio.play();
        status.innerHTML = "Música tocando...";
        analisarRitmo();
    }
}

function pausarMusica() {
    audio.pause();
    status.innerHTML = "Música pausada";
}

function analisarRitmo() {
    if (!audio.paused) {
        analyser.getByteFrequencyData(dataArray);

        let totalAmplitude = 0;
        for (let i = 0; i < bufferLength; i++) {
            if (i > frequencyRange) break;
            totalAmplitude += dataArray[i];
        }

        const averageAmplitude = totalAmplitude / bufferLength;
        let progress = (averageAmplitude / 255) * 100;
        progressBar.style.width = Math.min(progress, 100) + '%';

        const scale = Math.floor((averageAmplitude / 255) * 10);
        scaleValue.innerHTML = scale;

        atualizarEspiral(scale);

        requestAnimationFrame(analisarRitmo);
    }
}

function atualizarEspiral(intensidade) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < bolinhas.length; i++) {
        const bolinha = bolinhas[i];
        const perspectiva = 1 / (1 + bolinha.z * 0.01);
        const tamanhoBolinha = 5 * perspectiva;

        ctx.beginPath();
        ctx.arc(bolinha.x, bolinha.y, tamanhoBolinha, 0, 2 * Math.PI);
        ctx.fillStyle = espiralColor;
        ctx.fill();
    }

    for (let i = 0; i < intensidade; i++) {
        angle += spiralSpeed;
        currentRadius += 0.5;

        if (currentRadius > maxRadius) {
            currentRadius = 5;
        }

        const x = centerX + currentRadius * Math.cos(angle);
        const y = centerY + currentRadius * Math.sin(angle);
        const z = currentRadius;

        bolinhas.push({ x, y, z });

        if (bolinhas.length > 500) {
            bolinhas.shift();
        }
    }
}

document.getElementById('colorPicker').addEventListener('input', (event) => {
    espiralColor = event.target.value;
});

document.getElementById('frequencyRange').addEventListener('input', (event) => {
    frequencyRange = event.target.value;
});

document.getElementById('spiralSpeed').addEventListener('input', (event) => {
    spiralSpeed = parseFloat(event.target.value);
});


musicUploader.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const fileURL = URL.createObjectURL(file);

        // Pausa a música atual, caso esteja tocando
        audio.pause();

        // Define a nova fonte e carrega o arquivo
        audio.src = fileURL;
        audio.load();

        // Atualiza o status com o nome da nova música
        status.innerHTML = `Música carregada: ${file.name}`;

        // Reinicia o contexto de áudio, se necessário
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }
    } else {
        status.innerHTML = "Nenhuma música carregada.";
    }
});



// Variáveis globais para armazenar o intervalo de oscilação
let oscillationInterval;
let isOscillating = false;

// Função para alternar entre os valores crescentes e decrescentes
function festaAleatoria() {
    if (isOscillating) {
        clearInterval(oscillationInterval);  // Para a oscilação se já estiver em andamento
        isOscillating = false;
    } else {
        isOscillating = true;
        
        // Inicia a oscilação a cada 100ms
        oscillationInterval = setInterval(() => {
            // Atualiza a cor, frequência e velocidade com valores progressivos
            atualizarOscilacao();
        }, 100);
    }
}

// Função para atualizar a oscilação das propriedades (cor, frequência, velocidade)
let direction = 1; // 1 para crescente, -1 para decrescente
let step = 10; // Passo da oscilação (tamanho da variação)

function atualizarOscilacao() {
    // Atualizando a cor da espiral com um padrão
    let currentColor = hexToRgb(espiralColor);
    currentColor.r += direction * step;
    currentColor.g -= direction * step;
    currentColor.b += direction * step;

    // Limite de oscilação para RGB (de 0 a 255)
    if (currentColor.r > 255 || currentColor.r < 0) {
        direction *= -1;  // Inverte a direção
    }

    espiralColor = rgbToHex(currentColor.r, currentColor.g, currentColor.b);

    // Atualizando a faixa de frequência
    frequencyRange += direction * step;
    if (frequencyRange > 2000 || frequencyRange < 20) {
        direction *= -1;
    }

    // Atualizando a velocidade da espiral
    spiralSpeed += direction * 0.01;
    if (spiralSpeed > 0.5 || spiralSpeed < 0.05) {
        direction *= -1;
    }

    // Aplica as mudanças na interface
    document.getElementById('colorPicker').value = espiralColor;
    document.getElementById('frequencyRange').value = frequencyRange;
    document.getElementById('spiralSpeed').value = spiralSpeed;
}

// Função auxiliar para converter de HEX para RGB
function hexToRgb(hex) {
    let r = parseInt(hex.substr(1, 2), 16);
    let g = parseInt(hex.substr(3, 2), 16);
    let b = parseInt(hex.substr(5, 2), 16);
    return { r, g, b };
}

// Função auxiliar para converter de RGB para HEX
function rgbToHex(r, g, b) {
    return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;
}


