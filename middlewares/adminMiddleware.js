const userModel= require('../Models/userModel');

module.exports= async (req, res, next) => {
    try {
        const user = await userModel.findById(req.params.id);
        if (!user.userType!=="amdin") {
            return res.status(401).
            send({
                success: false,
                message: 'You are not authorized to access this resource',
            });
        }else{
            next();
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Failed to authenticate user',
            error
        });
    }
 };
