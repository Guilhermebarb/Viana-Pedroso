// backend/controllers/uploadController.js
const readExcel = require("../utils/excelReader");
const path = require("path");

exports.uploadExcel = async (req, res) => {
  try {
    // Verifica se o arquivo foi enviado
    if (!req.file) {
      console.log("Nenhum arquivo recebido.");
      return res.status(400).json({ error: "Nenhum arquivo enviado." });
    }

    console.log("Arquivo recebido:", req.file);

    const filePath = path.resolve(__dirname, "..", "uploads", req.file.filename);
    console.log("Caminho completo do arquivo:", filePath);

    const dadosExcel = readExcel(filePath);

    if (!dadosExcel || dadosExcel.length === 0) {
      return res.status(400).json({ error: "A planilha está vazia ou mal formatada." });
    }

    res.status(200).json({ data: dadosExcel });
  } catch (error) {
    console.error("Erro ao processar a planilha:", error.message);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
};
