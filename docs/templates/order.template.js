const {Router} = require('express');
const orderController = require('../../controllers/order.controller');
const isAuth = require('../../middlewares/isAuth');
const isAdmin = require('../../middlewares/isAdmin');

const router = Router();

/**
 * @api {get} /api/order Get order list
 * @apiName GetOrder
 * @apiGroup Order
 * @apiPermission user admin
 * @apiExample {js} Request example:
 *  http://localhost:5000/api/order
 *
 * @apiHeader {String} Authorization Bearer token
 * @apiHeaderExample {json} Header-example:
 *  {
 *  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZ21haWwuY29tIiwiaWQiOiI1Yzg2OTMxNmUxODVhODMzNDAzMjVkYzgiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNTUyNTc4NjI1LCJleHAiOjE1NTI2NjUwMjV9.Adpz8jVppQ3RUtH1Ng_S3wzShpDuqdwH8MmOCTTteEY"
 * }
 * @apiSuccess {String} message Request status
 * @apiSuccess {Array} order List of orders
 * @apiSuccessExample {json} 200 Success-Response:
 *  HTTP/1.1 200 OK
 * {
 *      "message": "All orders",
 *      "order": [
 *          {
 *              "createdAt": "2019-03-28T11:54:26.196Z",
 *              "delliveryAddress": "dfsdf",
 *              "delliveryService": 1,
 *              "details": "",
 *              "email": "user@gmail.com",
 *              "name": "user",
 *              "paymentType": 1,
 *              "productList": [
 *                  {
 *                      "quantity": 1,
 *                      "product": {
 *                          "category": "bikes",
 *                          "name": "Allez",
 *                          "price": 180.9,
 *                          "subCategory": "Road",
 *                          "_id": "5c9a0055f262ee1bd486bf24",
 *                      },
 *                      "status": 2,
 *                      "updatedAt": "2019-03-28T12:00:13.236Z",
 *                      "_id": "5c9cb5f2a989731560c2e1d6"
 *          }
 *      ]
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
router.get('/', isAuth, orderController.getOrder);

/**
 * @api {post} /api/order Add new order
 * @apiName PostOrder
 * @apiGroup Order
 * @apiPermission user
 * @apiExample {js} Request example:
 *  http://localhost:5000/api/order
 *
 *  @apiHeader {String} Authorization Bearer token
 *  @apiHeaderExample {json} Header-example:
 *  {
 *  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZ21haWwuY29tIiwiaWQiOiI1Yzg2OTMxNmUxODVhODMzNDAzMjVkYzgiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNTUyNTc4NjI1LCJleHAiOjE1NTI2NjUwMjV9.Adpz8jVppQ3RUtH1Ng_S3wzShpDuqdwH8MmOCTTteEY"
 * }
 * @apiParam {String} cartId Id for the cart in db
 * @apiParam {Object} order Order object
 * 
 * @apiParamExample {json} Request-Exmaple
 * {
 *      "cartId": "5c9ce134a54c813030a9ca48"
 *      "order": {
 *          "delliveryAddress": "sdfsdf"
 *          "delliveryService": 1
 *          "details": ""
 *          "email": "user@gmail.com"
 *          "name": "user"
 *          "paymentType": 1
 *          "productList": [{"product": "5c9a00c8f262ee1bd486bf25", "quantity": 1}]
 *      }
 * }
 *
 *  @apiSuccessExample {json} 200 Success-Response:
 *  HTTP/1.1 200 OK
 * {
 *      "message": "New order was successfully crated"
 *      "orderItem": {
 *          "delliveryAddress": "sdfsdf"
 *          "delliveryService": 1
 *          "details": ""
 *          "email": "user@gmail.com"
 *          "name": "user"
 *          "paymentType": 1
 *          "productList": [{"product": "5c9a00c8f262ee1bd486bf25", "quantity": 1}]
 *          "createdAt": "2019-03-28T14:59:07.466Z"
 *          "updatedAt": "2019-03-28T14:59:07.466Z"
 *          "__v": 0
 *          "_id": "kj23h4k2j3hkj3423423"
 *      }
 * }
 *
 * @apiError OrdersNotFound Can't create new order
 *
 * @apiErrorExample 500-response:
 *  HTTP/1.1 500 Internal server error
 * {
 *      "message": "Order creation failed"
 * }
 */
