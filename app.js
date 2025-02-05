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

