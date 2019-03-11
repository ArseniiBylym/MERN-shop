const {Router} = require('express');
const productController = require('../controllers/product');
const isAuth = require('../middlewares/isAuth');
const {productCreateValidation} = require('../middlewares/validators');

const router = Router();

router.get('/', productController.getProduct);
router.get('/:prodId', productController.getProductDetails);

router.post('/', isAuth, productCreateValidation, productController.createProduct);
router.put('/:prodId', isAuth, productController.updateProduct);
router.delete('/:prodId', isAuth, productController.deleteProduct);

module.exports = router;
