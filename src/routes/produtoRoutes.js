const express = require("express");
const router = express.Router();
const {produtoController} = require("../controllers/produtoController");

router.get("/produtos", produtoController.listarProdutos);
router.post("/produtos", produtoController.cadastrarProdutos);

module.exports = {produtoRoutes: router};