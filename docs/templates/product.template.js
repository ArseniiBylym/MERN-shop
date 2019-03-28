const {Router} = require('express');
const productController = require('../controllers/product.controller');
const isAuth = require('../middlewares/isAuth');

const router = Router();


/**
 * @api {get} /api/product/ Get product list
 * @apiName GetProductList
 * @apiGroup Product
 * @apiPermission all
 * @apiExample {js} Request example:
 *  http://localhost:5000/api/product?category=bikes&subCategory=road
 * @apiExample {js} Request example:
 *  http://localhost:5000/api/product?name=searchingName
 * @apiExample {js} Request example:
 *  http://localhost:5000/api/product?saleProduct=true
 * 
 * @apiParam (query string) {String} category Category of the product
 * @apiParam (query string) {String} subCategory SubCategory of the product
 * @apiParam (query string) {String} name Part of the product name for searching matched products
 * @apiParam (query string) {Boolean} saleProduct Get only products with sale price
 * 
 * @apiSuccess {Number} totalCount Total length of the product list
 * @apiSuccess {Object[]} products Array of the product objects
 * @apiSuccess {String} products.category
 * @apiSuccess {String} products.subCategory
 * @apiSuccess {String} products.imageUrl
 * @apiSuccess {String} products.manufacture
 * @apiSuccess {String} products.name
 * @apiSuccess {Number} products.price
 * @apiSuccess {Number} products.salePrice
 * @apiSuccess {Number} products.quantity
 * @apiSuccess {String} products._id
 * 
 * @apiSuccessExample {json} 200 Success-Response:
 *  HTTP/1.1 200 OK
 * {
 *      products: [{
 *          "category": "bikes"
 *          "imageUrl": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD"
 *          "manufacture": "Specialized"
 *          "name": "Turbo Como 5.0 Low-Entry"
 *          "price": 100
 *          "quantity": 5
 *          "salePrice": 0
 *          "subCategory": "city"
 *          "_id": "5c9273fd1c5551066073d9e8"
 *      }]
 *      totalCount: 3
 * }
 *
 */
router.get('/', productController.getProduct);

/**
 * @api {get} /api/product/:prodId Get product details
 * @apiName GetProductDetails
 * @apiGroup Product
 * @apiPermission all
 * @apiExample {js} Request example:
 *  http://localhost:5000/api/product/skdfh23kj4h234
 * 
 * @apiParam (params) {String} prodId Product id
 * 
 * @apiSuccess {String} category 
 * @apiSuccess {String} description
 * @apiSuccess {String} imageUrl
 * @apiSuccess {String} [manufacture]
 * @apiSuccess {String} name
 * @apiSuccess {Number} price
 * @apiSuccess {Number} [salePrice]
 * @apiSuccess {Number} [quantity]
 * @apiSuccess {String} subCategory
 * @apiSuccess {String} _id
 * @apiSuccess {Number} __v
 * @apiSuccess {Object[]} reviews
 * @apiSuccess {String} reviews.date
 * @apiSuccess {Number} [reviews.raiting]
 * @apiSuccess {String} reviews.text
 * @apiSuccess {String} reviews._id
 * @apiSuccess {Object} reviews.author
 * @apiSuccess {String} reviews.author.name
 * @apiSuccess {String} reviews.author._id
 * 
 * 
 * @apiSuccessExample {json} 200 Success-Response:
 *  HTTP/1.1 200 OK
 * {
 *      "category": "bikes"
 *      "description": "When it comes to e-bikes, you won't often find the words ."
 *      "imageUrl": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD"
 *      "manufacture": "Specialized"
 *      "name": "Turbo Como 5.0 Low-Entry"
 *      "price": 100
 *      "quantity": 5
 *      "reviews": [
 *          "author": {_id: "5c88affa5bdf2432ccef06d3", name: "admin"}
 *          "date": "2019-03-21T16:19:56.105Z"
 *          "raiting": 3
 *          "text": "comment"
 *          "_id": "5c93b9acc999a91f24c6767a"
 *      ]
 *      "salePrice": 0
 *      "subCategory": "city"
 *      "__v": 10
 *      "_id": "5c9273fd1c5551066073d9e8"
 * }
 */
