let nomesAdicionados = []; // Array para armazenar os nomes adicionados

function adicionarAmigo() {
    const input = document.getElementById("amigo");
    let nome = input.value.trim();

    if (!nome) {
        alert("Digite um nome!");
        document.getElementById("amigo").value = "";
        return;
    }

    if (/\d/.test(nome)) {
        alert("O nome não pode conter números!");
        document.getElementById("amigo").value = "";
        return;
    }

    nome = nome.toLowerCase(); // Converte para minúsculo para comparação

    if (nomesAdicionados.includes(nome)) {
        alert("Este nome já foi adicionado!");
        document.getElementById("amigo").value = "";
        return;
    }

    const lista = document.getElementById("listaAmigos");
    const item = document.createElement("li");
    item.textContent = nome;

    // Cria o botão de remoção
    const botaoRemover = document.createElement("button");
    botaoRemover.textContent = "❌"; // Emoji de "X"
    botaoRemover.classList.add("button-remover"); // Adiciona uma classe para estilo
    botaoRemover.onclick = function() {
        lista.removeChild(item); // Remove o item da lista
        nomesAdicionados = nomesAdicionados.filter(n => n !== nome); // Remove do array
    };

    item.appendChild(botaoRemover); // Adiciona o botão ao item da lista
    lista.appendChild(item);

    nomesAdicionados.push(nome); // Adiciona o nome ao array

    input.value = "";
}


let confettiInstance = null;

function soltarConfetes() {
  const confettiSettings = {
    target: 'confetti-canvas',
    max: 100,
    size: 1.5,
    animate: true,
    props: ['circle', 'square', 'triangle'],
    colors: [[165, 104, 246], [230, 61, 135], [0, 199, 228], [253, 214, 126]],
    clock: 25,
    rotate: true,
    width: window.innerWidth,
    height: window.innerHeight
  };
  confettiInstance = new ConfettiGenerator(confettiSettings);
  confettiInstance.render();
}

function pararConfetes() {
  if (confettiInstance) {
    confettiInstance.clear();
    confettiInstance = null;
    const canvas = document.getElementById('confetti-canvas');
    if (canvas) {
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    }
  }
}

function gerarListaSorteioTexto(amigos, sorteados) {
  const dataSorteio = new Date().toLocaleDateString();
  let texto = `Lista do Amigo Secreto ${dataSorteio}\n\n`;
  for (let i = 0; i < amigos.length; i++) {
    texto += `${amigos[i]} -> ${sorteados[(i + 1) % amigos.length]}\n`;
  }
  return texto;
}

function salvarListaSorteio(amigos, sorteados) {
  const textoParaSalvar = gerarListaSorteioTexto(amigos, sorteados);
  const blob = new Blob([textoParaSalvar], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `lista_amigo_secreto_${new Date().toLocaleDateString().replace(/\//g, '-')}.txt`;
  document.body.appendChild(link); // Necessário para Firefox
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url); // Limpa o objeto URL
}


function setDisplay(elementIds, displayValue) {
    elementIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.style.display = displayValue;
        }
    });
}

function sortearAmigo() {
    if (nomesAdicionados.length < 2) {
        alert("Adicione pelo menos dois amigos para sortear!");
        document.getElementById("amigo").value = "";
        return;
    }

    const lista = document.getElementById("listaAmigos");
    lista.style.display = "none";

    // Oculta os elementos de entrada
    setDisplay(["titulo-amigos", "input-wrapper", "amigo", "botao-adicionar"], "none");

    const resultado = document.getElementById("resultado");
    resultado.innerHTML = "";

    const mensagem = document.createElement("div");
    mensagem.classList.add("resultado-mensagem");
    mensagem.innerHTML = "🎉 <strong>Resultado do Sorteio!!! Já podem comprar os presentes</strong> 🎉";
    resultado.appendChild(mensagem);

    let sorteados = [...nomesAdicionados];
    sorteados = sorteados.sort(() => Math.random() - 0.5);

    for (let i = 0; i < nomesAdicionados.length; i++) {
        const li = document.createElement("li");
        li.textContent = `${nomesAdicionados[i]} -> ${sorteados[(i + 1) % nomesAdicionados.length]}`;
        resultado.appendChild(li);
    }

    soltarConfetes();

    // Esconde o botão "Sortear amigo"
    document.querySelector(".button-draw").style.display = "none";

    // Mostra o botão "Baixar Lista"
    const botaoBaixar = document.createElement("button");
    botaoBaixar.textContent = "📃 Baixar Lista"; // Adicionado o emoji "📃"
    botaoBaixar.classList.add("button-download"); // Adiciona uma classe para estilização
    botaoBaixar.onclick = () => salvarListaSorteio(nomesAdicionados, sorteados);
    document.querySelector(".button-container").appendChild(botaoBaixar);

    // Mostra o botão "Novo Sorteio"
    document.getElementById("button-reset").style.display = "inline-block";
}

function reiniciarSorteio() {
    pararConfetes();

    const listaAmigos = document.getElementById("listaAmigos");
    while (listaAmigos.firstChild) {
        listaAmigos.removeChild(listaAmigos.firstChild);
    }
    listaAmigos.style.display = "block";

    nomesAdicionados = []; // Limpa o array de nomes

    const resultado = document.getElementById("resultado");
    resultado.innerHTML = "";

    // Mostra novamente o botão "Sortear amigo"
    document.querySelector(".button-draw").style.display = "flex";

    // Remove o botão "Baixar Lista"
    const botaoBaixar = document.querySelector(".button-download");
    if (botaoBaixar) {
        botaoBaixar.remove();
    }

    document.getElementById("button-reset").style.display = "none";

    // Mostra os elementos de entrada novamente
    setDisplay(["titulo-amigos"], "block");
    setDisplay(["input-wrapper"], "flex");
    setDisplay(["amigo"], "block");
    setDisplay(["botao-adicionar"], "inline-block");
}