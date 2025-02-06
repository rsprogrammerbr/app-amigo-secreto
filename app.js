// // let nomesAdicionados = []; // Array para armazenar os nomes adicionados

// // function adicionarAmigo() {
// //     const input = document.getElementById("amigo");
// //     let nome = input.value.trim();

// //     if (!nome) {
// //         showAlert("Digite um nome!");
// //         return;
// //     }

// //     if (/\d/.test(nome)) {
// //         showAlert("O nome não pode conter números!");
// //         return;
// //     }

// //     nome = nome.toLowerCase(); // Converte para minúsculo para comparação

// //     if (nomesAdicionados.includes(nome)) {
// //         showAlert("Este nome já foi adicionado!");
// //         return;
// //     }

// //     const lista = document.getElementById("listaAmigos");
// //     const item = document.createElement("li");
// //     item.textContent = nome;

// //     // Cria o botão de remoção
// //     const botaoRemover = document.createElement("button");
// //     botaoRemover.textContent = "❌"; // Emoji de "X"
// //     botaoRemover.classList.add("button-remover"); // Adiciona uma classe para estilo
// //     botaoRemover.onclick = function() {
// //         lista.removeChild(item); // Remove o item da lista
// //         nomesAdicionados = nomesAdicionados.filter(n => n !== nome); // Remove do array
// //     };

// //     item.appendChild(botaoRemover); // Adiciona o botão ao item da lista
// //     lista.appendChild(item);

// //     nomesAdicionados.push(nome); // Adiciona o nome ao array

// //     input.value = "";
// // }



// // let confettiInstance = null;

// // function soltarConfetes() {
// //   const confettiSettings = {
// //     target: 'confetti-canvas',
// //     max: 100,
// //     size: 1.5,
// //     animate: true,
// //     props: ['circle', 'square', 'triangle'],
// //     colors: [[165, 104, 246], [230, 61, 135], [0, 199, 228], [253, 214, 126]],
// //     clock: 25,
// //     rotate: true,
// //     width: window.innerWidth,
// //     height: window.innerHeight
// //   };
// //   confettiInstance = new ConfettiGenerator(confettiSettings);
// //   confettiInstance.render();
// // }

// // function pararConfetes() {
// //   if (confettiInstance) {
// //     confettiInstance.clear();
// //     confettiInstance = null;
// //     const canvas = document.getElementById('confetti-canvas');
// //     if (canvas) {
// //       canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
// //     }
// //   }
// // }

// // function gerarListaSorteioTexto(amigos, sorteados) {
// //   const dataSorteio = new Date().toLocaleDateString();
// //   let texto = `Lista do Amigo Secreto ${dataSorteio}\n\n`;
// //   for (let i = 0; i < amigos.length; i++) {
// //     texto += `${amigos[i]} -> ${sorteados[(i + 1) % amigos.length]}\n`;
// //   }
// //   return texto;
// // }

// // function salvarListaSorteio(amigos, sorteados) {
// //   const textoParaSalvar = gerarListaSorteioTexto(amigos, sorteados);
// //   const blob = new Blob([textoParaSalvar], { type: 'text/plain;charset=utf-8' });
// //   const url = URL.createObjectURL(blob);
// //   const link = document.createElement('a');
// //   link.href = url;
// //   link.download = `lista_amigo_secreto_${new Date().toLocaleDateString().replace(/\//g, '-')}.txt`;
// //   document.body.appendChild(link); // Necessário para Firefox
// //   link.click();
// //   document.body.removeChild(link);
// //   URL.revokeObjectURL(url); // Limpa o objeto URL
// // }


// // function setDisplay(elementIds, displayValue) {
// //     elementIds.forEach(id => {
// //         const element = document.getElementById(id);
// //         if (element) {
// //             element.style.display = displayValue;
// //         }
// //     });
// // }


// // function sortearAmigo() {
// //     if (nomesAdicionados.length < 2) {
// //         showAlert("Adicione pelo menos dois amigos para sortear!");
// //         return;
// //     }

// //     const lista = document.getElementById("listaAmigos");
// //     lista.style.display = "none";

// //     // Oculta os elementos de entrada
// //     setDisplay(["titulo-amigos", "input-wrapper", "amigo", "botao-adicionar"], "none");

// //     const resultado = document.getElementById("resultado");
// //     resultado.innerHTML = "";

// //     const mensagem = document.createElement("div");
// //     mensagem.classList.add("resultado-mensagem");
// //     mensagem.innerHTML = "🎉 <strong>Resultado do Sorteio!!! Já podem comprar os presentes</strong> 🎉";
// //     resultado.appendChild(mensagem);

// //     let sorteados = [...nomesAdicionados];
// //     sorteados = sorteados.sort(() => Math.random() - 0.5);

// //     let textoParaFalar = ""; // Inicializa a string para a fala

