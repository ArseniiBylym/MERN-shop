const {Router} = require('express');
const cartController = require('../controllers/cart.controller');

const router = new Router();

router.get('/:cartId', cartController.getCart);
router.post('/', cartController.postCart);
router.put('/', cartController.putCart);
router.delete('/:cartId', cartController.deleteCart);

module.exports = router;