// console.log("typescript")

// function soma(a: number, b:number) {
//     return a + b;
// }

// //soma("a", "b")  acusa erro pois é string, antes da compilacao



// // types-> para fazer juncao e merge das interfaces
// // interface -> contrato para implementar estrutura de dados


// interface IAnimal {
//     nome: string;
//     tipo: "terrestre" | "aquatico";
//     domestico: boolean,
//     // executarRugido(alturaDecibeis: number): void;
// }

// type IAnimal = {
//     nome: string;
//     tipo: "terrestre" | "aquatico";
//     executarRugido(alturaDecibeis: number): void;
// }

// interface IFelino extends IAnimal {
//     visaoNoturna: boolean;
// }

// interface ICanino extends IAnimal {
//     porte: "pequeno" | "medio" | "grande";
// }

// type IDomestico = IFelino | ICanino;

// const animal: IDomestico = {
//     domestico: true,
//     nome: "cachorro",
//     porte: "medio",
//     tipo: "terrestre",
// }

// const animal: IAnimal = {
//     nome: "Elefante",
//     tipo: "terrestre",
//     executarRugido: (alturaDecibeis) => ('$(alturaDecibeis)dB')
// }

// animal.executarRugido()

// const felino: IFelino = {
//     nome: "Leao",
//     tipo: "terrestre",
//     visaoNoturna: true,
// }
//-------------------------------------------------------------------------------

// // tratando tag input
// const input = document.getElementById('input') as HTMLInputElement;

// input.addEventListener('input', (event) => {
    
//     const i = event.currentTarget as HTMLInputElement;
//     console.log(i.value);
//     //console.log(event.currentTarget.)
// });

//---------------------------------------------------

//generic types

// function adicionaApendiceALista<NaoSei>(array: any[], valor: NaoSei) {
//     return array.map(item => item + valor);
// }

// adicionaApendiceALista([1,2,3], 1)

//----------------------------------------------------------

// interface IUsuario {
//     id: string;
//     email: string;
//     ativo?: "ativo" | "ferias";  //item opcional
// }

// interface IAdmin extends IUsuario {
//     cargo: 'gerente' | 'coordenador' | 'supervisor';
// }

// function redirecione(usuario: IUsuario | IAdmin){ 
//     if ('cargo' in usuario){
//         ///redirecionar para area de admin
//     }

//     // redireciona para area de usuario

//     if (usuario.ativo){
//         //redirecionar(usuario.cargo)
//     }

//     // redirecionar para area do usuario
// }

//-------------------------------------------------------------

// interface Cachorro {
//     nome: string;
//     idade: number;
//     parqueFavorito?: string;  //opcional
// }

// //itera na interface e transforma em readonly os valores
// type CachorroSomenteLeitura = {
//     +readonly [K in keyof Cachorro]-?: Cachorro[K] //remove os valores opcionais
// }

// // const meuCachorro: Cachorro = {
// //     nome: "apolo",
// //     idade: 14,
// // }

// class MeuCachorro implements Cachorro {
//     idade;
//     nome;
//     parqueFavorito;

//     constructor(nome, idade){
//         this.idade = idade;
//         this.nome = nome;
//     }
// }

// const cao = new MeuCachorro('Apolo', 14);


// -------------------------------------------------------------------

//bibliotecas


// interface Estudante {
//     nome: string;
//     idade: number;
// }

// interface Estudante {
//     serie: string;
// }

// const estudante: Estudante = {
//     //soma as interfaces nome, idade, serie
// }





//---------------------------------------------------------------
// se importases o jquery seria maravilhoso.. tutorial de merda.

// import $ from 'jquery';

// $.fn.extend({
//     novaFuncao() {
//         console.log("chamou funcao")
//     }
// })
