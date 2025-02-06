let participantes = []; // Array para armazenar os participantes (nome e senha)

/*
  Função showAlert: Exibe um alerta personalizado na tela com uma mensagem e lê a mensagem em voz alta usando responsiveVoice (se disponível).
  Essa função é usada para mostrar mensagens de erro ou informações importantes para o usuário.
*/
function showAlert(message, inputToClear = null) {
    const customAlert = document.getElementById("custom-alert");
    const customAlertMessage = document.getElementById("custom-alert-message");
    const customAlertOk = document.getElementById("custom-alert-ok");

    customAlertMessage.textContent = message;
    customAlert.style.display = "flex"; // Exibe o modal imediatamente

    // Use setTimeout para dar prioridade à exibição antes de falar
    setTimeout(() => {
        if (responsiveVoice) {
            responsiveVoice.speak(message, 'Brazilian Portuguese Female', { rate: 1.2 });
        } else {
            console.error("responsiveVoice não está definido. Verifique se a biblioteca foi carregada corretamente.");
        }
    }, 20); // Atraso de 50 milissegundos (ajuste conforme necessário)

    customAlertOk.onclick = function() {
        customAlert.style.display = "none"; // Oculta o modal
        if (inputToClear) {
            document.getElementById(inputToClear).value = ""; // Limpa o input específico
        }
    };
}

/*
  Função validarSenha: Verifica se a senha fornecida é válida (não vazia).
  Retorna uma mensagem de erro se a senha for inválida ou null se for válida.
*/
function validarSenha(senha) {
    if (!senha || senha.trim() === "") {
        return "Por favor, digite uma senha.";
    }
    return null; // Retorna null se a senha for válida
}

/*
  Função adicionarAmigo: Adiciona um novo amigo à lista de participantes, validando o nome e a senha,
  exibindo alertas em caso de erros e atualizando a interface do usuário.
*/
function adicionarAmigo() {
    const inputNome = document.getElementById("amigo");
    const inputSenha = document.getElementById("senha");
    let nome = inputNome.value.trim();
    let senha = inputSenha.value.trim();

    if (!nome) {
        showAlert("Digite um nome!", "amigo"); // Passa o ID do input a ser limpo
        return;
    }

    if (!senha) {
        showAlert("Digite uma senha!", "senha"); // Passa o ID do input a ser limpo
        return;
    }

    // Validação da senha
    const senhaInvalida = validarSenha(senha);
    if (senhaInvalida) {
        showAlert(senhaInvalida, "senha"); // Exibe a mensagem de erro da senha e limpa o campo de senha
        return; // Impede a adição do amigo
    }

    if (/\d/.test(nome)) {
        showAlert("O nome não pode conter números!", "amigo"); // Limpa o input de nome
        return;
    }

    nome = nome.toLowerCase(); // Converte para minúsculo para comparação

    if (participantes.find(p => p.nome === nome)) {
        showAlert("Este nome já foi adicionado!", "amigo");
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
        participantes = participantes.filter(p => p.nome !== nome); // Remove o participante do array
    };

    item.appendChild(botaoRemover); // Adiciona o botão ao item da lista
    lista.appendChild(item);

    participantes.push({ nome: nome, senha: senha }); // Armazena o nome e a senha do participante

    inputNome.value = ""; // Limpa o campo de nome
    inputSenha.value = ""; // Limpa o campo de senha
}





let confettiInstance = null; // Variável para armazenar a instância do confetti

/*
  Função soltarConfetes: Inicia a animação de confetes na tela.
*/
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

/*
  Função pararConfetes: Para a animação de confetes na tela.
*/
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

/*
  Função gerarListaSorteioTexto: Gera uma lista de sorteio em formato de texto.
*/
function gerarListaSorteioTexto(amigos, sorteados) {
  const dataSorteio = new Date().toLocaleDateString();
  let texto = `Lista do Amigo Secreto ${dataSorteio}\n\n`;
  for (let i = 0; i < amigos.length; i++) {
    texto += `${amigos[i]} -> ${sorteados[(i + 1) % amigos.length]}\n`;
  }
  return texto;
}

/*
  Função salvarListaSorteio: Permite que o usuário salve a lista do sorteio em um arquivo de texto.
*/
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

/*
  Função setDisplay: Define o estilo 'display' de múltiplos elementos HTML com base em seus IDs.
*/
function setDisplay(elementIds, displayValue) {
    elementIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.style.display = displayValue;
        }
    });
}

