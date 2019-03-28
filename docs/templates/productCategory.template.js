const {Router} = require('express');
const productCategoryController = require('../../controllers/productCategory.controller');
const isAuth = require('../../middlewares/isAuth');
const isAdmin = require('../../middlewares/isAdmin');

const router = Router();

/**
 * @api {get} /api/product-category Get product categories
 * @apiName GetProductCategory
 * @apiGroup ProductCategory
 * @apiExample {js} Request example:
 *  http://localhost:5000/api/product-category
 *
 * @apiSuccessExample {json} 200 Success-Response:
 *  HTTP/1.1 200 OK
 * {
 *      "message": "Product categories",
 *      "productCategory": [
 *          {
 *              "categoryName": "bikes",
 *              "subCategories": [
 *                  {"name": "Road", "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAS..."},
 *                  {"name": "City", "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAS..."}
 *              ]
 *          }
 * }
 * @apiError CategoriesNotFound Can't get list of product categories
 *
 * @apiErrorExample 500-response:
 *  HTTP/1.1 500 Internal server error
 * {
 *      "message": "Categories not found"
 * }
 */
router.get('/', productCategoryController.getProductCategory);

/**
 * @api {post} /api/product-category Add new product category
 * @apiName PostProductCategory
 * @apiGroup ProductCategory
 * @apiPermission admin
 * @apiExample {js} Request example:
 *  http://localhost:5000/api/product-category
 *
 * @apiParam {String} categoryName Category name.
 * @apiParam {Array} [subCategories] Sub categories array.
 * @apiParamExample {json} Request-Example:
 * {
 *      "categoryName" : "bikes",
 *      "subCategories": [
 *          {"name": "Road", "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAS..."}
 *       ]
 * }
 *
 * @apiSuccessExample {json} 200 Success-Response:
 *  HTTP/1.1 200 OK
 * {
 *      "message": "New category was successfully added",
 *      "productCategory": [
 *          {
 *              "_id": "23432hkjhkjhk4234hj"
 *              "categoryName": "bike",
 *              "__v": 0,
 *              "subCategories": [
 *                  {
 *                      "name": "bikes", 
 *                      "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAS...", 
 *                      "_id": "skjdfh23kjkj3h"
 *                  }
 *              ]
 *          }
 * }
 * @apiError ProductCategoryCreationFailed Can't add new product category type
 *
 * @apiErrorExample 500-response:
 *  HTTP/1.1 500 Internal server error
 * {
 *      "message": "Product category creation failed"
 * }
 */
router.post('/', isAuth, isAdmin, productCategoryController.addProductCategory);

module.exports = router;
