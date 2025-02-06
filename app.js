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

// function sortearAmigo() {
//     const lista = document.getElementById("listaAmigos");
//     const amigos = Array.from(lista.children).map(li => li.textContent);
//     if (amigos.length < 2) {
//         alert("Adicione pelo menos dois amigos para sortear!");
//         return;
//     }
//     const resultado = document.getElementById("resultado");
//     resultado.innerHTML = "";
//     let sorteados = [...amigos];
//     sorteados = sorteados.sort(() => Math.random() - 0.5);
//     for (let i = 0; i < amigos.length; i++) {
//         const li = document.createElement("li");
//         li.textContent = `${amigos[i]} -> ${sorteados[(i + 1) % amigos.length]}`;
//         resultado.appendChild(li);
//     }
//     soltarConfetes();
// }

function sortearAmigo() {
    const lista = document.getElementById("listaAmigos");
    const amigos = Array.from(lista.children).map(li => li.textContent);
    if (amigos.length < 2) {
        alert("Adicione pelo menos dois amigos para sortear!");
        return;
    }
    
    // Esconder a lista de amigos
    lista.style.display = "none";
    
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = "";
    
    // Criar mensagem destacada
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
}


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
    const confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();
    
    setTimeout(() => {
        const canvas = document.getElementById('confetti-canvas');
        if (canvas) {
            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        }
    }, 2000); // Confetes desaparecem após 2 segundos
}


