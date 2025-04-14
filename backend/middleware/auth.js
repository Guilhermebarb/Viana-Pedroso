// backend/middleware/auth.js
require('dotenv').config(); // carregar .env primeiro
console.log("🔐 JWT_SECRET carregado:", process.env.JWT_SECRET);
const jwt = require('jsonwebtoken');

function verifyJWT(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    console.log("🔒 Token não fornecido na requisição.");
    return res.status(401).json({ auth: false, message: 'Token necessário.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log("❌ Token inválido:", err.message);
      return res.status(403).json({ auth: false, message: 'Token inválido ou expirado.' });
    }

    console.log("✅ Token válido para o usuário ID:", decoded.id);
    req.userId = decoded.id;
    next();
  });
}

module.exports = verifyJWT;