// //     for (let i = 0; i < nomesAdicionados.length; i++) {
// //         const li = document.createElement("li");
// //         li.textContent = `${nomesAdicionados[i]} -> ${sorteados[(i + 1) % nomesAdicionados.length]}`;
// //         resultado.appendChild(li);
// //         textoParaFalar += `${nomesAdicionados[i]} dá presente para ${sorteados[(i + 1) % nomesAdicionados.length]}, `; // Adiciona ao texto para a fala
// //     }

// //     soltarConfetes();

// //     // Toca o som de alegria
// //     const audioAlegria = document.getElementById("audio-alegria");
// //     if (audioAlegria) {
// //         audioAlegria.play();
// //     }

// //     // Esconde o botão "Sortear amigo"
// //     document.querySelector(".button-draw").style.display = "none";

// //     // Mostra o botão "Baixar Lista"
// //     const botaoBaixar = document.createElement("button");
// //     botaoBaixar.textContent = "📃 Baixar Lista"; // Adicionado o emoji "📃"
// //     botaoBaixar.classList.add("button-download"); // Adiciona uma classe para estilização
// //     botaoBaixar.onclick = () => salvarListaSorteio(nomesAdicionados, sorteados);
// //     document.querySelector(".button-container").appendChild(botaoBaixar);

// //     // Mostra o botão "Novo Sorteio"
// //     document.getElementById("button-reset").style.display = "inline-block";

// //     // Usa o responsiveVoice para falar o resultado
// //     if (responsiveVoice) {
// //         responsiveVoice.speak("Resultado do Sorteio!!! Já podem comprar os presentes. " + textoParaFalar, 'Brazilian Portuguese Female', { rate: 1.2 });
// //     } else {
// //         console.error("responsiveVoice não está definido. Verifique se a biblioteca foi carregada corretamente.");
// //     }
// // }

// // function reiniciarSorteio() {
// //     pararConfetes();

// //     const listaAmigos = document.getElementById("listaAmigos");
// //     while (listaAmigos.firstChild) {
// //         listaAmigos.removeChild(listaAmigos.firstChild);
// //     }
// //     listaAmigos.style.display = "block";

// //     nomesAdicionados = []; // Limpa o array de nomes

// //     const resultado = document.getElementById("resultado");
// //     resultado.innerHTML = "";

// //     // Mostra novamente o botão "Sortear amigo"
// //     document.querySelector(".button-draw").style.display = "flex";

// //     // Remove o botão "Baixar Lista"
// //     const botaoBaixar = document.querySelector(".button-download");
// //     if (botaoBaixar) {
// //         botaoBaixar.remove();
// //     }

// //     document.getElementById("button-reset").style.display = "none";

// //     // Mostra os elementos de entrada novamente
// //     setDisplay(["titulo-amigos"], "block");
// //     setDisplay(["input-wrapper"], "flex");
// //     setDisplay(["amigo"], "block");
// //     setDisplay(["botao-adicionar"], "inline-block");

// //     // Fala "Amigo secreto. Digite o nome dos seus amigos." ao reiniciar
// //     if (responsiveVoice) {
// //         responsiveVoice.speak("Amigo secreto. Digite o nome dos seus amigos.", 'Brazilian Portuguese Female', { rate: 1.2 });
// //     } else {
// //         console.error("responsiveVoice não está definido. Verifique se a biblioteca foi carregada corretamente.");
// //     }
// // }

// // function showAlert(message) {
// //     const customAlert = document.getElementById("custom-alert");
// //     const customAlertMessage = document.getElementById("custom-alert-message");
// //     const customAlertOk = document.getElementById("custom-alert-ok");

// //     customAlertMessage.textContent = message;

// //     if (responsiveVoice) {
// //         responsiveVoice.speak(message, 'Brazilian Portuguese Female', { rate: 1.2 });
// //     } else {
// //         console.error("responsiveVoice não está definido. Verifique se a biblioteca foi carregada corretamente.");
// //     }

// //     customAlert.style.display = "flex"; // Exibe o modal

// //     customAlertOk.onclick = function() {
// //         customAlert.style.display = "none"; // Oculta o modal
// //         document.getElementById("amigo").value = ""; // Limpa o input
// //     };
// // }


// let participantes = []; // Array para armazenar os participantes (nome e senha)

// // function adicionarAmigo() {
// //     const inputNome = document.getElementById("amigo");
// //     const inputSenha = document.getElementById("senha");
// //     let nome = inputNome.value.trim();
// //     let senha = inputSenha.value.trim();

// //     if (!nome) {
// //         showAlert("Digite um nome!");
// //         return;
// //     }

// //     if (!senha) {
// //         showAlert("Digite uma senha!");
// //         return;
// //     }

// //     if (/\d/.test(nome)) {
// //         showAlert("O nome não pode conter números!");
// //         return;
// //     }

