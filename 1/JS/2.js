// Script para gerar a sequência de Fibonacci até 100 iterações
function gerarFibonacci(iteracoes, inicio1, inicio2) {
    let fibonacci = [inicio1, inicio2]; // Início da sequência personalizado
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

// Adiciona evento ao botão
document.addEventListener("DOMContentLoaded", function () {
    const botao = document.getElementById("gerar-fibonacci");
    const conteudoDiv = document.getElementById("conteudo");

    botao.addEventListener("click", function () {
        // Obtém os valores iniciais dos campos de entrada
        const inicio1 = parseInt(document.getElementById("inicio1").value, 10);
        const inicio2 = parseInt(document.getElementById("inicio2").value, 10);

        // Gera a sequência com os valores fornecidos
        const resultado = gerarFibonacci(100, inicio1, inicio2);

        // Insere o conteúdo gerado na página
        conteudoDiv.innerHTML = resultado;
    });
});
