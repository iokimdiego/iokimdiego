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

let valorAtual = '0';               // O valor que está sendo mostrado no display
let valorAnterior = null;           // O valor que estava antes do atual
let segundoNumeral = false;         // Se o usuário já apertou um operador e está digitando o segundo número
let operador = null;                // A operação que o usuário escolheu (+ - * /)
let acabouDeCalcular = false;       // Se o último botão apertado foi [=]
let expressao = '';                 // A expressão completa (ex: 5 + 3)

let historico = JSON.parse(localStorage.getItem('calcHistory')) || []; // Array para guardar o histórico

// --------------------------------------------------------------------
// Passo 2: funções utilitárias (pequenos blocos de código que vou usar várias vezes)

// Atualiza o display com o valor atual
function atualizarDisplay(valor) {
    displayValor.textContent = valor.replace(/\./g, ",");    // Substitui ponto por vírgula para exibição
}

function atualizarDisplayExpressao() {
    displayValor.textContent = expressao.replace(/\./g, ",") || valorAtual.replace(/\./g, ",");   // Mostra a expressão ou o valor atual
}

// Salva o histórico na tela
function salvarHistorico(item) {
    historico.unshift(item);         // Adiciona no começo do array
    if (historico.length > 5) {
        historico.pop();             // Remove o último item se tiver mais de 5
    }
    localStorage.setItem('calcHistory', JSON.stringify(historico)); // Salva no localStorage
    renderHistorico(); // Atualiza a lista do histórico na tela
}

// Formata e substitui ponto por vírgula
function formatarDecimais(expr) {
    return String(expr).replace(/(\d+)\.(\d+)/g, '$1,$2');
}

// Renderiza o histórico na tela
function renderHistorico() {
    if (!listaHistorico) return;                    // Se o elemento não existe, sai da função
    listaHistorico.innerHTML = '';                  // Limpa a lista
    historico.forEach(item => {
        const li = document.createElement('li');    // Cria um novo item de lista
        li.textContent = formatarDecimais(item);    // Define o texto do item
        listaHistorico.appendChild(li);             // Adiciona o item na lista
    });
}

// --------------------------------------------------------------------
// Passo 3: digitando números (0-9 . e <-)

function inserirNumero(digito) {
    if (acabouDeCalcular) {
        valorAtual = digito;                                                                // começa novo número
        expressao = digito;                                                                 // reseta a expressão
        acabouDeCalcular = false;
    } else if (segundoNumeral) {
        // se está digitando o segundo número
        valorAtual = digito;                                                                // começa novo número
        expressao = `${valorAnterior} ${operador} ${valorAtual}`;                           // continua a expressão
        segundoNumeral = false;                                                             // já não está mais digitando o segundo número
    } else if (valorAtual === '0' && digito !== '.') {
        valorAtual = digito;                                                                // substitui o zero inicial
        expressao = operador ? `${valorAnterior} ${operador} ${valorAtual}` : valorAtual;   // continua a expressão
    } else {
        valorAtual += digito;                                                               // concatena dígito
        expressao = operador ? `${valorAnterior} ${operador} ${valorAtual}` : valorAtual;   // continua a expressão
    }

    atualizarDisplay(expressao);                                                            // mostra a expressão completa

}

// Inserir ponto decimal
function inserirPonto() {
    if (acabouDeCalcular) {
        valorAtual = '0.';                                                                  // começa novo número decimal
        expressao = valorAtual;                                                             // reseta a expressão
        acabouDeCalcular = false;
    } else if (segundoNumeral) {
        valorAtual = '0.';
        expressao = `${valorAnterior} ${operador} ${valorAtual}`;                           // continua a expressão
        segundoNumeral = false;
    } else if (!valorAtual.includes('.')) {
        valorAtual += '.';                                                                  // só adiciona se ainda não tiver ponto
        expressao = operador ? `${valorAnterior} ${operador} ${valorAtual}` : valorAtual;   // continua a expressão
    } else {
        return;                                                                             // se já tem ponto, não faz nada
    }

    atualizarDisplay(expressao);

}

// --------------------------------------------------------------------
// Passo 4: operações (+, -, *, /, =)

