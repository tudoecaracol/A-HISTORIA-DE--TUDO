const canvas = document.getElementById('fibonacciCanvas');
const ctx = canvas.getContext('2d');
const lineHeight = 20; // Altura de cada linha
const maxLines = 10; // Número máximo de linhas visíveis
const lines = []; // Armazena as linhas exibidas
let offset = 0; // Controle da rolagem
let isScrolling = false; // Flag para controlar o início da rolagem

// Função para gerar a sequência de Fibonacci
function gerarFibonacci(inicio1, inicio2, iteracoes) {
    const fibonacci = [inicio1, inicio2];
    for (let i = 2; i < iteracoes; i++) {
        fibonacci.push(fibonacci[i - 1] + fibonacci[i - 2]);
    }
    return fibonacci;
}

// Função para atualizar o canvas
function desenhar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = '16px Arial';
    ctx.fillStyle = '#000';

    // Desenha as linhas no canvas
    lines.forEach((line, index) => {
        const y = index * lineHeight - offset;
        if (y >= 0 && y < canvas.height) {
            ctx.fillText(line, 10, y + lineHeight);
        }
    });

    // Atualiza o offset para o efeito de rolagem
    if (isScrolling) {
        offset += 2; // Velocidade de rolagem
        if (offset >= lineHeight) {
            offset = 0;
            lines.shift(); // Remove a primeira linha
            if (lines.length <= maxLines) {
                isScrolling = false; // Para a rolagem se estiver dentro do limite
            }
        }
    }

    // Reexecuta a animação se houver linhas restantes ou estiver rolando
    if (lines.length > 0 || isScrolling) {
        requestAnimationFrame(desenhar);
    }
}

// Evento para iniciar a sequência
document.getElementById('gerar').addEventListener('click', () => {
    const fibonacci = gerarFibonacci(0, 1, 80);

    // Adiciona novas linhas gradualmente
    let index = 0;
    const interval = setInterval(() => {
        if (index < fibonacci.length - 2) {
            const line = `.${'.'.repeat(index)}  ${fibonacci[index + 1]}+ ${fibonacci[index]}, ${fibonacci[index + 2]}`;
            lines.push(line);

            // Garante que não exceda o máximo visível
            if (lines.length > maxLines) {
                isScrolling = true; // Ativa a rolagem se exceder o limite
            }

            // Inicia a animação
            if (lines.length <= maxLines && offset === 0) {
                requestAnimationFrame(desenhar);
            }

            index++;
        } else {
            clearInterval(interval); // Para quando todas as linhas forem adicionadas
        }
    }, 100); // Intervalo entre novas linhas
});