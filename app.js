let participantes = []; 

function showAlert(message) {
    const customAlert = document.getElementById("custom-alert");
    const customAlertMessage = document.getElementById("custom-alert-message");
    const customAlertOk = document.getElementById("custom-alert-ok");

    customAlertMessage.textContent = message;
    customAlert.style.display = "flex"; 

    
    setTimeout(() => {
        if (responsiveVoice) {
            responsiveVoice.speak(message, 'Brazilian Portuguese Female', { rate: 1.2 });
        } else {
            console.error("responsiveVoice não está definido. Verifique se a biblioteca foi carregada corretamente.");
        }
    }, 20); 

    customAlertOk.onclick = function() {
        customAlert.style.display = "none"; 
        document.getElementById("amigo").value = ""; 
    };
}


function validarSenha(senha) {
    if (!senha || senha.trim() === "") {
        return "Por favor, digite uma senha.";
    }
    return null; 
}

function adicionarAmigo() {
    const inputNome = document.getElementById("amigo");
    const inputSenha = document.getElementById("senha");
    let nome = inputNome.value.trim();
    let senha = inputSenha.value.trim();

    if (!nome) {
        showAlert("Digite um nome!");
        return;
    }

    if (!senha) {
        showAlert("Digite uma senha!");
        return;
    }

    
    const senhaInvalida = validarSenha(senha);
    if (senhaInvalida) {
        showAlert(senhaInvalida); 
        return; 
    }

    if (/\d/.test(nome)) {
        showAlert("O nome não pode conter números!");
        return;
    }

    nome = nome.toLowerCase(); 

    if (participantes.find(p => p.nome === nome)) {
        showAlert("Este nome já foi adicionado!");
        return;
    }

    const lista = document.getElementById("listaAmigos");
    const item = document.createElement("li");
    item.textContent = nome;

    
    const botaoRemover = document.createElement("button");
    botaoRemover.textContent = "❌"; 
    botaoRemover.classList.add("button-remover"); 
    botaoRemover.onclick = function() {
        lista.removeChild(item); 
        participantes = participantes.filter(p => p.nome !== nome);
    };

    item.appendChild(botaoRemover); 
    lista.appendChild(item);

    participantes.push({ nome: nome, senha: senha }); 

    inputNome.value = "";
    inputSenha.value = "";
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
  document.body.appendChild(link); 
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url); 
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
    if (participantes.length < 2) {
        showAlert("Adicione pelo menos dois amigos para sortear!");
        return;
    }

    const lista = document.getElementById("listaAmigos");
    lista.style.display = "none";

    
    setDisplay(["titulo-amigos", "input-wrapper", "amigo", "senha", "botao-adicionar"], "none");

    const resultado = document.getElementById("resultado");
    resultado.innerHTML = "";

    const mensagem = document.createElement("div");
    mensagem.classList.add("resultado-mensagem");
    mensagem.innerHTML = "🎉 <strong>Resultado do Sorteio!!! Já podem comprar os presentes</strong> 🎉";
    resultado.appendChild(mensagem);

    let sorteados = [...participantes];
    let resultadosSorteio = {};
    let sorteioValido = false;

    
    while (!sorteioValido) {
        sorteados = [...participantes].sort(() => Math.random() - 0.5); 
        sorteioValido = true; 
        resultadosSorteio = {}; 

        for (let i = 0; i < participantes.length; i++) {
            const participante = participantes[i];
            const amigoSorteado = sorteados[(i + 1) % participantes.length];

            if (participante.nome === amigoSorteado.nome) {
                sorteioValido = false; 
                break; 
            }

            resultadosSorteio[participante.nome] = amigoSorteado.nome;
        }
    }

    
    participantes.forEach(participante => {
        const botaoVerificar = document.createElement("button");
        botaoVerificar.textContent = `Verificar sorteio de ${participante.nome}`;
        botaoVerificar.classList.add("button-verificar");
        botaoVerificar.onclick = () => verificarSenha(participante.nome, resultadosSorteio[participante.nome]);
        resultado.appendChild(botaoVerificar);
    });

    soltarConfetes();

    
    const audioAlegria = document.getElementById("audio-alegria");
    if (audioAlegria) {
        audioAlegria.play();
    }

    
    document.querySelector(".button-draw").style.display = "none";

    
    document.getElementById("button-reset").style.display = "inline-block";

    
    if (responsiveVoice) {
        responsiveVoice.speak("Resultado do Sorteio!!! Já podem comprar os presentes", 'Brazilian Portuguese Female', { rate: 1.2 });
    } else {
        console.error("responsiveVoice não está definido. Verifique se a biblioteca foi carregada corretamente.");
    }
}


function reiniciarSorteio() {
    pararConfetes();

    const listaAmigos = document.getElementById("listaAmigos");
    while (listaAmigos.firstChild) {
        listaAmigos.removeChild(listaAmigos.firstChild);
    }
    listaAmigos.style.display = "block";

    participantes = []; 

    const resultado = document.getElementById("resultado");
    resultado.innerHTML = "";

    
    document.querySelector(".button-draw").style.display = "flex";

    document.getElementById("button-reset").style.display = "none";

    
    setDisplay(["titulo-amigos"], "block");
    setDisplay(["input-wrapper"], "flex");
    setDisplay(["amigo"], "block");
    setDisplay(["senha"], "block"); 
    setDisplay(["botao-adicionar"], "inline-block");

    
    if (responsiveVoice) {
        responsiveVoice.speak("Caixa do amigo secreto. Digite o nome dos seus amigos para começar.", 'Brazilian Portuguese Female', { rate: 1.2 });
    } else {
        console.error("responsiveVoice não está definido. Verifique se a biblioteca foi carregada corretamente.");
    }
}


function mostrarResultado(message) {
    const customAlert = document.getElementById("custom-alert");
    const customAlertMessage = document.getElementById("custom-alert-message");
    const customAlertOk = document.getElementById("custom-alert-ok");

    customAlertMessage.textContent = message;
    customAlert.style.display = "flex"; 

    customAlertOk.onclick = function() {
        customAlert.style.display = "none"; 
    };
}


function verificarSenha(nome, amigoSorteado) {
    const senha = prompt(`Digite a senha para ${nome}:`);
    const participante = participantes.find(p => p.nome === nome);

    if (participante && senha === participante.senha) {
        mostrarResultado(`${nome} tirou ${amigoSorteado}!`); 

    } else {
        showAlert("Senha incorreta!");
    }
}