// //     nome = nome.toLowerCase(); // Converte para minúsculo para comparação

// //     if (participantes.find(p => p.nome === nome)) {
// //         showAlert("Este nome já foi adicionado!");
// //         return;
// //     }

// //     const lista = document.getElementById("listaAmigos");
// //     const item = document.createElement("li");
// //     item.textContent = nome;

// //     // Cria o botão de remoção
// //     const botaoRemover = document.createElement("button");
// //     botaoRemover.textContent = "❌"; // Emoji de "X"
// //     botaoRemover.classList.add("button-remover"); // Adiciona uma classe para estilo
// //     botaoRemover.onclick = function() {
// //         lista.removeChild(item); // Remove o item da lista
// //         participantes = participantes.filter(p => p.nome !== nome); // Remove do array
// //     };

// //     item.appendChild(botaoRemover); // Adiciona o botão ao item da lista
// //     lista.appendChild(item);

// //     participantes.push({ nome: nome, senha: senha }); // Armazena nome e senha

// //     inputNome.value = "";
// //     inputSenha.value = "";
// // }


// function adicionarAmigo() {
//     const inputNome = document.getElementById("amigo");
//     const inputSenha = document.getElementById("senha");
//     let nome = inputNome.value.trim();
//     let senha = inputSenha.value.trim();

//     if (!nome) {
//         showAlert("Digite um nome!");
//         return;
//     }

//     if (!senha) {
//         showAlert("Digite uma senha!");
//         return;
//     }

//     // Validação da senha
//     const senhaInvalida = validarSenha(senha);
//     if (senhaInvalida) {
//         showAlert(senhaInvalida); // Exibe a mensagem de erro da senha
//         return; // Impede a adição do amigo
//     }

//     if (/\d/.test(nome)) {
//         showAlert("O nome não pode conter números!");
//         return;
//     }

//     nome = nome.toLowerCase(); // Converte para minúsculo para comparação

//     if (participantes.find(p => p.nome === nome)) {
//         showAlert("Este nome já foi adicionado!");
//         return;
//     }

//     const lista = document.getElementById("listaAmigos");
//     const item = document.createElement("li");
//     item.textContent = nome;

//     // Cria o botão de remoção
//     const botaoRemover = document.createElement("button");
//     botaoRemover.textContent = "❌"; // Emoji de "X"
//     botaoRemover.classList.add("button-remover"); // Adiciona uma classe para estilo
//     botaoRemover.onclick = function() {
//         lista.removeChild(item); // Remove o item da lista
//         participantes = participantes.filter(p => p.nome !== nome); // Remove do array
//     };

//     item.appendChild(botaoRemover); // Adiciona o botão ao item da lista
//     lista.appendChild(item);

//     participantes.push({ nome: nome, senha: senha }); // Armazena nome e senha

//     inputNome.value = "";
//     inputSenha.value = "";
// }

// let confettiInstance = null;

// function soltarConfetes() {
//   const confettiSettings = {
//     target: 'confetti-canvas',
//     max: 100,
//     size: 1.5,
//     animate: true,
//     props: ['circle', 'square', 'triangle'],
//     colors: [[165, 104, 246], [230, 61, 135], [0, 199, 228], [253, 214, 126]],
//     clock: 25,
//     rotate: true,
//     width: window.innerWidth,
//     height: window.innerHeight
//   };
//   confettiInstance = new ConfettiGenerator(confettiSettings);
//   confettiInstance.render();
// }

// function pararConfetes() {
//   if (confettiInstance) {
//     confettiInstance.clear();
//     confettiInstance = null;
//     const canvas = document.getElementById('confetti-canvas');
//     if (canvas) {
//       canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
//     }
//   }
// }

// function gerarListaSorteioTexto(amigos, sorteados) {
//   const dataSorteio = new Date().toLocaleDateString();
//   let texto = `Lista do Amigo Secreto ${dataSorteio}\n\n`;
//   for (let i = 0; i < amigos.length; i++) {
//     texto += `${amigos[i]} -> ${sorteados[(i + 1) % amigos.length]}\n`;
//   }
//   return texto;
// }

// function salvarListaSorteio(amigos, sorteados) {
//   const textoParaSalvar = gerarListaSorteioTexto(amigos, sorteados);
//   const blob = new Blob([textoParaSalvar], { type: 'text/plain;charset=utf-8' });
//   const url = URL.createObjectURL(blob);
//   const link = document.createElement('a');
//   link.href = url;
//   link.download = `lista_amigo_secreto_${new Date().toLocaleDateString().replace(/\//g, '-')}.txt`;
//   document.body.appendChild(link); // Necessário para Firefox
//   link.click();
//   document.body.removeChild(link);
//   URL.revokeObjectURL(url); // Limpa o objeto URL
// }


