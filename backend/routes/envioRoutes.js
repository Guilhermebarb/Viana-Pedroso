// routes/envioRoutes.js
const express = require("express");
const router = express.Router();
const verifyJWT = require("../middleware/auth");
const envioController = require("../controllers/envioController");

router.get("/", verifyJWT, envioController.listarEnvios);

module.exports = router;
