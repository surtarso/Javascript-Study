## Desafio de Projeto - TGI Bootcamp - DIO

- Jogo da Memória em HTML/CSS/JavaScript

### Uso:
Clone o repositório ou baixe o .zip;
Rode o index.html no seu navegador.

#### Para adicionar novos temas:
- Baixe as imagens desejadas, sendo elas 6 imagens frente + 1 imagem verso
- Coloque as imagens em uma pasta "img-nometema" dentro da pasta assets (assets/img-nometema/)
- (opcional) dentro da pasta rode o comando: convert -resize 138x203 -strip ./* card.jpg
- renomeie o arquivo com o verso para box.jpg e card1.jpg...card6.jpg para as frentes
- dentro de assets/js/scripts.js, adicione o nome dado na array "temas" (temas = ['img', 'img-nometema', 'img-etc'])