router.post('/', isAuth, orderController.addOrder);

/**
 * @api {put} /api/order Update order
 * @apiName PutOrder
 * @apiGroup Order
 * @apiPermission admin
 * @apiExample {js} Request example:
 *  http://localhost:5000/api/order
 *
 *  @apiHeader {String} Authorization Bearer token
 *  @apiHeaderExample {json} Header-example:
 *  {
 *  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZ21haWwuY29tIiwiaWQiOiI1Yzg2OTMxNmUxODVhODMzNDAzMjVkYzgiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNTUyNTc4NjI1LCJleHAiOjE1NTI2NjUwMjV9.Adpz8jVppQ3RUtH1Ng_S3wzShpDuqdwH8MmOCTTteEY"
 * }
 *
 * @apiParam {String} status New order status
 * @apiParam {String} orderId Order id
 *
 * @apiParamExample {json} Request-Example:
 * {
 *  "status": 1,
 *  "orderId": "32423dfh3kj4h"
 * }
 *
 * @apiSuccess {String} message Response message
 * @apiSuccess {Object} orderItem Order object
 *  @apiSuccessExample {json} 200 Success-Response:
 *  HTTP/1.1 200 OK
 * {
 *      "message": "New order was successfully crated"
 *      "orderItem": {
 *          "status": 1
 *          "delliveryAddress": "sdfsdf"
 *          "delliveryService": 1
 *          "details": ""
 *          "email": "user@gmail.com"
 *          "name": "user"
 *          "paymentType": 1
 *          "productList": [{"product": "5c9a00c8f262ee1bd486bf25", "quantity": 1}]
 *          "createdAt": "2019-03-28T14:59:07.466Z"
 *          "updatedAt": "2019-03-28T14:59:07.466Z"
 *          "__v": 0
 *          "_id": "kj23h4k2j3hkj3423423"
 *      }
 * }
 *
 * @apiError OrdersNotFound Can't get order item
 *
 * @apiErrorExample 500-response:
 *  HTTP/1.1 500 Internal server error
 * {
 *      "message": "Order not found"
 * }
 */
router.put('/', isAuth, isAdmin, orderController.updateOrder);

/**
 * @api {delete} /api/order/:orderId Delete order
 * @apiName DeleteOrder
 * @apiGroup Order
 * @apiPermission admin
 * @apiExample {js} Request example:
 *  http://localhost:5000/api/order/324kjh234
 *
 *  @apiHeader {String} Authorization Bearer token
 *  @apiHeaderExample {json} Header-example:
 *  {
 *  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZ21haWwuY29tIiwiaWQiOiI1Yzg2OTMxNmUxODVhODMzNDAzMjVkYzgiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNTUyNTc4NjI1LCJleHAiOjE1NTI2NjUwMjV9.Adpz8jVppQ3RUtH1Ng_S3wzShpDuqdwH8MmOCTTteEY"
 * }
 *
 * @apiParamExample {js} Request-Example:
 * http://localhost:5000/api/order/324kjh234
 *
 *  @apiSuccessExample {json} 200 Success-Response:
 *  HTTP/1.1 200 OK
 * {
 *      "message": "Order was successfully deleted",
 *      "id": "324kjh234"
 * }
 *
 * @apiError OrdersNotFound Can't get order item
 *
 * @apiErrorExample 500-response:
 *  HTTP/1.1 500 Internal server error
 * {
 *      "message": "Order not found"
 * }
 */
router.delete('/:orderId', isAuth, isAdmin, orderController.deleteOrder);

module.exports = router;