// function setDisplay(elementIds, displayValue) {
//     elementIds.forEach(id => {
//         const element = document.getElementById(id);
//         if (element) {
//             element.style.display = displayValue;
//         }
//     });
// }

// // function sortearAmigo() {
// //     if (participantes.length < 2) {
// //         showAlert("Adicione pelo menos dois amigos para sortear!");
// //         return;
// //     }

// //     const lista = document.getElementById("listaAmigos");
// //     lista.style.display = "none";

// //     // Oculta os elementos de entrada
// //     setDisplay(["titulo-amigos", "input-wrapper", "amigo", "senha", "botao-adicionar"], "none");

// //     const resultado = document.getElementById("resultado");
// //     resultado.innerHTML = "";

// //     const mensagem = document.createElement("div");
// //     mensagem.classList.add("resultado-mensagem");
// //     mensagem.innerHTML = "🎉 <strong>Resultado do Sorteio!!! Já podem comprar os presentes</strong> 🎉";
// //     resultado.appendChild(mensagem);

// //     // Embaralha os participantes para o sorteio
// //     let sorteados = [...participantes];
// //     sorteados = sorteados.sort(() => Math.random() - 0.5);

// //     // Cria um objeto para armazenar os resultados do sorteio (nome -> quem tirou)
// //     const resultadosSorteio = {};
// //     for (let i = 0; i < participantes.length; i++) {
// //         resultadosSorteio[participantes[i].nome] = sorteados[(i + 1) % participantes.length].nome;
// //     }

// //     // Para cada participante, mostra um botão para verificar o resultado com a senha
// //     participantes.forEach(participante => {
// //         const botaoVerificar = document.createElement("button");
// //         botaoVerificar.textContent = `Verificar sorteio de ${participante.nome}`;
// //         botaoVerificar.classList.add("button-verificar");
// //         botaoVerificar.onclick = () => verificarSenha(participante.nome, resultadosSorteio[participante.nome]);
// //         resultado.appendChild(botaoVerificar);
// //     });

// //     soltarConfetes();

// //     // Toca o som de alegria
// //     const audioAlegria = document.getElementById("audio-alegria");
// //     if (audioAlegria) {
// //         audioAlegria.play();
// //     }

// //     // Esconde o botão "Sortear amigo"
// //     document.querySelector(".button-draw").style.display = "none";

// //     // Mostra o botão "Baixar Lista"
// //     const botaoBaixar = document.createElement("button");
// //     botaoBaixar.textContent = "📃 Baixar Lista"; // Adicionado o emoji "📃"
// //     botaoBaixar.classList.add("button-download"); // Adiciona uma classe para estilização
// //     botaoBaixar.onclick = () => salvarListaSorteio(participantes.map(p => p.nome), sorteados.map(p => p.nome));
// //     document.querySelector(".button-container").appendChild(botaoBaixar);

// //     // Mostra o botão "Novo Sorteio"
// //     document.getElementById("button-reset").style.display = "inline-block";
// // }


// // function verificarSenha(nome, amigoSorteado) {
// //     const senha = prompt(`Digite a senha para ${nome}:`);
// //     const participante = participantes.find(p => p.nome === nome);

// //     if (participante && senha === participante.senha) {
// //         showAlert(`${nome} tirou ${amigoSorteado}!`);
// //     } else {
// //         showAlert("Senha incorreta!");
// //     }
// // }

// // function reiniciarSorteio() {
// //     pararConfetes();

// //     const listaAmigos = document.getElementById("listaAmigos");
// //     while (listaAmigos.firstChild) {
// //         listaAmigos.removeChild(listaAmigos.firstChild);
// //     }
// //     listaAmigos.style.display = "block";

// //     participantes = []; // Limpa o array de participantes

// //     const resultado = document.getElementById("resultado");
// //     resultado.innerHTML = "";

// //     // Mostra novamente o botão "Sortear amigo"
// //     document.querySelector(".button-draw").style.display = "flex";

// //     // Remove o botão "Baixar Lista"
// //     const botaoBaixar = document.querySelector(".button-download");
// //     if (botaoBaixar) {
// //         botaoBaixar.remove();
// //     }

// //     document.getElementById("button-reset").style.display = "none";

// //     // Mostra os elementos de entrada novamente
// //     setDisplay(["titulo-amigos"], "block");
// //     setDisplay(["input-wrapper"], "flex");
// //     setDisplay(["amigo"], "block");
// //     setDisplay(["senha"], "block"); // Mostra o campo de senha
// //     setDisplay(["botao-adicionar"], "inline-block");

// //     // Fala "Amigo secreto. Digite o nome dos seus amigos." ao reiniciar
// //     if (responsiveVoice) {
// //         responsiveVoice.speak("Amigo secreto. Digite o nome dos seus amigos.", 'Brazilian Portuguese Female', { rate: 1.2 });
// //     } else {
// //         console.error("responsiveVoice não está definido. Verifique se a biblioteca foi carregada corretamente.");
// //     }
// // }

