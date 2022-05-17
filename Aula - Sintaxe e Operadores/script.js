// sintaxe e operadores

function comparaNum(num1, num2) {
    if(!num1 || !num2) return 'Defina dois números!';
    
    const primeiraFrase = criaPrimeiraFrase(num1, num2);
    const segundaFrase = criaSegundaFrase(num1,num2);

    return `${primeiraFrase} ${segundaFrase}`;
    //const saoIguais = num1 === num2; //returns true or false
    //const soma = num1 + num2;

    //return saoIguais ? "São iguais" : "não são iguais"; //?-if :-else

    //if(saoIguais) {
    //    return "São Iguais"
    //}
    //return "Não são iguais"
}

function criaPrimeiraFrase(num1, num2) {
    let saoIguais = '';

    if(num1 !== num2) {
        saoIguais = 'não';
    }
    return `Os números ${num1} e ${num2} ${saoIguais} são iguais`
};

function criaSegundaFrase(num1, num2){
    const soma = num1 + num2;
    let resultado10 = 'menor';
    let resultado20 = 'menor';
    const compara10 = soma > 10;
    const compara20 = soma > 20;

    if(compara10){
        resultado10 = 'maior';
    }
    if (compara20){
        resultado20 = 'maior';
    }

    return `Sua soma é ${soma}, que é ${resultado10} que 10 e ${resultado20} que 20`;
}

console.log(comparaNum(9, 9));