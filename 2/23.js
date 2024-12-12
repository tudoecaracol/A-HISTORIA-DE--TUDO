
//Funções de Controle de Música




// Carregamento de música personalizada
musicUploader.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const fileURL = URL.createObjectURL(file);
        audio.src = fileURL; // Define a nova música como fonte do elemento de áudio
        audio.load(); // Carrega a música
        status.innerHTML = `Tocando: ${file.name}`; // Exibe o nome da música
        tocarMusica(); // Inicia a reprodução
    }
});




// Tocar música
function tocarMusica() {
    if (audioContext.state === 'suspended' && !isAudioContextResumed) {
        // Retoma o contexto de áudio se estiver suspenso
        audioContext.resume().then(() => {
            isAudioContextResumed = true;
            audio.play();
            analisarRitmo();
        });
    } else {
        audio.play();
        analisarRitmo();
    }
}




// Pausar música
function pausarMusica() {
    audio.pause();
    status.innerHTML = "Música pausada";
}


// function alternarMusica() {
//     if (audio.paused) {
//         // Retomar o contexto de áudio, se necessário, e tocar
//         if (audioContext.state === 'suspended' && !isAudioContextResumed) {
//             audioContext.resume().then(() => {
//                 isAudioContextResumed = true;
//                 audio.play();
//                 analisarRitmo(); // Inicia a análise do ritmo
//                 status.innerHTML = "Música tocando"; // Atualiza o status
//             });
//         } else {
//             audio.play();
//             analisarRitmo(); // Inicia a análise do ritmo
//             status.innerHTML = "Música tocando"; // Atualiza o status
//         }
//     } else {
//         // Pausar a música
//         audio.pause();
//         status.innerHTML = "Música pausada"; // Atualiza o status
//     }
// }


function alternarMusica() {
    const botao = document.getElementById("botaoMusica");

    if (audio.paused) {
        // Retomar o contexto de áudio, se necessário, e tocar
        if (audioContext.state === 'suspended' && !isAudioContextResumed) {
            audioContext.resume().then(() => {
                isAudioContextResumed = true;
                audio.play();
                analisarRitmo();
                botao.innerHTML = "⏸️"; // Atualiza para ícone de pausa
                botao.setAttribute("aria-label", "Pausar música");
            });
        } else {
            audio.play();
            analisarRitmo();
            botao.innerHTML = "⏸️"; // Atualiza para ícone de pausa
            botao.setAttribute("aria-label", "Pausar música");
        }
    } else {
        // Pausar a música
        audio.pause();
        botao.innerHTML = "▶️"; // Atualiza para ícone de play
        botao.setAttribute("aria-label", "Tocar música");
    }
}
