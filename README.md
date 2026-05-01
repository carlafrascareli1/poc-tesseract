# Prova de Conceito de OCR com Tesseract para NFS

Pequena prova de conceito em Node.js para extrair texto de imagens de notas
fiscais usando [Tesseract.js](https://github.com/naptha/tesseract.js). O script
atual percorre um diretorio local, executa OCR em portugues, procura por um
termo especifico e grava o texto extraido correspondente em um arquivo de saida.

## Estrutura do Projeto

```text
.
|-- index.js              # Script principal de OCR
|-- ocr-invoice.js        # Arquivo reservado para logica futura de notas fiscais
|-- nota_fiscal.jpg       # Imagem de exemplo de nota fiscal
|-- out.jpg               # Imagem de exemplo/saida
|-- por.traineddata       # Dados de treinamento para OCR em portugues
|-- package.json          # Dependencias e scripts do Node.js
|-- package-lock.json
`-- yarn.lock
```

## Requisitos

- Node.js
- npm or Yarn
- Arquivos de imagem para processar

O projeto usa:

- `tesseract.js` para OCR
- `canvas`
- `pdf-image`

## Instalacao

Usando npm:

```bash
npm install
```

Ou usando Yarn:

```bash
yarn install
```

## Uso

O script principal espera encontrar os arquivos de entrada neste diretorio:

```text
/temp/a
```

Ele cria ou adiciona os resultados de OCR neste arquivo:

```text
/temp/a/my_file.txt
```

Execute a prova de conceito de OCR com:

```bash
npm test
```

Esse comando executa:

```bash
node index.js
```

## Como Funciona

O `index.js` le todos os arquivos em `/temp/a`, ignorando `my_file.txt`. Para
cada arquivo, ele chama `Tesseract.recognize()` com o codigo do idioma
portugues:

```js
Tesseract.recognize(imagePath, 'por')
```

Depois que o OCR termina, o script procura pelo termo `CARLA` no texto
extraido. Se o termo for encontrado, o texto extraido e gravado em
`my_file.txt`.

## Configuracao Atual

Os seguintes valores estao fixos atualmente no `index.js`:

| Configuracao | Valor atual |
| --- | --- |
| Diretorio de entrada | `/temp/a` |
| Idioma do OCR | `por` |
| Termo pesquisado | `CARLA` |
| Arquivo de saida | `/temp/a/my_file.txt` |

Altere esses valores no `index.js` se precisar processar outro diretorio, usar
outro idioma de OCR ou pesquisar outro termo.

## Observacoes

- `ocr-invoice.js` esta vazio no momento e pode ser usado futuramente para
  logicas especificas de extracao de notas fiscais.
- `por.traineddata` esta incluido para dar suporte ao OCR em portugues.
- O script processa os arquivos de forma assincrona e registra o progresso no
  console.
- Se `/temp/a` nao existir, o script falhara ao tentar criar o fluxo de saida.

## Licenca

ISC