// // function showAlert(message) {
// //     const customAlert = document.getElementById("custom-alert");
// //     const customAlertMessage = document.getElementById("custom-alert-message");
// //     const customAlertOk = document.getElementById("custom-alert-ok");

// //     customAlertMessage.textContent = message;

// //     if (responsiveVoice) {
// //         responsiveVoice.speak(message, 'Brazilian Portuguese Female', { rate: 1.2 });
// //     } else {
// //         console.error("responsiveVoice não está definido. Verifique se a biblioteca foi carregada corretamente.");
// //     }

// //     customAlert.style.display = "flex"; // Exibe o modal

// //     customAlertOk.onclick = function() {
// //         customAlert.style.display = "none"; // Oculta o modal
// //         document.getElementById("amigo").value = ""; // Limpa o input
// //     };
// // }

// function sortearAmigo() {
//     if (participantes.length < 2) {
//         showAlert("Adicione pelo menos dois amigos para sortear!");
//         return;
//     }

//     const lista = document.getElementById("listaAmigos");
//     lista.style.display = "none";

//     // Oculta os elementos de entrada
//     setDisplay(["titulo-amigos", "input-wrapper", "amigo", "senha", "botao-adicionar"], "none");

//     const resultado = document.getElementById("resultado");
//     resultado.innerHTML = "";

//     const mensagem = document.createElement("div");
//     mensagem.classList.add("resultado-mensagem");
//     mensagem.innerHTML = "🎉 <strong>Resultado do Sorteio!!! Já podem comprar os presentes</strong> 🎉";
//     resultado.appendChild(mensagem);

//     // Embaralha os participantes para o sorteio
//     let sorteados = [...participantes];
//     sorteados = sorteados.sort(() => Math.random() - 0.5);

//     // Cria um objeto para armazenar os resultados do sorteio (nome -> quem tirou)
//     const resultadosSorteio = {};
//     for (let i = 0; i < participantes.length; i++) {
//         resultadosSorteio[participantes[i].nome] = sorteados[(i + 1) % participantes.length].nome;
//     }

//     // Para cada participante, mostra um botão para verificar o resultado com a senha
//     participantes.forEach(participante => {
//         const botaoVerificar = document.createElement("button");
//         botaoVerificar.textContent = `Verificar sorteio de ${participante.nome}`;
//         botaoVerificar.classList.add("button-verificar");
//         botaoVerificar.onclick = () => verificarSenha(participante.nome, resultadosSorteio[participante.nome]);
//         resultado.appendChild(botaoVerificar);
//     });

//     soltarConfetes();

//     // Toca o som de alegria
//     const audioAlegria = document.getElementById("audio-alegria");
//     if (audioAlegria) {
//         audioAlegria.play();
//     }

//     // Esconde o botão "Sortear amigo"
//     document.querySelector(".button-draw").style.display = "none";

//     // **REMOVIDO:** A criação e adição do botão "Baixar Lista"
//     //const botaoBaixar = document.createElement("button");
//     //botaoBaixar.textContent = "📃 Baixar Lista"; // Adicionado o emoji "📃"
//     //botaoBaixar.classList.add("button-download"); // Adiciona uma classe para estilização
//     //botaoBaixar.onclick = () => salvarListaSorteio(participantes.map(p => p.nome), sorteados.map(p => p.nome));
//     //document.querySelector(".button-container").appendChild(botaoBaixar);

//     // Mostra o botão "Novo Sorteio"
//     document.getElementById("button-reset").style.display = "inline-block";
// }


// function verificarSenha(nome, amigoSorteado) {
//     const senha = prompt(`Digite a senha para ${nome}:`);
//     const participante = participantes.find(p => p.nome === nome);

//     if (participante && senha === participante.senha) {
//         showAlert(`${nome} tirou ${amigoSorteado}!`);
//     } else {
//         showAlert("Senha incorreta!");
//     }
// }

// function reiniciarSorteio() {
//     pararConfetes();

//     const listaAmigos = document.getElementById("listaAmigos");
//     while (listaAmigos.firstChild) {
//         listaAmigos.removeChild(listaAmigos.firstChild);
//     }
//     listaAmigos.style.display = "block";

//     participantes = []; // Limpa o array de participantes

//     const resultado = document.getElementById("resultado");
//     resultado.innerHTML = "";

//     // Mostra novamente o botão "Sortear amigo"
//     document.querySelector(".button-draw").style.display = "flex";

//     // Remove o botão "Baixar Lista"
//     const botaoBaixar = document.querySelector(".button-download");
//     if (botaoBaixar) {
//         botaoBaixar.remove();
//     }

//     document.getElementById("button-reset").style.display = "none";

