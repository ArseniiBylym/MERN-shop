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
 *              "_id": "23432hkjhkjhk4234hj"
 *              "categoryName": "bike",
 *              "subCategories": ["mount", "road", "city"]
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
 * @apiParam {String} categoryName required - Category name.
 * @apiParam {Array} subCategories optional - Sub categories array.
 * @apiParamExample {json} Request-Example:
 * {
 *      "categoryName" : "bike",
 *      "subCategories": ["mount", "road", "city"]
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
 *              "subCategories": ["mount", "road", "city"]
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

/**
 * @api {delete} /api/product-category Delete product category
 * @apiName DeleteCategory
 * @apiGroup ProductCategory
 * @apiPermission admin
 * @apiExample {js} Request example:
 *  http://localhost:5000/api/product-category
 *
 * @apiParam {String} categoryId required - Product category id.
 * @apiParam {String} subCategoryName optional - Product subcategory name.
 *
 * @apiParamExample {js} Request-Example:
 *  http://localhost:5000/api/service?categoryId=123&subCategoryName=city
 * @apiParamExample {js} Request-Example:
 *  http://localhost:5000/api/service?categoryId=123
 *
 * @apiSuccessExample {json} 200 Success-Response:
 *  HTTP/1.1 200 OK
 * {
 *      "message": "Category was successfully deleted",
 *      "categoryId": "123"
 * }
 * @apiSuccessExample {json} 200 Success-Response:
 *  HTTP/1.1 200 OK
 * {
 *      "message": "SubCategory was successfully deleted",
 *      "name": "city"
 * }
 *
 * @apiError ProductCategoryDelationFailed Can't delete product category
 * @apiErrorExample 500-response:
 *  HTTP/1.1 500 Internal server error
 * {
 *      "message": "Produce category delation failed"
 * }
 */
router.delete('/', isAuth, isAdmin, productCategoryController.deleteProductCategory);

module.exports = router;
