// Script para gerar a sequência de Fibonacci até 100 iterações
function gerarFibonacci(iteracoes) {
    let fibonacci = [0, 1]; // Início da sequência
    let conteudo = ""; // Conteúdo que será gerado

    for (let i = 2; i < iteracoes; i++) {
        // Calcula o próximo número da sequência
        let proximo = fibonacci[i - 1] + fibonacci[i - 2];
        fibonacci.push(proximo);

        // Adiciona o padrão narrativo com pontuação crescente
        let pontos = ".".repeat(i - 1); // Gera os pontos com base na iteração
        conteudo += `<p>${pontos} E do ${fibonacci[i - 1]}, se fez mais ${fibonacci[i - 2]}, ${proximo}</p>\n`;
    }

    return conteudo; // Retorna o conteúdo gerado
}

// Gera o conteúdo para 100 iterações
const resultado = gerarFibonacci(100);

// Insere no corpo da página automaticamente
document.addEventListener("DOMContentLoaded", function () {
    document.body.innerHTML += resultado;
});
