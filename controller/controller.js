const testUserConntroller=(req,res)=>{
    try{
        res.status(200).send({
            success:true,
            message:"Test user api "
        })

    }catch(error){
        console.log("Error occured ",error);

    }
}


module.exports={
  testUserConntroller,
}