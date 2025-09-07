// Gerencia cliques nos botões
// Faz os cálculos usando JS
// Salva o resultado num array e mostra no histórico
// Salva o histórico no localStorage


// Passo 0: pegar os elementos do HTML que vou precisar
const displayValor = document.querySelector('#display-calculo h1');
const botoes = document.querySelectorAll('.btn');
const listaHistorico = document.getElementById('historico-lista');

// --------------------------------------------------------------------
// Passo 1: criar variáveis que vou precisar

let valorAtual = '0'; // O valor que está sendo mostrado no display
let valorAnterior = null; // O valor que estava antes do atual
let operador = null; // A operação que o usuário escolheu (+ - * /)
let acabouDeCalcular = false; // Se o último botão apertado foi [=]
let expressao = ''; // A expressão completa (ex: 5 + 3)

let historico = JSON.parse(localStorage.getItem('calcHistory')) || []; // Array para guardar o histórico

// --------------------------------------------------------------------
// Passo 2: funções utilitárias (pequenos blocos de código que vou usar várias vezes)

// Atualiza o display com o valor atual
function atualizarDisplay(valor) {
    displayValor.textContent = valor;
}

function atualizarDisplayExpressao() {
    displayValor.textContent = expressao || valorAtual; // Mostra a expressão ou o valor atual
}

// Salva o histórico na tela
function salvarHistorico(item) {
    historico.unshift(item); // Adiciona no começo do array
    if (historico.length > 5) {
        historico.pop(); // Remove o último item se tiver mais de 5
    }
    localStorage.setItem('calcHistory', JSON.stringify(historico)); // Salva no localStorage
    renderHistorico(); // Atualiza a lista do histórico na tela
}

// Renderiza o histórico na tela
function renderHistorico() {
    if (!listaHistorico) return; // Se o elemento não existe, sai da função
    listaHistorico.innerHTML = ''; // Limpa a lista
    historico.forEach(txt => {
        const li = document.createElement('li'); // Cria um novo item de lista
        li.textContent = txt; // Define o texto do item
        listaHistorico.appendChild(li); // Adiciona o item na lista
    });
}

// --------------------------------------------------------------------
// Passo 3: digitando números (0-9 e .)

function inserirNumero(digito) {
    if (acabouDeCalcular) {
        expressao = ''; // Se acabou de calcular, reseta a expressão
        valorAtual = digito; // Se acabou de calcular, começa um novo número
        acabouDeCalcular = false; // Reseta a flag
        // atualizarDisplay(valorAtual);
        // return;
    } else {
        valorAtual = (valorAtual === '0') ? digito : valorAtual + digito; // Evita múltiplos zeros à esquerda
    }

    expressao += digito; // Adiciona o dígito à expressão
    atualizarDisplayExpressao(); // Atualiza o display com a expressão completa

    // if (valorAtual === '0') {
    //     // Se o valor atual é 0, substitui pelo novo dígito
    //     valorAtual = digito;
    // } else {
    //     valorAtual += digito; // Adiciona o dígito ao final do número atual
    // }
    // atualizarDisplay(valorAtual);
}

function inserirPonto() {
    if (acabouDeCalcular) {
        valorAtual = '0.'; // Se acabou de calcular, começa um novo número com ponto
        acabouDeCalcular = false; // Reseta a flag
        atualizarDisplay(valorAtual); // Atualiza o display
        return;
    }
    if (!valorAtual.includes('.')) {
        valorAtual += '.'; // Adiciona o ponto se não tiver
        atualizarDisplay(valorAtual); // Atualiza o display
    }
}

// --------------------------------------------------------------------
// Passo 4: operações (+, -, *, /, =)

function definirOperador(op) {
    if (operador && !acabouDeCalcular) {
        // Se já tem uma operação e não acabou de calcular, faz o cálculo antes
        calcular();
    }
    
    valorAnterior = valorAtual; // Salva o valor atual como anterior
    operador = (op === 'x') ? '*' : op; // Define a operação (converte 'x' para '*')
    
    expressao += ` ${op} `; // Adiciona o operador à expressão
    valorAtual = '0'; // Reseta o valor atual para o próximo número
    acabouDeCalcular = false; // Reseta a flag

    atualizarDisplayExpressao(); // Atualiza o display com a expressão completa
    
    // acabouDeCalcular = false; // Reseta a flag
    // valorAtual = '0'; // Reseta o valor atual para o próximo número
}


// --------------------------------------------------------------------
// Passo 5: calcular (quando cliclar em =)

