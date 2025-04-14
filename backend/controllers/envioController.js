// backend/controllers/envioController.js
const Envio = require("../models/Envio");

exports.registrarEnvio = async (req, res) => {
  try {
    const { originalname } = req.file;
    const { linhas } = req.body;
    const userId = req.userId;
    const username = req.username || "desconhecido";

    await Envio.create({
      arquivo: originalname,
      registros: linhas,
      userId,
      username
    });

    res.status(201).json({ message: "Envio registrado com sucesso." });
  } catch (error) {
    console.error("Erro ao registrar envio:", error);
    res.status(500).json({ error: "Erro interno ao registrar envio." });
  }
};

exports.listarEnvios = async (req, res) => {
  try {
    const envios = await Envio.findAll({
      order: [["createdAt", "DESC"]]
    });

    res.status(200).json(envios);
  } catch (error) {
    console.error("Erro ao listar envios:", error);
    res.status(500).json({ error: "Erro interno ao listar envios." });
  }
};
