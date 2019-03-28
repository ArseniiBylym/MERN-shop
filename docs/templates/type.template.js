const {Router} = require('express');
const typeController = require('../../controllers/type.controller');

const router = Router();

/**
 * @api {get} /api/type/:group Get group types
 * @apiName GetType
 * @apiGroup Type
 * @apiExample {js} Request example:
 *  http://localhost:5000/api/type/dellivery
 *
 * @apiSuccessExample {json} 200 Success-Response:
 *  HTTP/1.1 200 OK
 *  [{"name": "UkrPoshta", "value": 1}, {"name": "Nove Poshta", "value": 2}]
 */
router.get('/:group', typeController.getTypes);

/**
 * @api {post} /api/type Add new types
 * @apiName PostType
 * @apiGroup Type
 * @apiPermission admin
 * @apiExample {js} Request example:
 *  http://localhost:5000/api/type
 * 
 * @apiHeader {String} Authorization Bearer token
 *  @apiHeaderExample {json} Header-example:
 *  {
 *  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZ21haWwuY29tIiwiaWQiOiI1Yzg2OTMxNmUxODVhODMzNDAzMjVkYzgiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNTUyNTc4NjI1LCJleHAiOjE1NTI2NjUwMjV9.Adpz8jVppQ3RUtH1Ng_S3wzShpDuqdwH8MmOCTTteEY"
 *  }
 * 
 * @apiParamExample {json} Request-Example:
 * [
 *      {"group": "payment", "name": "Privat24", "value": 1},
 *      {"group": "payment", "name": "Bank transfer", "value": 2}
 * ]
 * 
 * @apiSuccessExample {json} 200 Success-Response:
 *  HTTP/1.1 200 OK
 *  [
 *      {"group": "payment", "name": "Privat24", "value": 1},
 *      {"group": "payment", "name": "Bank transfer", "value": 2}
 *  ]
 */
router.post('/', isAuth, isAdmin, typeController.postTypes);