//     // Mostra os elementos de entrada novamente
//     setDisplay(["titulo-amigos"], "block");
//     setDisplay(["input-wrapper"], "flex");
//     setDisplay(["amigo"], "block");
//     setDisplay(["senha"], "block"); // Mostra o campo de senha
//     setDisplay(["botao-adicionar"], "inline-block");

//     // Fala "Amigo secreto. Digite o nome dos seus amigos." ao reiniciar
//     if (responsiveVoice) {
//         responsiveVoice.speak("Amigo secreto. Digite o nome dos seus amigos.", 'Brazilian Portuguese Female', { rate: 1.2 });
//     } else {
//         console.error("responsiveVoice não está definido. Verifique se a biblioteca foi carregada corretamente.");
//     }
// }

// function validarSenha(senha) {
//     const minLength = 8; // Comprimento mínimo da senha
//     const hasUpperCase = /[A-Z]/.test(senha); // Verifica se tem letra maiúscula
//     const hasLowerCase = /[a-z]/.test(senha); // Verifica se tem letra minúscula
//     const hasNumber = /\d/.test(senha); // Verifica se tem número
//     const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(senha); // Verifica se tem caracter especial

//     if (senha.length < minLength) {
//         return "A senha deve ter pelo menos " + minLength + " caracteres.";
//     }
//     if (!hasUpperCase) {
//         return "A senha deve ter pelo menos uma letra maiúscula.";
//     }
//     if (!hasLowerCase) {
//         return "A senha deve ter pelo menos uma letra minúscula.";
//     }
//     if (!hasNumber) {
//         return "A senha deve ter pelo menos um número.";
//     }
//     if (!hasSpecialChar) {
//         return "A senha deve ter pelo menos um caracter especial.";
//     }

//     return null; // Retorna null se a senha for válida
// }

// let participantes = []; // Array para armazenar os participantes (nome e senha)

// function showAlert(message) {
//     const customAlert = document.getElementById("custom-alert");
//     const customAlertMessage = document.getElementById("custom-alert-message");
//     const customAlertOk = document.getElementById("custom-alert-ok");

//     customAlertMessage.textContent = message;

//     if (responsiveVoice) {
//         responsiveVoice.speak(message, 'Brazilian Portuguese Female', { rate: 1.2 });
//     } else {
//         console.error("responsiveVoice não está definido. Verifique se a biblioteca foi carregada corretamente.");
//     }

//     customAlert.style.display = "flex"; // Exibe o modal

//     customAlertOk.onclick = function() {
//         customAlert.style.display = "none"; // Oculta o modal
//         document.getElementById("amigo").value = ""; // Limpa o input
//     };
// }

// function validarSenha(senha) {
//     const minLength = 8; // Comprimento mínimo da senha
//     const hasUpperCase = /[A-Z]/.test(senha); // Verifica se tem letra maiúscula
//     const hasLowerCase = /[a-z]/.test(senha); // Verifica se tem letra minúscula
//     const hasNumber = /\d/.test(senha); // Verifica se tem número
//     const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(senha); // Verifica se tem caracter especial

//     if (senha.length < minLength) {
//         return "A senha deve ter pelo menos " + minLength + " caracteres.";
//     }
//     if (!hasUpperCase) {
//         return "A senha deve ter pelo menos uma letra maiúscula.";
//     }
//     if (!hasLowerCase) {
//         return "A senha deve ter pelo menos uma letra minúscula.";
//     }
//     if (!hasNumber) {
//         return "A senha deve ter pelo menos um número.";
//     }
//     if (!hasSpecialChar) {
//         return "A senha deve ter pelo menos um caracter especial.";
//     }

//     return null; // Retorna null se a senha for válida
// }

// function adicionarAmigo() {
//     const inputNome = document.getElementById("amigo");
//     const inputSenha = document.getElementById("senha");
//     let nome = inputNome.value.trim();
//     let senha = inputSenha.value.trim();

//     if (!nome) {
//         showAlert("Digite um nome!");
//         return;
//     }

//     if (!senha) {
//         showAlert("Digite uma senha!");
//         return;
//     }

//     // Validação da senha
//     const senhaInvalida = validarSenha(senha);
//     if (senhaInvalida) {
//         showAlert(senhaInvalida); // Exibe a mensagem de erro da senha
//         return; // Impede a adição do amigo
//     }

//     if (/\d/.test(nome)) {
//         showAlert("O nome não pode conter números!");
//         return;
//     }

//     nome = nome.toLowerCase(); // Converte para minúsculo para comparação

//     if (participantes.find(p => p.nome === nome)) {
//         showAlert("Este nome já foi adicionado!");
//         return;
//     }

//     const lista = document.getElementById("listaAmigos");
//     const item = document.createElement("li");
//     item.textContent = nome;

