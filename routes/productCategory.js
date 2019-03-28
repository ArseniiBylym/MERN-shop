const {Router} = require('express');
const productCategoryController = require('../controllers/productCategory.controller');
const isAuth = require('../middlewares/isAuth');
const isAdmin = require('../middlewares/isAdmin');

const router = Router();

router.get('/', productCategoryController.getProductCategory);
router.post('/', isAuth, isAdmin, productCategoryController.addProductCategory);

module.exports = router;