router.get('/:prodId', productController.getProductDetails);


/**
 * @api {post} /api/product Create product 
 * @apiName PostProduct
 * @apiGroup Product
 * @apiPermission admin
 * @apiExample {js} Request example:
 *  http://localhost:5000/api/product
 * 
 *  @apiHeader {String} Authorization Bearer token
 *  @apiHeaderExample {json} Header-example:
 *  {
 *  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZ21haWwuY29tIiwiaWQiOiI1Yzg2OTMxNmUxODVhODMzNDAzMjVkYzgiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNTUyNTc4NjI1LCJleHAiOjE1NTI2NjUwMjV9.Adpz8jVppQ3RUtH1Ng_S3wzShpDuqdwH8MmOCTTteEY"
 * }
 * 
 * @apiParam (body) {String} category 
 * @apiParam (body) {String} [description]
 * @apiParam (body) {String} imageUrl
 * @apiParam (body) {String} [manufacture]
 * @apiParam (body) {String} name
 * @apiParam (body) {Number} price
 * @apiParam (body) {Number} [salePrice]
 * @apiParam (body) {Number} [quantity]
 * @apiParam (body) {String} subCategory
 * 
 * @apiSuccess {String} category 
 * @apiSuccess {String} description
 * @apiSuccess {String} imageUrl
 * @apiSuccess {String} [manufacture]
 * @apiSuccess {String} name
 * @apiSuccess {Number} price
 * @apiSuccess {Number} [salePrice]
 * @apiSuccess {Number} [quantity]
 * @apiSuccess {String} subCategory
 * @apiSuccess {String} _id
 * @apiSuccess {Object[]} reviews
 * 
 * @apiSuccessExample {json} 200 Success-Response:
 *  HTTP/1.1 200 OK
 * {
 *      "category": "bikes"
 *      "description": "When it comes to e-bikes, you won't often find the words ."
 *      "imageUrl": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD"
 *      "manufacture": "Specialized"
 *      "name": "Turbo Como 5.0 Low-Entry"
 *      "price": 100
 *      "quantity": 5
 *      "reviews": []
 *      "salePrice": 0
 *      "subCategory": "city"
 *      "_id": "5c9273fd1c5551066073d9e8"
 * }
 */
router.post('/', isAuth, productController.createProduct);


/**
 * @api {put} /api/product/comment Add comment 
 * @apiName PutProductComment
 * @apiGroup Product
 * @apiPermission user
 * @apiExample {js} Request example:
 *  http://localhost:5000/api/product/comment
 * 
 *  @apiHeader {String} Authorization Bearer token
 *  @apiHeaderExample {json} Header-example:
 *  {
 *  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZ21haWwuY29tIiwiaWQiOiI1Yzg2OTMxNmUxODVhODMzNDAzMjVkYzgiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNTUyNTc4NjI1LCJleHAiOjE1NTI2NjUwMjV9.Adpz8jVppQ3RUtH1Ng_S3wzShpDuqdwH8MmOCTTteEY"
 * }
 * 
 * @apiParam (body) {String} productId 
 * @apiParam (body) {Object} comment
 * @apiParam (body) {String} comment.text
 * @apiParam (body) {Number} comment.raiting
 * 
 * @apiParamExample {json} Request example
 * {
 *      "comment": {"text": "comment", "raiting": 4}
*       "productId": "5c9a07bebbdfb8048c2ec860"
 * }
 * 
 * @apiSuccess {String} message 
 * @apiSuccess {Object} data
 * @apiSuccess {String} data.author
 * @apiSuccess {String} data.date
 * @apiSuccess {String} data.text
 * @apiSuccess {Number} data.raiting
 * 
 * @apiSuccessExample {json} 200 Success-Response:
 *  HTTP/1.1 200 OK
 * {
 *      "data": {"author": "5c88affa5bdf2432ccef06d3", "date": "2019-03-28T17:09:35.989Z", "text": "comment", "raiting": 4}
        "msg": "Added comment to the product"
 * }
 */