//     // Cria o botão de remoção
//     const botaoRemover = document.createElement("button");
//     botaoRemover.textContent = "❌"; // Emoji de "X"
//     botaoRemover.classList.add("button-remover"); // Adiciona uma classe para estilo
//     botaoRemover.onclick = function() {
//         lista.removeChild(item); // Remove o item da lista
//         participantes = participantes.filter(p => p.nome !== nome); // Remove do array
//     };

//     item.appendChild(botaoRemover); // Adiciona o botão ao item da lista
//     lista.appendChild(item);

//     participantes.push({ nome: nome, senha: senha }); // Armazena nome e senha

//     inputNome.value = "";
//     inputSenha.value = "";
// }

// let confettiInstance = null;

// function soltarConfetes() {
//   const confettiSettings = {
//     target: 'confetti-canvas',
//     max: 100,
//     size: 1.5,
//     animate: true,
//     props: ['circle', 'square', 'triangle'],
//     colors: [[165, 104, 246], [230, 61, 135], [0, 199, 228], [253, 214, 126]],
//     clock: 25,
//     rotate: true,
//     width: window.innerWidth,
//     height: window.innerHeight
//   };
//   confettiInstance = new ConfettiGenerator(confettiSettings);
//   confettiInstance.render();
// }

// function pararConfetes() {
//   if (confettiInstance) {
//     confettiInstance.clear();
//     confettiInstance = null;
//     const canvas = document.getElementById('confetti-canvas');
//     if (canvas) {
//       canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
//     }
//   }
// }

// function gerarListaSorteioTexto(amigos, sorteados) {
//   const dataSorteio = new Date().toLocaleDateString();
//   let texto = `Lista do Amigo Secreto ${dataSorteio}\n\n`;
//   for (let i = 0; i < amigos.length; i++) {
//     texto += `${amigos[i]} -> ${sorteados[(i + 1) % amigos.length]}\n`;
//   }
//   return texto;
// }

// function salvarListaSorteio(amigos, sorteados) {
//   const textoParaSalvar = gerarListaSorteioTexto(amigos, sorteados);
//   const blob = new Blob([textoParaSalvar], { type: 'text/plain;charset=utf-8' });
//   const url = URL.createObjectURL(blob);
//   const link = document.createElement('a');
//   link.href = url;
//   link.download = `lista_amigo_secreto_${new Date().toLocaleDateString().replace(/\//g, '-')}.txt`;
//   document.body.appendChild(link); // Necessário para Firefox
//   link.click();
//   document.body.removeChild(link);
//   URL.revokeObjectURL(url); // Limpa o objeto URL
// }


// function setDisplay(elementIds, displayValue) {
//     elementIds.forEach(id => {
//         const element = document.getElementById(id);
//         if (element) {
//             element.style.display = displayValue;
//         }
//     });
// }

// function sortearAmigo() {
//     if (participantes.length < 2) {
//         showAlert("Adicione pelo menos dois amigos para sortear!");
//         return;
//     }

//     const lista = document.getElementById("listaAmigos");
//     lista.style.display = "none";

//     // Oculta os elementos de entrada
//     setDisplay(["titulo-amigos", "input-wrapper", "amigo", "senha", "botao-adicionar"], "none");

//     const resultado = document.getElementById("resultado");
//     resultado.innerHTML = "";

//     const mensagem = document.createElement("div");
//     mensagem.classList.add("resultado-mensagem");
//     mensagem.innerHTML = "🎉 <strong>Resultado do Sorteio!!! Já podem comprar os presentes</strong> 🎉";
//     resultado.appendChild(mensagem);

//     // Embaralha os participantes para o sorteio
//     let sorteados = [...participantes];
//     sorteados = sorteados.sort(() => Math.random() - 0.5);

//     // Cria um objeto para armazenar os resultados do sorteio (nome -> quem tirou)
//     const resultadosSorteio = {};
//     for (let i = 0; i < participantes.length; i++) {
//         resultadosSorteio[participantes[i].nome] = sorteados[(i + 1) % participantes.length].nome;
//     }

//     // Para cada participante, mostra um botão para verificar o resultado com a senha
//     participantes.forEach(participante => {
//         const botaoVerificar = document.createElement("button");
//         botaoVerificar.textContent = `Verificar sorteio de ${participante.nome}`;
//         botaoVerificar.classList.add("button-verificar");
//         botaoVerificar.onclick = () => verificarSenha(participante.nome, resultadosSorteio[participante.nome]);
//         resultado.appendChild(botaoVerificar);
//     });

//     soltarConfetes();

//     // Toca o som de alegria
//     const audioAlegria = document.getElementById("audio-alegria");
//     if (audioAlegria) {
//         audioAlegria.play();
//     }

//     // Esconde o botão "Sortear amigo"
//     document.querySelector(".button-draw").style.display = "none";