function definirOperador(op) {
    if (operador && !acabouDeCalcular) {
        calcular();                               // resolve operação pendente
    }
    console.log('Valor Anterior:', valorAnterior);
    valorAnterior = valorAtual;                   // guarda o número atual
    operador = (op === 'x') ? '*' : op;           // converte 'x' para '*'
    expressao = `${valorAnterior} ${op} `;        // monta a expressão até aqui
    atualizarDisplay(expressao);
    console.log('Expressão:', expressao);
    segundoNumeral = true;                        // agora está digitando o segundo número
    acabouDeCalcular = false;
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
                segundoNumeral = false;
                return;
            }
            resultado = numAnterior / numAtual; 
            break;
        default: return; // Operação desconhecida
    }

    // Formata o resultado para evitar muitos dígitos decimais
    resultado = Number.isInteger(resultado) ? resultado : parseFloat(resultado.toFixed(5));

    // mostra e organiza o estado
    const expressaoFinal = `${numAnterior} ${operador} ${numAtual} = ${resultado}`;         // Cria a expressão final
    salvarHistorico(expressaoFinal);                                                        // Salva no histórico
    valorAtual = resultado.toString();                                                      // Atualiza o valor atual com o resultado
    atualizarDisplay(valorAtual);

    expressao = valorAtual;                                                                 // Reseta a expressão para o resultado
    valorAnterior = null;                                                                   // Reseta o valor anterior
    operador = null;                                                                        // Reseta a operação
    acabouDeCalcular = true;                                                                // Marca que acabou de calcular
    segundoNumeral = false;                                                                 // Reseta o estado do segundo numeral
}

// --------------------------------------------------------------------
// Passo 6: botões especiais (C, +/-, %)

// Limpa tudo (AC)
function limparTudo() {
    expressao = '';
    valorAtual = '0';
    valorAnterior = null;
    operador = null;
    acabouDeCalcular = true;                                                                // Marca que acabou de calcular
    segundoNumeral = false;                                                                 // Reseta o estado do segundo numeral
    atualizarDisplay(valorAtual);
}

// Apagar último dígito (<-)
function apagarUltimo() {
    if (valorAtual.length >= 1) {
        valorAtual = valorAtual.slice(0, -1) || '0';                                        // Remove o último caractere ou volta para '0'
        expressao = expressao.slice(0, -1) || '';                                           // Remove o último caractere da expressão
        atualizarDisplayExpressao();                                                        // Atualiza o display com a expressão completa
    }
}

// Porcentagem (%)
function percentual() {
    valorAtual = (parseFloat(valorAtual) / 100).toString();                                 // Divide por 100
    atualizarDisplay(valorAtual);
}

// --------------------------------------------------------------------
// Passo 7: gerenciar cliques nos botões

botoes.forEach(botao => {
    botao.addEventListener('click', () => {
        const valor = botao.textContent;

        if (botao.classList.contains('limpar')) return limparTudo();
        if (botao.classList.contains('apagar')) return apagarUltimo();
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
renderHistorico();                                                          // Mostra o histórico quando a página carrega
atualizarDisplay(valorAtual);                                               // Mostra o valor inicial no display

// Limpar histórico ao clicar no link

// Seleciona o link de limpar histórico
const btnLimparHistorico = document.getElementById('limpar-historico');

// Função para limpar o histórico
function limparHistorico() {
    historico = [];                                                         // Limpa o array do histórico
    localStorage.removeItem('calcHistory');                                 // Remove do localStorage
    renderHistorico();                                                      // Atualiza a lista na tela
}

// Adiciona o evento de clique ao link
btnLimparHistorico.addEventListener("click", (evento) => {
    evento.preventDefault();                                                // Evita o comportamento padrão do link
    limparHistorico();                                                      // Chama a função para limpar o histórico
});

// Passo 8: ouvir as teclas do teclado

document.addEventListener('keydown', (evento) => {
    const tecla = evento.key;

    // Se for um número (0-9)
    if (/^\d$/.test(tecla)) {
        inserirNumero(tecla);
    }

    // Se for um ponto (.)
    else if (tecla === ',') {
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
        valorAtual = valorAtual.slice(0, -1) || '0';                    // Remove o último caractere ou volta para '0'
        expressao = expressao.slice(0, -1) || '';                       // Remove o último caractere da expressão
        atualizarDisplayExpressao();                                    // Atualiza o display com a expressão completa
    }
});