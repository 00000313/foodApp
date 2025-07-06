const  express = require('express');

const authMiddleware = require('../middlewares/authMiddleware');
const {createCategory ,getAllCategories , getCategoryById , deleteCategoryById} = require('../controller/categoryController');

const  router = express.Router();

router.post("/createCategory",authMiddleware,createCategory)
 router.get("/getAll",authMiddleware,getAllCategories)
 router.get("/getById/:id",authMiddleware,getCategoryById)
 router.delete("/deleteById/:id",authMiddleware,deleteCategoryById)


module.exports=router;