/*
  Função sortearAmigo: Realiza o sorteio do Amigo Secreto, garantindo que ninguém tire a si mesmo,
  exibindo o resultado e tocando um som de alegria.
*/
function sortearAmigo() {
    if (participantes.length < 2) {
        showAlert("Adicione pelo menos dois amigos para sortear!");
        return;
    }

    const lista = document.getElementById("listaAmigos");
    lista.style.display = "none";

    // Oculta os elementos de entrada
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

    // Repete o sorteio até que ninguém tire a si mesmo
    while (!sorteioValido) {
        sorteados = [...participantes].sort(() => Math.random() - 0.5); // Embaralha os participantes
        sorteioValido = true; // Assume que o sorteio é válido inicialmente
        resultadosSorteio = {}; // Limpa os resultados do sorteio anterior

        for (let i = 0; i < participantes.length; i++) {
            const participante = participantes[i];
            const amigoSorteado = sorteados[(i + 1) % participantes.length];

            if (participante.nome === amigoSorteado.nome) {
                sorteioValido = false; // Se alguém tirou a si mesmo, o sorteio não é válido
                break; // Interrompe o loop e repete o sorteio
            }

            resultadosSorteio[participante.nome] = amigoSorteado.nome;
        }
    }

    // Para cada participante, mostra um botão para verificar o resultado com a senha
    participantes.forEach(participante => {
        const botaoVerificar = document.createElement("button");
        botaoVerificar.textContent = `Verificar sorteio de ${participante.nome}`;
        botaoVerificar.classList.add("button-verificar");
        botaoVerificar.onclick = () => verificarSenha(participante.nome, resultadosSorteio[participante.nome]);
        resultado.appendChild(botaoVerificar);
    });

    soltarConfetes();

    // Toca o som de alegria
    const audioAlegria = document.getElementById("audio-alegria");
    if (audioAlegria) {
        audioAlegria.play();
    }

    // Esconde o botão "Sortear amigo"
    document.querySelector(".button-draw").style.display = "none";

    // Mostra o botão "Novo Sorteio"
    document.getElementById("button-reset").style.display = "inline-block";

    // Usa o responsiveVoice para falar o resultado
    if (responsiveVoice) {
        responsiveVoice.speak("Resultado do Sorteio!!! Já podem comprar os presentes", 'Brazilian Portuguese Female', { rate: 1.2 });
    } else {
        console.error("responsiveVoice não está definido. Verifique se a biblioteca foi carregada corretamente.");
    }
}

/*
  Função reiniciarSorteio: Reinicia o processo de sorteio, limpando a lista de participantes,
  exibindo os campos de entrada, lendo uma mensagem de boas-vindas E LIMPA OS INPUTS.
*/
function reiniciarSorteio() {
    // Limpa os inputs de nome e senha
    document.getElementById("amigo").value = "";
    document.getElementById("senha").value = "";

    pararConfetes();

    const listaAmigos = document.getElementById("listaAmigos");
    while (listaAmigos.firstChild) {
        listaAmigos.removeChild(listaAmigos.firstChild);
    }
    listaAmigos.style.display = "block";

    participantes = []; // Limpa o array de participantes

    const resultado = document.getElementById("resultado");
    resultado.innerHTML = "";

    // Mostra novamente o botão "Sortear amigo"
    document.querySelector(".button-draw").style.display = "flex";

    document.getElementById("button-reset").style.display = "none";

    // Mostra os elementos de entrada novamente
    setDisplay(["titulo-amigos"], "block");
    setDisplay(["input-wrapper"], "flex");
    setDisplay(["amigo"], "block");
    setDisplay(["senha"], "block"); // Mostra o campo de senha
    setDisplay(["botao-adicionar"], "inline-block");

    // Fala "Amigo secreto. Digite o nome dos seus amigos para começar." ao reiniciar
    if (responsiveVoice) {
        responsiveVoice.speak("Caixa do amigo secreto. Digite o nome dos seus amigos para começar.", 'Brazilian Portuguese Female', { rate: 1.2 });
    } else {
        console.error("responsiveVoice não está definido. Verifique se a biblioteca foi carregada corretamente.");
    }
}









/*
  Função mostrarResultado: Exibe o resultado do sorteio em um alerta personalizado (sem usar responsiveVoice).
*/
function mostrarResultado(message) {
    const customAlert = document.getElementById("custom-alert");
    const customAlertMessage = document.getElementById("custom-alert-message");
    const customAlertOk = document.getElementById("custom-alert-ok");

    customAlertMessage.textContent = message;
    customAlert.style.display = "flex"; // Exibe o modal

    customAlertOk.onclick = function() {
        customAlert.style.display = "none"; // Oculta o modal
    };
}

/*
  Função verificarSenha: Solicita a senha do participante, verifica se a senha está correta
  e, em caso positivo, exibe o resultado do sorteio (quem o participante tirou).
*/
function verificarSenha(nome, amigoSorteado) {
    const senha = prompt(`Digite a senha para ${nome}:`);
    const participante = participantes.find(p => p.nome === nome);

    if (participante && senha === participante.senha) {
        mostrarResultado(`${nome} tirou ${amigoSorteado}!`); // Usa a nova função

    } else {
        showAlert("Senha incorreta!");
    }
}


/*
  Este bloco de código adiciona um listener de evento para a tecla "keydown" no campo de entrada de nome.
  Quando a tecla "Enter" é pressionada, o foco é movido para o campo de entrada de senha.
*/
document.getElementById("amigo").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Evita o comportamento padrão do Enter (enviar o formulário)
        document.getElementById("senha").focus(); // Move o foco para o campo de senha
    }
});

/*
  Este bloco de código adiciona um listener de evento para a tecla "keydown" no campo de entrada de senha.
  Quando a tecla "Enter" é pressionada, a função adicionarAmigo é chamada para adicionar o amigo à lista
  e, em seguida, o foco é movido de volta para o campo de entrada de nome.
*/
document.getElementById("senha").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Evita o comportamento padrão do Enter (enviar o formulário)
        adicionarAmigo(); // Adiciona o amigo
        document.getElementById("amigo").focus(); // Retorna o foco para o campo de nome
    }
});