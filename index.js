const Tesseract = require('tesseract.js');
const fs = require('fs');
const { exec } = require('child_process');

//process.__defineGetter__('stdout', function() { return fs.createWriteStream('/temp/node.access.log', {flags:'a'}) })

f = async function(){
//var data = fs.readFileSync("/temp/IMG_20250122_110859.jpg");

// Caminho da imagem da nota fiscal
const imagePath = 'nota_fiscal.jpg';  // Substitua pelo caminho correto da imagem

exec('magick nota_fiscal.jpg -colorspace gray -edge 1 -format "%[fx:mean]" info:', (err, stdout) => {
  if (err) throw err;
  console.log('Nitidez:', stdout);
});

console.log('----------');
// Chama a função para extrair o texto da imagem
const results = extractTextFromInvoice(imagePath);

console.log('----------');
console.log(results);
return results;
}

f();    

// Função para extrair texto da nota fiscal usando OCR
function extractTextFromInvoice(imagePath) {
  Tesseract.recognize(
    imagePath,
    'por',  // Define o idioma (português)
    {
      logger: (m) => console.log(m),  // Log de progresso do OCR
    }
  ).then(({ data: { text } }) => {
    console.log('Texto extraído:', text);

    // Exemplo de extração de dados específicos com regex:
    const cnpjRegex = /\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}/;
    const valorRegex = /R\$\s?\d+,\d{2}/;

    // Buscar CNPJ e Valor
    const cnpj = text.match(cnpjRegex);
    const valor = text.match(valorRegex);
    const date = text.match('\d{2}\/\d{2}\/\d{4}\s*\d{2}:\d{2}:\d{2}');
    const header = text.match('(item|iten)\s+codigo.*vl.*(?=\n)');
    const line_start = text.match('\n\d*.+\d+');
    const footer = text.match('total\s*r\$');
  
    if (cnpj) {
      console.log('CNPJ encontrado:', cnpj[0]);
    } else {
      console.log('CNPJ não encontrado.');
    }

    if (valor) {
      console.log('Valor encontrado:', valor[0]);
    } else {
      console.log('Valor não encontrado.');
    }

    if (date){
      console.log(date.lenght, ' dates encontrados:', date[0]);
    }
    else{
      console.log('date não encontrado.'); 
    }
        
  }).catch((err) => {
    console.error('Erro no OCR:', err);
  });
}