function calcular() {
    if (operador === null || valorAnterior === null) return; // Se não tem operação ou valor anterior, sai da função

    const numAnterior = parseFloat(valorAnterior);
    const numAtual = parseFloat(valorAtual);
    let resultado;

    switch (operador) {
        case '+': resultado = numAnterior + numAtual; break;
        case '-': resultado = numAnterior - numAtual; break;
        case '*': resultado = numAnterior * numAtual; break;
        case '/':
            if (numAtual === 0) {
                atualizarDisplay("Erro");
                // Reseta parcialmente o estado da calculadora
                valorAtual = '0';
                valorAnterior = null;
                operador = null;
                acabouDeCalcular = true;
                return;
            }
            resultado = numAnterior / numAtual; 
            break;
        default: return; // Operação desconhecida
    }

    // Formata o resultado para evitar muitos dígitos decimais
    resultado = Number.isInteger(resultado) ? resultado : parseFloat(resultado.toFixed(5));

    // mostra e organiza o estado
    const expressaoFinal = `${expressao} = ${resultado}`; // Cria a expressão final
    salvarHistorico(expressaoFinal); // Salva no histórico
    valorAtual = resultado.toString(); // Atualiza o valor atual com o resultado
    atualizarDisplay(valorAtual);

    expressao = valorAtual; // Reseta a expressão para o resultado
    valorAnterior = null; // Reseta o valor anterior
    operador = null; // Reseta a operação
    acabouDeCalcular = true; // Marca que acabou de calcular
}

// --------------------------------------------------------------------
// Passo 6: botões especiais (C, +/-, %)

// Limpa tudo (AC)
function limparTudo() {
    expressao = '';
    valorAtual = '0';
    valorAnterior = null;
    operador = null;
    acabouDeCalcular = false;
    atualizarDisplay(valorAtual);
}

// Inverte o sinal (+/-)
function inverterSinal() {
    if (valorAtual === '0') return; // Não faz nada se o valor é 0
    valorAtual = (parseFloat(valorAtual) * -1).toString(); // Inverte o sinal
    atualizarDisplay(valorAtual);
}

// Porcentagem (%)
function percentual() {
    valorAtual = (parseFloat(valorAtual) / 100).toString(); // Divide por 100
    atualizarDisplay(valorAtual);
}

// --------------------------------------------------------------------
// Passo 7: gerenciar cliques nos botões

botoes.forEach(botao => {
    botao.addEventListener('click', () => {
        const valor = botao.textContent;

        if (botao.classList.contains('limpar')) return limparTudo();
        if (botao.classList.contains('negativo')) return inverterSinal();
        if (botao.classList.contains('percentual')) return percentual();
        if (botao.classList.contains('operador')) return definirOperador(valor);
        if (botao.classList.contains('igual')) return calcular();
        if (botao.classList.contains('ponto')) return inserirPonto();
        
        // Se não for nenhum dos acima, é um número
        if (/^\d$/.test(valor)) { // Verifica se é um dígito (0-9)
            return inserirNumero(valor);
        }
    });
});

// --------------------------------------------------------------------
// Inicialização da calculadora ao carregar a página
renderHistorico(); // Mostra o histórico quando a página carrega
atualizarDisplay(valorAtual); // Mostra o valor inicial no display

// Limpar histórico ao clicar no link

// Seleciona o link de limpar histórico
const btnLimparHistorico = document.getElementById('limpar-historico');

// Função para limpar o histórico
function limparHistorico() {
    historico = []; // Limpa o array do histórico
    localStorage.removeItem('calcHistory'); // Remove do localStorage
    renderHistorico(); // Atualiza a lista na tela
}

// Adiciona o evento de clique ao link
btnLimparHistorico.addEventListener("click", (evento) => {
    evento.preventDefault(); // Evita o comportamento padrão do link
    limparHistorico(); // Chama a função para limpar o histórico
});

// Passo 8: ouvir as teclas do teclado

document.addEventListener('keydown', (evento) => {
    const tecla = evento.key;

    // Se for um número (0-9)
    if (/^\d$/.test(tecla)) {
        inserirNumero(tecla);
    }

    // Se for um ponto (.)
    else if (tecla === '.') {
        inserirPonto();
    }

    // Se for um operador (+, -, *, /)
    else if (['+', '-', '*', '/'].includes(tecla)) {
        definirOperador(tecla);
    }

    // Se for Enter ou =, calcula
    else if (tecla === 'Enter' || tecla === '=') {
        evento.preventDefault(); // Evita o comportamento padrão (ex: submit de formulário)
        calcular();
    }

    // Se for Delete ou ESC, limpa tudo (AC)
    else if (tecla === 'Delete' || tecla === 'Escape') {
        limparTudo();
    }

    // Se for Backspace, apaga o último dígito
    else if (tecla === 'Backspace') {
        valorAtual = valorAtual.slice(0, -1) || '0'; // Remove o último caractere ou volta para '0'
        expressao = expressao.slice(0, -1) || ''; // Remove o último caractere da expressão
        atualizarDisplayExpressao(); // Atualiza o display com a expressão completa
    }
});