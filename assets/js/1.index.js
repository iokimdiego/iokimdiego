// Cria uma variável para armazenar a classe Servicos e suas variações

const elementosCardServico = document.querySelectorAll(".card-servico");

elementosCardServico.forEach(function(card){
    card.addEventListener("click", function(){
        // Encontra o elemento pai ".servico" do card clicado
        const servicoPai = card.closest(".servicos");
        if (servicoPai) {
            // Adiciona ou remove a classe "ativa" apenas no elemento pai ".servico"
            servicoPai.classList.toggle("ativa");
        }
    });
});



// Exclui espaços duplicados durante a digitação do campo Nome

const nomeInput = document.getElementById('nome');

nomeInput.addEventListener('input', function() {
    this.value = this.value.replace(/\s{2,}/g, ' ');
});

// Aplica o padrão de telefone no número de telefone digitado pelo usuário

const telefoneInput = document.getElementById('telefone');

telefoneInput.addEventListener('blur', function() {
  let valor = this.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
  const tamanho = valor.length;

  if (tamanho > 0) {
    if (tamanho > 2) {
      valor = `(${valor.substring(0, 2)}) ${valor.substring(2)}`;
    }
    if (tamanho > 9) {
      valor = `${valor.substring(0, 10)}-${valor.substring(10)}`;
    } else if (tamanho > 5 && tamanho <= 9) {
      const parte1 = valor.substring(0, valor.length - 4);
      const parte2 = valor.substring(valor.length - 4);
      valor = `${parte1}-${parte2}`;
      if (valor.indexOf(')') < 0 && tamanho > 2) {
          valor = `(${valor.substring(0, 2)}) ${valor.substring(2)}`;
      }
    } else if (tamanho > 2 && tamanho <= 5) {
        valor = `(${valor.substring(0, 2)}) ${valor.substring(2)}`;
    }

    this.value = valor;
  }
});