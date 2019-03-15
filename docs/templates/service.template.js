const {Router} = require('express');
const serviceController = require('../../controllers/service.controller');
const isAuth = require('../../middlewares/isAuth');
const isAdmin = require('../../middlewares/isAdmin');

const router = Router();

/**
 * @api {get} /api/service Get services
 * @apiName GetService
 * @apiGroup Service
 * @apiExample {js} Request example:
 *  http://localhost:5000/api/service
 *
 * @apiSuccessExample {json} 200 Success-Response:
 *  HTTP/1.1 200 OK
 * {
 *      "message": "Service list",
 *      "service": [
 *          {
 *              "category": "tech review",
 *              "serviceList": [
 *                  {
 *                       "serviceName": "wheel fixes",
 *                       "price": 15
 *                  },
 *                  {
 *                       "serviceName": "brake setup",
 *                       "price": 10
 *                  }
 *              ]
 *          }
 * }
 * @apiError ServiceNotFound Can't get list of services
 *
 * @apiErrorExample 500-response:
 *  HTTP/1.1 500 Internal server error
 * {
 *      "message": "No services found"
 * }
 */
router.get('/', serviceController.getService);

/**
 * @api {post} /api/service Add new service
 * @apiName PostService
 * @apiGroup Service
 * @apiExample {js} Request example:
 *  http://localhost:5000/api/service
 *
 * @apiParam {String} category required - Service category.
 * @apiParam {String} serviceName optional - Service item name.
 * @apiParam {Number} servicePrice optional - Service item price.
 * @apiParamExample {json} Request-Example:
 * {
 *      "category" : "tech review",
 *      "serviceName": "brake setup"
 *      "servicePrice": 10
 * }
 *
 * @apiSuccessExample {json} 200 Success-Response:
 *  HTTP/1.1 200 OK
 * {
 *      "message": "Service list",
 *      "service": [
 *          {
 *              "category": "tech review",
 *              "serviceList": [
 *                  {
 *                       "serviceName": "brake setup",
 *                       "price": 10
 *                  }
 *              ]
 *          }
 * }
 * @apiError ServiceCreationFailed Can't add new service type
 *
 * @apiErrorExample 500-response:
 *  HTTP/1.1 500 Internal server error
 * {
 *      "message": "Service creation failed"
 * }
 */
router.post('/', isAuth, isAdmin, serviceController.postService);

/**
 * @api {delete} /api/service Delete service
 * @apiName DeleteService
 * @apiGroup Service
 * @apiExample {js} Request example:
 *  http://localhost:5000/api/service
 *
 * @apiParam {String} serviceId required - Service category id.
 * @apiParam {String} serviceItemId optional - Service subcategory id.
 * @apiParamExample {js} Request-Example:
 *  http://localhost:5000/api/service?serviceId=123&serviceItemId=345
 *
 * @apiSuccessExample {json} 200 Success-Response:
 *  HTTP/1.1 200 OK
 * {
 *      "message": "Service was successfully deleted",
 *      "id": 123
 * }
 * @apiError ServiceDeletionFailed Can't delete service
 *
 * @apiErrorExample 500-response:
 *  HTTP/1.1 500 Internal server error
 * {
 *      "message": "Service deteting failed"
 * }
 */
router.delete('/', isAuth, isAdmin, serviceController.deleteService);

module.exports = router;
