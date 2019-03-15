const {Router} = require('express');
const userController = require('../../controllers/user.controller');
const isAuth = require('../../middlewares/isAuth');
const {signupValidation} = require('../../middlewares/validators');

const router = Router();

/**
 * @api {get} /api/user Get user info
 * @apiName GetUser
 * @apiGroup User
 * @apiExample {js} Request example:
 *  http://localhost:5000/api/user
 *
 * @apiHeader {String} Authorization Bearer token
 * @apiHeaderExample {json} Header-example:
 *  {
 *  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZ21haWwuY29tIiwiaWQiOiI1Yzg2OTMxNmUxODVhODMzNDAzMjVkYzgiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNTUyNTc4NjI1LCJleHAiOjE1NTI2NjUwMjV9.Adpz8jVppQ3RUtH1Ng_S3wzShpDuqdwH8MmOCTTteEY"
 * }
 *
 * @apiSuccess {String} token User token.
 * @apiSuccess {Object} user User profile info.
 *
 * @apiSuccessExample {json} 200 Success-Response:
 *  HTTP/1.1 200 OK
 * {
 *  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZ21haWwuY29tIiwiaWQiOiI1Yzg2OTMxNmUxODVhODMzNDAzMjVkYzgiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNTUyNTc4NjI1LCJleHAiOjE1NTI2NjUwMjV9.Adpz8jVppQ3RUtH1Ng_S3wzShpDuqdwH8MmOCTTteEY",
 *   "user": {
 *       "isAdmin": false,
 *       "isBanned": false,
 *       "_id": "5c869316e185a83340325dc8",
 *       "name": "user",
 *       "email": "user@gmail.com"
 *   }
 * }
 * @apiError UserNotFound User date is absent in db
 * @apiError NotAllowed No token or invalid token
 *
 * @apiErrorExample 404-response:
 *  HTTP/1.1 404 Not Found
 * {
 *      "message": "User not found"
 * }
 * @apiErrorExample 401-response:
 *  HTTP/1.1 401 Unauthorized
 * {
 *      "message": "No token, authorization denied"
 * }
 * @apiErrorExample 400-response:
 *  HTTP/1.1 400 Bad request
 * {
 *      "message": "Invalid token, authorization denied"
 * }
 */
router.get('/', isAuth, userController.getUser);

/**
 * @api {post} /api/user/login Login user
 * @apiName postLogin
 * @apiGroup User
 * @apiExample {js} Request example:
 *  http://localhost:5000/api/user/login
 *
 * @apiParam {String} email required - User email.
 * @apiParam {String} password required - User password.
 * @apiParamExample {json} Request-Example:
 * {
 *      "email" : "user@gmai.com",
 *      "password": "123456"
 * }
 *
 * @apiSuccessExample {json} 200 Success-Response:
 *  HTTP/1.1 200 OK
 * {
 *  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZ21haWwuY29tIiwiaWQiOiI1Yzg2OTMxNmUxODVhODMzNDAzMjVkYzgiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNTUyNTc4NjI1LCJleHAiOjE1NTI2NjUwMjV9.Adpz8jVppQ3RUtH1Ng_S3wzShpDuqdwH8MmOCTTteEY",
 *   "user": {
 *       "isAdmin": false,
 *       "isBanned": false,
 *       "_id": "5c869316e185a83340325dc8",
 *       "name": "user",
 *       "email": "user@gmail.com"
 *   }
 * }
 * @apiError UserNotFound Wrong email or password
 *
 * @apiErrorExample 400-response:
 *  HTTP/1.1 400 Bad Request
 * {
 *      "message": "Wrong email"
 * }
 */
router.post('/login', userController.loginUser);

/**
 * @api {post} /api/user/signup Register new user
 * @apiName postSignup
 * @apiGroup User
 * @apiExample {js} Request example:
 *  http://localhost:5000/api/user/signup
 *
 * @apiParam {String} name required - User name.
 * @apiParam {String} email required - User email.
 * @apiParam {String} password required - User password.
 * @apiParam {String} confirmPassword required - Password confirmation.
 * @apiParamExample {json} Request-Example:
 * {
 *      "name" : "user",
 *      "email" : "user@gmai.com",
 *      "password": "123456"
 *      "confirmPassword": "123456"
 * }
 *
 * @apiSuccessExample {json} 200 Success-Response:
 *  HTTP/1.1 200 OK
 * {
 *  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZ21haWwuY29tIiwiaWQiOiI1Yzg2OTMxNmUxODVhODMzNDAzMjVkYzgiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNTUyNTc4NjI1LCJleHAiOjE1NTI2NjUwMjV9.Adpz8jVppQ3RUtH1Ng_S3wzShpDuqdwH8MmOCTTteEY",
 *   "user": {
 *       "isAdmin": false,
 *       "isBanned": false,
 *       "_id": "5c869316e185a83340325dc8",
 *       "name": "user",
 *       "email": "user@gmail.com"
 *   }
 * }
 * @apiError UserAlreadyExists User with same email already exists
 * @apiError ValidationFailed Invalid data
 *
 * @apiErrorExample Error-response:
 *  HTTP/1.1 400 Bad Request
 * {
 *      "message": "User already exists"
 * }
 * @apiErrorExample Error-response:
 *  HTTP/1.1 400 Bad Request
 * {
 *      "message": "Validation failed",
 *      "errors": {
 *          "field": "name",
 *          "errorMessage": "User name is required"
 *       }
 * }
 */
router.post('/signup', signupValidation, userController.signupUser);

module.exports = router;
