const categoryModel= require('../Models/categoryModel');

const  createCategory = async (req,res)=>{
    try{
        const {title,imageUrl}=req.body;
        const newCategory=new categoryModel({title,imageUrl});
        await newCategory.save();
        res.status(201).send({
            success:true,
            message:"New category created successfully",
            data:newCategory
        })
    }catch(error){
        console.log("Error occurred ",error);
        res.status(500).send({
            success:false,
            message:"Failed to create new category"
        })
    }
}

const updateCategory=async (req, res) => {
    try{
        const {id}=req.params;
        const {title, imageUrl}=req.body;
        const user=await categoryModel.findById({id});
        if(!user){
            return res.status(404).send({
                success:false,
                message:"Category not found,Invalid category Id"
            })
        }
        
      if(title) user.title = title;
      if(imageUrl) user.image = imageUrl
      const updateCategory=await user.save();
      res.status(200).send({
            success:true,
            message:"Category updated successfully",
            data:updateCategory
        })
    
    }catch(error){
        console.log("Error occurred ",error);
        res.status(500).send({
            success:false,
            message:"Failed to update category"
        })
    }
}


const getAllCategories =async (req, res) => {
    try{
        const categories= await categoryModel.find();
        if(!categories){
            return res.status(404).send({
                success:false,
                message:"No categories  found"
            })
        }
        else {
            return  res.status(200).send({
                success:true,
                message:"Categories successfully found",
                categories_length:categories.length,
                data:categories
            })
        }
    }catch(err)
{
    console.log("Error occured while  getting all  categoris",err);
    return res.status(404).send({
        success:false,
        message:"Failed to get all categories",
    })
}}

const getCategoryById=async (req, res) => {
    try{
        console.log("Getting category by id running")
        const user=await categoryModel.findById(req.params.id);
        if(!user){
            return res.status(404).send({
                success:false,
                message:"Category not found on this id"
            })
        }
    
            else{
                return res.status(200).send({
                    success:true,
                    message:"User retrieved successfully",
                    user:user
                })
            }
        }catch(err){
        console.log("Error  occured  while getting all  categorries",err);
    }
}

const deleteCategoryById = async (req, res) => {
    try{
        console.log("Deleting category by id")
     const category = await categoryModel.findByIdAndDelete(req.params.id);
     if(!category){
        return res.status(404).send({
            success:false,
            message:"Category not found on this id"
        });
     }
     else{
        return res.status(200).send({
            success:true,
            message:"Category deleted successfully",
            category:category
        });
     }
    }catch(error){
        console.log("Error occurred while deleting category",error);
        res.status(500).send({
            success:false,
            message:"Failed to delete category"
        })
    }
}


module.exports ={
    createCategory,
    updateCategory,
    getAllCategories,
    getCategoryById,
    deleteCategoryById,
}