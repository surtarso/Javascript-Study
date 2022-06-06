function validaArray(arr, num) {

    try {
        if (!arr && !num) throw new ReferenceError("Envie os parâmentros");
        if (typeof arr !== 'object') throw new TypeError("Precisa ser do tipo Object");
        if (typeof num !== 'number') throw new TypeError("Precisa ser do tipo Numero");
        if (arr.length !== num) throw new RangeError("tamanho inválido");
        return arr;
    }

    catch(e) {
        if (e instanceof ReferenceError) {
            console.log("Ocorreu um Reference Error");
            console.log(e.message);
        }
        else if (e instanceof TypeError) {
            console.log("Ocorreu um Type Error");
            console.log(e.message);
        }
        else if (e instanceof RangeError) {
            console.log("Ocorreu um Range Error");
            console.log(e.message);
        }
        else {
            console.log("Tipo de erro não esperado: " + e);
        }
    }
}

console.log(validaArray([1,2,3,4,5], 5));
