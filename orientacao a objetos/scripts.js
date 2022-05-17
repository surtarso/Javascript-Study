//nome da classe pai
class ContaBancaria {
    //tudo q vai ser mandado pra classe
    constructor(agencia, numero, tipo, saldo) {
        this.agencia = agencia;
        this.numero = numero;
        this.tipo = tipo;
        this._saldo = 0;
    }

    get saldo(){
        return this._saldo;
    }

    set saldo(valor){
        this._saldo = valor;
    }

    sacar(valor){
        if (valor > this._saldo){return "Sem saldo"}
        this._saldo = this._saldo - valor;
        return this._saldo;
    }

    depositar(valor){ 
        this._saldo = this._saldo + valor;
        return this._saldo;
    }
}

//nova classe:
class ContaCorrente extends ContaBancaria {
    constructor(agencia, numero, cartaoCredito){
        super(agencia, numero);
        this.tipo = 'corrente';
        this._cartaoCredito = this.cartaoCredito
    }
    get cartaoCredito(){
        return this._cartaoCredito;
    }
    set cartaoCredito(valor) {
        this._cartaoCredito = valor;
    }
}

//nova classe:
class ContaPoupanca extends ContaBancaria {
    constructor(agencia, numero){
        super(agencia, numero);
        this.tipo = 'poupanca';
    }
}

//nova classe:
class ContaUniversitaria extends ContaBancaria {
    constructor(agencia, numero){
        super(agencia, numero);
        this.tipo = 'universitaria';
    }

    sacar(valor){
        if(valor > 500){ return 'operacao negada'}
        this._saldo = this._saldo - valor;
    }
}