const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
require('dotenv').config({ path: __dirname + '/.env' });

const app = express();
app.use(cors());
app.use(express.json());

// Conectar banco
sequelize.sync().then(() => console.log('Banco conectado com sucesso.'));

// Rotas
const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);

const uploadRoutes = require('./routes/uploadRoutes');
app.use('/upload', uploadRoutes);

const envioRoutes = require('./routes/envioRoutes');
app.use('/envios', envioRoutes);

// Rota inicial
app.get('/', (req, res) => {
  res.send('API funcionando corretamente.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