//     // Mostra o botão "Novo Sorteio"
//     document.getElementById("button-reset").style.display = "inline-block";
// }


// function verificarSenha(nome, amigoSorteado) {
//     const senha = prompt(`Digite a senha para ${nome}:`);
//     const participante = participantes.find(p => p.nome === nome);

//     if (participante && senha === participante.senha) {
//         showAlert(`${nome} tirou ${amigoSorteado}!`);
//     } else {
//         showAlert("Senha incorreta!");
//     }
// }

// function reiniciarSorteio() {
//     pararConfetes();

//     const listaAmigos = document.getElementById("listaAmigos");
//     while (listaAmigos.firstChild) {
//         listaAmigos.removeChild(listaAmigos.firstChild);
//     }
//     listaAmigos.style.display = "block";

//     participantes = []; // Limpa o array de participantes

//     const resultado = document.getElementById("resultado");
//     resultado.innerHTML = "";

//     // Mostra novamente o botão "Sortear amigo"
//     document.querySelector(".button-draw").style.display = "flex";

//     document.getElementById("button-reset").style.display = "none";

//     // Mostra os elementos de entrada novamente
//     setDisplay(["titulo-amigos"], "block");
//     setDisplay(["input-wrapper"], "flex");
//     setDisplay(["amigo"], "block");
//     setDisplay(["senha"], "block"); // Mostra o campo de senha
//     setDisplay(["botao-adicionar"], "inline-block");

//     // Fala "Amigo secreto. Digite o nome dos seus amigos." ao reiniciar
//     if (responsiveVoice) {
//         responsiveVoice.speak("Amigo secreto. Digite o nome dos seus amigos.", 'Brazilian Portuguese Female', { rate: 1.2 });
//     } else {
//         console.error("responsiveVoice não está definido. Verifique se a biblioteca foi carregada corretamente.");
//     }
// }

let participantes = []; // Array para armazenar os participantes (nome e senha)

function showAlert(message) {
    const customAlert = document.getElementById("custom-alert");
    const customAlertMessage = document.getElementById("custom-alert-message");
    const customAlertOk = document.getElementById("custom-alert-ok");

    customAlertMessage.textContent = message;

    if (responsiveVoice) {
        responsiveVoice.speak(message, 'Brazilian Portuguese Female', { rate: 1.2 });
    } else {
        console.error("responsiveVoice não está definido. Verifique se a biblioteca foi carregada corretamente.");
    }

    customAlert.style.display = "flex"; // Exibe o modal

    customAlertOk.onclick = function() {
        customAlert.style.display = "none"; // Oculta o modal
        document.getElementById("amigo").value = ""; // Limpa o input
    };
}

function validarSenha(senha) {
    if (!senha || senha.trim() === "") {
        return "Por favor, digite uma senha.";
    }
    return null; // Retorna null se a senha for válida
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

    // Validação da senha
    const senhaInvalida = validarSenha(senha);
    if (senhaInvalida) {
        showAlert(senhaInvalida); // Exibe a mensagem de erro da senha
        return; // Impede a adição do amigo
    }

    if (/\d/.test(nome)) {
        showAlert("O nome não pode conter números!");
        return;
    }

    nome = nome.toLowerCase(); // Converte para minúsculo para comparação

    if (participantes.find(p => p.nome === nome)) {
        showAlert("Este nome já foi adicionado!");
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
        participantes = participantes.filter(p => p.nome !== nome); // Remove do array
    };

    item.appendChild(botaoRemover); // Adiciona o botão ao item da lista
    lista.appendChild(item);

    participantes.push({ nome: nome, senha: senha }); // Armazena nome e senha

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

    // Embaralha os participantes para o sorteio
    let sorteados = [...participantes];
    sorteados = sorteados.sort(() => Math.random() - 0.5);

    // Cria um objeto para armazenar os resultados do sorteio (nome -> quem tirou)
    const resultadosSorteio = {};
    for (let i = 0; i < participantes.length; i++) {
        resultadosSorteio[participantes[i].nome] = sorteados[(i + 1) % participantes.length].nome;
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
}


function verificarSenha(nome, amigoSorteado) {
    const senha = prompt(`Digite a senha para ${nome}:`);
    const participante = participantes.find(p => p.nome === nome);

    if (participante && senha === participante.senha) {
        showAlert(`${nome} tirou ${amigoSorteado}!`);
    } else {
        showAlert("Senha incorreta!");
    }
}

function reiniciarSorteio() {
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

    // Fala "Amigo secreto. Digite o nome dos seus amigos." ao reiniciar
    if (responsiveVoice) {
        responsiveVoice.speak("Amigo secreto. Digite o nome dos seus amigos.", 'Brazilian Portuguese Female', { rate: 1.2 });
    } else {
        console.error("responsiveVoice não está definido. Verifique se a biblioteca foi carregada corretamente.");
    }
}
