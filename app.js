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
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = "";
    let sorteados = [...amigos];
    sorteados = sorteados.sort(() => Math.random() - 0.5);
    for (let i = 0; i < amigos.length; i++) {
        const li = document.createElement("li");
        li.textContent = `${amigos[i]} -> ${sorteados[(i + 1) % amigos.length]}`;
        resultado.appendChild(li);
    }
}
