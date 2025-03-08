const fs = require("fs");

function lerArquivo(caminho) {
  return fs.readFileSync(caminho, "utf-8");
}

function salvarArquivo(caminho, conteudo) {
  fs.writeFileSync(caminho, conteudo, "utf-8");
}

module.exports = { lerArquivo, salvarArquivo };