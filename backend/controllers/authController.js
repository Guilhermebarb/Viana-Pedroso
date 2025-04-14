// backend/controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.register = async (req, res) => {
  const { username, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await User.create({ username, password: hashedPassword, role });
    res.status(201).json({ message: 'Usuário registrado!' });
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar usuário.' });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });

  if (!user) return res.status(404).json({ error: 'Usuário não encontrado.' });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(401).json({ error: 'Senha incorreta.' });

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET || "default_secret",
    { expiresIn: '8h' }
  );

  res.json({ auth: true, token });
};
