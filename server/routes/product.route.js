'use strict'

const router = require("express").Router();
const productController = require('../controllers/product.controller');
const jwtMiddleware = require('../middleware/authMiddleware');

router.post("/add", jwtMiddleware, productController.product_create);
router.get("/productList", jwtMiddleware, productController.product_all);
router.get("/product/:productId", jwtMiddleware, productController.product_details);
router.put("/product/:productId", jwtMiddleware, productController.product_update);
router.delete("/product/:productId", jwtMiddleware, productController.product_delete);
// router.post("/buy", jwtMiddleware, productController.buy_product);
// router.get("/buy/get", jwtMiddleware, productController.get_product);

module.exports = router;