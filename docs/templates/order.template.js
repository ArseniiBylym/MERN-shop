const {Router} = require('express');
const orderController = require('../../controllers/order.controller');
const isAuth = require('../../middlewares/isAuth');
const isAdmin = require('../../middlewares/isAdmin');

const router = Router();

/**
 * @api {get} /api/order Get order list
 * @apiName GetOrder
 * @apiGroup Order
 * @apiPermission admin
 * @apiExample {js} Request example:
 *  http://localhost:5000/api/order
 *
 * @apiHeader {String} Authorization Bearer token
 *  @apiHeaderExample {json} Header-example:
 *  {
 *  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZ21haWwuY29tIiwiaWQiOiI1Yzg2OTMxNmUxODVhODMzNDAzMjVkYzgiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNTUyNTc4NjI1LCJleHAiOjE1NTI2NjUwMjV9.Adpz8jVppQ3RUtH1Ng_S3wzShpDuqdwH8MmOCTTteEY"
 * }
 *  @apiSuccess {String} message Request status
 * @apiSuccess {Array} order List of orders
 *  @apiSuccessExample {json} 200 Success-Response:
 *  HTTP/1.1 200 OK
 * {
 *      "message": "All orders",
 *      "order": [{
 *          "customer": {"name": "user", "email": "user@gmail.com"},
 *          "productList": [{"name": "brakes", "price": 10, "quantity": 1}]
 *          "delliveryAddress": "Ukrain, Kyiv",
 *          "paymentType": "privat24",
 *          "status": "processing"
 *      }]
 * }
 *
 * @apiParam {String} customerId optional - Order owner's id.
 * @apiParamExample {js} Request-Example:
 *      http://localhost:5000/api/order?customerId=123123
 *
 * @apiSuccessExample {json} 200 Success-Response:
 *  HTTP/1.1 200 OK
 * {
 *      "message": "All orders",
 *      "order": [{
 *          "customer": "123123",
 *          "productList": [{"name": "brakes", "price": 10, "quantity": 1}]
 *          "delliveryAddress": "Ukrain, Kyiv",
 *          "paymentType": "privat24",
 *          "status": "processing"
 *      }]
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
 *
 *  @apiSuccessExample {json} 200 Success-Response:
 *  HTTP/1.1 200 OK
 * {
 *      "message": "New order was successfully crated",
 *      "orderItem": {
 *          "customer": "234kdlsf3423",
 *          "productList": ["id": "ssd234234dskf" "quantity": 1}]
 *          "delliveryAddress": "Ukrain, Kyiv",
 *          "paymentType": "privat24",
 *          "status": "processing"
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
 *  "status": "sent",
 *  "orderId": "32423dfh3kj4h"
 * }
 *
 *  @apiSuccessExample {json} 200 Success-Response:
 *  HTTP/1.1 200 OK
 * {
 *      "message": "Order status successfully updated",
 *      "orderItem": {
 *          "customer": "234kdlsf3423",
 *          "productList": ["id": "32423dfh3kj4h" "quantity": 1}]
 *          "delliveryAddress": "Ukrain, Kyiv",
 *          "paymentType": "privat24",
 *          "status": "sent"
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
 * @apiPermission user
 * @apiExample {js} Request example:
 *  http://localhost:5000/api/order/324kjh234
 *
 *  @apiHeader {String} Authorization Bearer token
 *  @apiHeaderExample {json} Header-example:
 *  {
 *  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZ21haWwuY29tIiwiaWQiOiI1Yzg2OTMxNmUxODVhODMzNDAzMjVkYzgiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNTUyNTc4NjI1LCJleHAiOjE1NTI2NjUwMjV9.Adpz8jVppQ3RUtH1Ng_S3wzShpDuqdwH8MmOCTTteEY"
 * }
 *
 * @apiParam {String} orderId Order id
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
