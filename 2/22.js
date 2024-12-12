
//ARQUIVO PRINCIPAL



// Referências aos elementos HTML
const audio = document.getElementById('audioPlayer');
const progressBar = document.getElementById('progressBar');
const status = document.getElementById('status');
const scaleValue = document.getElementById('scaleValue');
const canvas = document.getElementById('spiralCanvas');
const ctx = canvas.getContext('2d');
const musicUploader = document.getElementById('musicUploader');

// Inicialização do contexto de áudio e analisador
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const audioSource = audioContext.createMediaElementSource(audio);
const analyser = audioContext.createAnalyser();

audioSource.connect(analyser); // Conectar o elemento de áudio ao analisador
analyser.connect(audioContext.destination); // Enviar o áudio ao destino (alto-falantes)

analyser.fftSize = 512; // Define o tamanho do FFT para a análise do espectro
const bufferLength = analyser.frequencyBinCount; // Tamanho do buffer gerado
const dataArray = new Uint8Array(bufferLength); // Array para armazenar os dados de frequência

// Variáveis globais de controle
let isAudioContextResumed = false;
let angle = 0; // Ângulo inicial da espiral
let radius = 5; // Raio inicial da espiral
let centerX = canvas.width / 2; // Centro do canvas (horizontal)
let centerY = canvas.height / 2; // Centro do canvas (vertical)

const maxRadius = Math.min(canvas.width, canvas.height) / 2 - 10; // Raio máximo permitido
let currentRadius = radius; // Raio atual, que será incrementado ao longo do tempo
let bolinhas = []; // Array para armazenar as "bolinhas" da espiral
let espiralColor = '#ff5733'; // Cor inicial da espiral
let frequencyRange = 500; // Faixa de frequência inicial (Hz)
let spiralSpeed = 0.1; // Velocidade inicial da espiral

let sentidoHorario = true; // Controle do sentido da espiral
let festaAtiva = false; // Flag para indicar se a festa aleatória está ativa
let rotacaoCanvas = 0; // Ângulo de rotação inicial do canvas
