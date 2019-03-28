const {Router} = require('express');
const cartController = require('../controllers/cart.controller');

const router = new Router();


/**
 * @api {get} /api/cart/:cartId Get cart
 * @apiName GetCart
 * @apiGroup Cart
 * @apiPermission user admin
 * @apiExample {js} Request example:
 *  http://localhost:5000/api/cart/sdhkj23h432432kjh234
 *
 * @apiHeader {String} Authorization Bearer token
 * @apiHeaderExample {json} Header-example:
 *  {
 *  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZ21haWwuY29tIiwiaWQiOiI1Yzg2OTMxNmUxODVhODMzNDAzMjVkYzgiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNTUyNTc4NjI1LCJleHAiOjE1NTI2NjUwMjV9.Adpz8jVppQ3RUtH1Ng_S3wzShpDuqdwH8MmOCTTteEY"
 * }
 * @apiSuccess {String} createdAt
 * @apiSuccess {String} updatedAt
 * @apiSuccess {String} _id
 * @apiSuccess {Object[]} cart Saved card
 * @apiSuccess {String} cart._id 
 * @apiSuccess {Number} cart.quantity 
 * @apiSuccess {String} cart._id 
 * @apiSuccess {Object} cart.product Product
 * @apiSuccess {String} cart.product.name 
 * @apiSuccess {Number} cart.product.price 
 * @apiSuccess {String} cart.product.imageUrl 
 * @apiSuccess {String} cart.product._id
 * @apiSuccess {Number} cart.product._id
 * 
 * @apiSuccessExample {json} 200 Success-Response:
 *  HTTP/1.1 200 OK
 * {
 *      "cart": [
 *          "product": {
 *              "imageUrl": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD..."
 *              "name": "S-Works Roubaix"
 *              "price": 230
 *              "_id": "5c9a00c8f262ee1bd486bf25"
 *          }
 *          "quantity": 1
 *          "_id": "5c9ceab8aaebb12f10e2ecb6"
 *     ]
 *     createdAt: "2019-03-28T15:39:36.892Z"
 *     updatedAt: "2019-03-28T15:39:36.892Z"
 *     _id: "5c9ceab8aaebb12f10e2ecb5"
 * }
 *
 */
router.get('/:cartId', cartController.getCart);


/**
 * @api {post} /api/cart/ Create cart
 * @apiName PostCart
 * @apiGroup Cart
 * @apiExample {js} Request example:
 *  http://localhost:5000/api/cart
 *
 * @apiParam {Object[]} cart Array of products
 * @apiParam {String} cart.product Product id
 * @apiParam {Number} cart.quantity Quantity of the product
 * @apiParamExample {json} Request example
 * {
 *      "cart": [
 *          {"product": "hk2j3h2k3j43k34", "quantity": 2}
 *      ]
 * }
 * 
 * @apiSuccess {String} message
 * @apiSuccess {String} cartId
 * 
 * @apiSuccessExample {json} 200 Success-Response:
 *  HTTP/1.1 200 OK
 * {
 *     "cartId": "kjh32kj4h23kj4h324",
 *      "message": "New cart added"
 * }
 */
router.post('/', cartController.postCart);



/**
 * @api {put} /api/cart/ Update cart
 * @apiName PutCart
 * @apiGroup Cart
 * @apiPermission 
 * @apiExample {js} Request example:
 *  http://localhost:5000/api/cart
 *
 * @apiParam {Object[]} cart Array of products
 * @apiParam {String} cart.product Product id
 * @apiParam {Number} cart.quantity Quantity of the product
 * @apiParamExample {json} Request example
 * {
 *      "cart": [
 *          {"product": "hk2j3h2k3j43k34", "quantity": 2}
 *      ]
 * }
 * 
 * @apiSuccess {String} message
 * @apiSuccess {Object[]} cart Array of products
 * @apiSuccess {String} cart.product id of the product
 * @apiSuccess {String} cart._id product id
 * @apiSuccess {Number} cart.quantity items of the product
 * 
 * @apiSuccessExample {json} 200 Success-Response:
 *  HTTP/1.1 200 OK
 * {    
 *      "cart": [{"product": "lk2j3h42k34jh", "quantity": 2, "_id": "k23jhkj23h4324"}]
 *      "message": "Cart successfully updated"
 * }
 */
router.put('/', cartController.putCart);


/**
 * @api {delete} /api/cart/:cartId Delete cart
 * @apiName DeleteCart
 * @apiGroup Cart
 * @apiPermission user admin
 * @apiExample {js} Request example:
 *  http://localhost:5000/api/cart/sdhkj23h432432kjh234
 *
 * @apiHeader {String} Authorization Bearer token
 * @apiHeaderExample {json} Header-example:
 *  {
 *  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZ21haWwuY29tIiwiaWQiOiI1Yzg2OTMxNmUxODVhODMzNDAzMjVkYzgiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNTUyNTc4NjI1LCJleHAiOjE1NTI2NjUwMjV9.Adpz8jVppQ3RUtH1Ng_S3wzShpDuqdwH8MmOCTTteEY"
 * }
 * 
 * @apiSuccess {String} message 
 *  
 * @apiSuccessExample {json} 200 Success-Response:
 *  HTTP/1.1 200 OK
 * {
 *      "message": "Cart was successfully deleted"
 * }
 *
 * @apiError OrdersNotFound Can't get order list
 *
 * @apiErrorExample 403-response:
 *  HTTP/1.1 403 Internal server error
 * {
 *      "message": "Access denied"
 * }
 */
router.delete('/:cartId', cartController.deleteCart);