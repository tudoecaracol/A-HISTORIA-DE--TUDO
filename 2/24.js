//Funções de Análise e Atualização da Espiral

// Analisar o ritmo da música em tempo real
function analisarRitmo() {
    if (!audio.paused) {
        analyser.getByteFrequencyData(dataArray); // Obtém dados de frequência

        let totalAmplitude = 0;
        for (let i = 0; i < bufferLength; i++) {
            if (i > frequencyRange) break; // Limita o processamento à faixa de frequência selecionada
            totalAmplitude += dataArray[i];
        }

        const averageAmplitude = totalAmplitude / bufferLength; // Calcula a amplitude média
        let progress = (averageAmplitude / 255) * 100; // Converte a amplitude para porcentagem
        progressBar.style.width = Math.min(progress, 100) + '%'; // Atualiza a barra de progresso

        const scale = Math.floor((averageAmplitude / 255) * 10); // Calcula a escala (0 a 10)
        scaleValue.innerHTML = scale; // Atualiza o valor da escala

        atualizarEspiral(scale); // Atualiza a espiral com base na intensidade
        requestAnimationFrame(analisarRitmo); // Chama novamente para continuar o ciclo
    }
}

// Atualizar o desenho da espiral
function atualizarEspiral(intensidade) {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa o canvas
    ctx.save(); // Salva o estado atual do canvas para aplicar transformações

    // Rotação contínua do canvas
    ctx.translate(centerX, centerY);
    ctx.rotate(rotacaoCanvas);
    ctx.translate(-centerX, -centerY);

    // Desenho das bolinhas que formam a espiral
    bolinhas.forEach((bolinha) => {
        const perspectiva = 1 / (1 + bolinha.z * 0.05); // Ajusta a perspectiva , menor o numero , maior o desenho
        const tamanhoBolinha = 10 * perspectiva; // Define o tamanho baseado na perspectiva

        ctx.beginPath();
        ctx.arc(bolinha.x, bolinha.y, tamanhoBolinha, 0, 2 * Math.PI);
        ctx.fillStyle = espiralColor;
        ctx.fill();
    });

    // Atualização dinâmica da espiral
    for (let i = 0; i < intensidade; i++) {
        angle += (sentidoHorario ? spiralSpeed : -spiralSpeed); // Incremento do ângulo
        currentRadius += 0.7; // Incremento do raio

        if (currentRadius > maxRadius) {
            currentRadius = 5; // Reseta o raio se atingir o máximo
        }

        const x = centerX + currentRadius * Math.cos(angle); // Coordenada X
        const y = centerY + currentRadius * Math.sin(angle); // Coordenada Y
        const z = currentRadius; // Profundidade

        bolinhas.push({ x, y, z }); // Adiciona uma nova bolinha à espiral
    }

    if (bolinhas.length > 1000) bolinhas.splice(0, bolinhas.length - 1000); // Limita o número de bolinhas

    ctx.restore(); // Restaura o estado original do canvas
}
