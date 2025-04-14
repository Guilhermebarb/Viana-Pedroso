// backend/routes/uploadRoutes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const verifyJWT = require("../middleware/auth");
const uploadController = require("../controllers/uploadController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "backend/uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

console.log(">>> Chegou na rota /upload/excel");

router.post("/excel", verifyJWT, upload.single("file"), uploadController.uploadExcel);

module.exports = router;
