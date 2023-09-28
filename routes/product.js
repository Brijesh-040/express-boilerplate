const router = require("express").Router();
const productController = require('../controllers/productController');

router.post("/add", productController.product_create);
router.get("/productList", productController.product_all);
router.get("/product/:productId", productController.product_details);
router.put("/product/:productId", productController.product_update);
router.delete("/product/:productId", productController.product_delete);
router.post("/buy", productController.buy_product);
router.get("/buy/get", productController.get_product);

module.exports = router;