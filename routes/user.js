const {Router} = require('express');
const userController = require('../controllers/user');
const isAuth = require('../middlewares/isAuth');
const {loginValidation, signupValidation} = require('../middlewares/validators');

const router = Router();

router.get('/', isAuth, userController.getUser);
router.post('/login', loginValidation, userController.loginUser);
router.post('/signup', signupValidation, userController.signupUser);

module.exports = router;
