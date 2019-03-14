const {Router} = require('express');
const userController = require('../controllers/user.controller');
const isAuth = require('../middlewares/isAuth');
const {signupValidation} = require('../middlewares/validators');

const router = Router();

router.get('/', isAuth, userController.getUser);
router.post('/login', userController.loginUser);
router.post('/signup', signupValidation, userController.signupUser);

module.exports = router;
