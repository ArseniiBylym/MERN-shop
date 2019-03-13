const {Router} = require('express');
const serviceController = require('../controllers/service.controller');
const isAuth = require('../middlewares/isAuth');
const isAdmin = require('../middlewares/isAdmin');

const router = Router();

router.get('/', serviceController.getService);
router.post('/', isAuth, isAdmin, serviceController.postService);
router.delete('/', isAuth, isAdmin, serviceController.deleteService);
// router.delete('/:serviceId', isAuth, isAdmin, serviceController.deleteService);
// router.delete('/:serviceId/:serviceItemId', isAuth, isAdmin, serviceController.deleteService);

module.exports = router;
