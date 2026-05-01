const Tesseract = require('tesseract.js');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const util = require('util');

//process.__defineGetter__('stdout', function() { return fs.createWriteStream('/temp/node.access.log', {flags:'a'}) })
const directoryPath = '/temp/a'; 
const stream = fs.createWriteStream(path.join(directoryPath, "my_file.txt"));

f = async function(){
//var data = fs.readFileSync("/temp/IMG_20250122_110859.jpg");
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }
    var cont = 1;
    files.forEach(file => {
      if (file !== 'my_file.txt') {
        console.log(cont + ' - ' + file);
        cont = cont +1;
        // You can then use fs.readFile() to read the content of each file
          const filePath = path.join(directoryPath, file);
          extractTextFromInvoice(filePath);
        }
      });
  });
}

f();    

// Função para extrair texto da nota fiscal usando OCR
async function extractTextFromInvoice(imagePath) {
  Tesseract.recognize(
    imagePath,
    'por',  // Define o idioma (português)
    {
      //logger: (m) => console.log(m),  // Log de progresso do OCR
    }
  ).then(({ data: { text } }) => {
    const regex = /CARLA/;
    console.log('terminei');
    if (regex.test(text)){
      console.log('Texto extraído:', text);
      stream.once('open', function(fd) {
        stream.write(text+"\n");
      });
    } 
  }).catch((err) => {
    console.error('Erro no OCR:', err);
  });
}

