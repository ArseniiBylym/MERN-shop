const {Router} = require('express');
const typeController = require('../controllers/type.controller');
const isAuth = require('../middlewares/isAuth');
const isAdmin = require('../middlewares/isAdmin');

const router = new Router();

router.get('/:group', typeController.getTypes);
router.post('/', isAuth, isAdmin, typeController.postTypes);

module.exports = router;