router.put('/comment', isAuth, productController.addComment);


/**
 * @api {put} /api/product/:prodId Update product 
 * @apiName PutProduct
 * @apiGroup Product
 * @apiPermission admin
 * @apiExample {js} Request example:
 *  http://localhost:5000/api/product/34kjh23kjh3434
 * 
 *  @apiHeader {String} Authorization Bearer token
 *  @apiHeaderExample {json} Header-example:
 *  {
 *  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZ21haWwuY29tIiwiaWQiOiI1Yzg2OTMxNmUxODVhODMzNDAzMjVkYzgiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNTUyNTc4NjI1LCJleHAiOjE1NTI2NjUwMjV9.Adpz8jVppQ3RUtH1Ng_S3wzShpDuqdwH8MmOCTTteEY"
 * }
 * 
 * @apiParam (params) {String} prodId Produc id
 * @apiParam (body) {String} category 
 * @apiParam (body) {String} [description]
 * @apiParam (body) {String} imageUrl
 * @apiParam (body) {String} [manufacture]
 * @apiParam (body) {String} name
 * @apiParam (body) {Number} price
 * @apiParam (body) {Number} [salePrice]
 * @apiParam (body) {Number} [quantity]
 * @apiParam (body) {String} subCategory
 * 
 * @apiSuccess {String} category 
 * @apiSuccess {String} description
 * @apiSuccess {String} imageUrl
 * @apiSuccess {String} [manufacture]
 * @apiSuccess {String} name
 * @apiSuccess {Number} price
 * @apiSuccess {Number} [salePrice]
 * @apiSuccess {Number} [quantity]
 * @apiSuccess {String} subCategory
 * @apiSuccess {String} _id
 * @apiSuccess {Object[]} reviews
 * 
 * @apiSuccessExample {json} 200 Success-Response:
 *  HTTP/1.1 200 OK
 * {
 *      "category": "bikes"
 *      "description": "When it comes to e-bikes, you won't often find the words ."
 *      "imageUrl": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD"
 *      "manufacture": "Specialized"
 *      "name": "Turbo Como 5.0 Low-Entry"
 *      "price": 100
 *      "quantity": 5
 *      "reviews": []
 *      "salePrice": 0
 *      "subCategory": "city"
 *      "_id": "5c9273fd1c5551066073d9e8"
 * }
 */
router.put('/:prodId', isAuth, productController.updateProduct);

/**
 * @api {delete} /api/product/:prodId Delete product 
 * @apiName DeleteProduct
 * @apiGroup Product
 * @apiPermission admin
 * @apiExample {js} Request example:
 *  http://localhost:5000/api/product/34kjh23kjh3434
 * 
 *  @apiHeader {String} Authorization Bearer token
 *  @apiHeaderExample {json} Header-example:
 *  {
 *  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZ21haWwuY29tIiwiaWQiOiI1Yzg2OTMxNmUxODVhODMzNDAzMjVkYzgiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNTUyNTc4NjI1LCJleHAiOjE1NTI2NjUwMjV9.Adpz8jVppQ3RUtH1Ng_S3wzShpDuqdwH8MmOCTTteEY"
 * }
 * 
 * @apiParam (params) {String} prodId Product id
 * 
 * @apiSuccess {String} message
 * @apiSuccess {String} id Product id
 * 
 * @apiSuccessExample  200 Success-Response:
 *  HTTP/1.1 200 OK
 * {
 *  "message": "Product successfully deleted"
 *  "id": "324kjh23k4j32324"
 * }
 */
router.delete('/:prodId', isAuth, productController.deleteProduct);