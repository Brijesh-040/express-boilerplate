const router = require("express").Router();
const productController = require('../controllers/productController');

router.post("/", productController.product_create);
router.get("/", productController.product_all);
router.get("/:productId", productController.product_details);
router.put("/:productId", productController.product_update);
router.delete("/:productId", productController.product_delete);
router.post("/buy", productController.buy_product);
router.get("/buy/get", productController.get_product);

module.exports = router;