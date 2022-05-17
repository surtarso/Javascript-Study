const cards = document.querySelectorAll('.card');
let virouCarta = false; //saber se uma carta ja foi virada
let primeiraCarta, segundaCarta; //primeiro e segundo clique em cartas
let lockBoard = false; //nao deixar virar mais cartas

//função para virar as cartas
function virarCarta() {
    if(lockBoard) return;
    if(this === primeiraCarta) return;

    this.classList.add('flip');
    if(!virouCarta) {
        virouCarta = true;
        primeiraCarta = this;
        return;
    }

    segundaCarta = this;
    virouCarta = false;
    checaIgualdade();
}

//função que checa se as cartas são iguais
function checaIgualdade() {
    if(primeiraCarta.dataset.card === segundaCarta.dataset.card) {
        desativaCartas();
        return;
    }

    desvirarCarta();
}

//função que desabilita as cartas removendo o eventlistener
function desativaCartas() {
    primeiraCarta.removeEventListener('click', virarCarta);
    segundaCarta.removeEventListener('click', virarCarta);

    resetaTabuleiro();
}

//funcão que desvira as cartas
function desvirarCarta() {
    lockBoard = true;

    setTimeout(() => {
        primeiraCarta.classList.remove('flip');
        segundaCarta.classList.remove('flip');

        resetaTabuleiro();
    }, 1500);
}

//função que reseta o tabuleiro
function resetaTabuleiro() {
    [virouCarta, lockBoard] = [false, false];
    [primeiraCarta, segundaCarta] = [null, null];
}

//função que embaralha as cartas
(function shuffle() {
    cards.forEach((card) => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    })
})();

//adiciona evento de clique na carta
cards.forEach((card) => {
    card.addEventListener('click', virarCarta)
});