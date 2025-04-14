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