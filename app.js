function adicionarAmigo() {
    const input = document.getElementById("amigo");
    const nome = input.value.trim();
    if (nome) {
        const lista = document.getElementById("listaAmigos");
        const item = document.createElement("li");
        item.textContent = nome;
        lista.appendChild(item);
        input.value = "";
    }
}

function sortearAmigo() {
    const lista = document.getElementById("listaAmigos");
    const amigos = Array.from(lista.children).map(li => li.textContent);
    if (amigos.length < 2) {
        alert("Adicione pelo menos dois amigos para sortear!");
        return;
    }
    
    lista.style.display = "none";
    
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = "";
    
    const mensagem = document.createElement("div");
    mensagem.classList.add("resultado-mensagem");
    mensagem.innerHTML = "🎉 <strong>Resultado do Sorteio!!! Já podem comprar os presentes</strong> 🎉";
    resultado.appendChild(mensagem);
    
    let sorteados = [...amigos];
    sorteados = sorteados.sort(() => Math.random() - 0.5);
    for (let i = 0; i < amigos.length; i++) {
        const li = document.createElement("li");
        li.textContent = `${amigos[i]} -> ${sorteados[(i + 1) % amigos.length]}`;
        resultado.appendChild(li);
    }
    
    soltarConfetes();
    
    document.getElementById("button-reset").style.display = "inline-block";
}

let confettiInstance = null; // Variável global para a instância do ConfettiGenerator

function soltarConfetes() {
    const confettiSettings = {
        target: 'confetti-canvas',
        max: 100,
        size: 1.5,
        animate: true,
        props: ['circle', 'square', 'triangle'],
        colors: [[165,104,246],[230,61,135],[0,199,228],[253,214,126]],
        clock: 25,
        rotate: true,
        width: window.innerWidth,
        height: window.innerHeight
    };
    confettiInstance = new ConfettiGenerator(confettiSettings); // Armazena a instância
    confettiInstance.render();

}

function pararConfetes() {
    if (confettiInstance) {
        confettiInstance.clear(); // Limpa o canvas e interrompe a animação
        confettiInstance = null; // Remove a referência para permitir a coleta de lixo
        const canvas = document.getElementById('confetti-canvas');
        if (canvas) {
            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height); // Limpa o canvas
        }
    }
}

function reiniciarSorteio() {
    pararConfetes(); // Para os confetes antes de reiniciar

    const listaAmigos = document.getElementById("listaAmigos");
    while (listaAmigos.firstChild) {
        listaAmigos.removeChild(listaAmigos.firstChild);
    }
    listaAmigos.style.display = "block";

    const resultado = document.getElementById("resultado");
    resultado.innerHTML = "";

    document.getElementById("button-reset").style.display = "none";
}