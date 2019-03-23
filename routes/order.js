const {Router} = require('express');
const orderController = require('../controllers/order.controller');
const isAuth = require('../middlewares/isAuth');
const isAdmin = require('../middlewares/isAdmin');

const router = Router();

router.get('/', isAuth, orderController.getOrder);
router.post('/', orderController.addOrder);
router.put('/', isAuth, isAdmin, orderController.updateOrder);
router.delete('/:orderId', isAuth, isAdmin, orderController.deleteOrder);

module.exports = router;
