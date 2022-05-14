
var local_numero = document.getElementById('currentNumber'); // essa é a <span>
var numero_atual = 0;

function increment() {
	numero_atual++;
    local_numero.innerHTML = numero_atual; // .innerHTML é o conteudo da <span>
}

function decrement() {
	numero_atual--;
    local_numero.innerHTML = numero_atual;
}
