import jwt from 'jsonwebtoken';
import Users from '../models/userModel.js'

export const requireSignIn=async (req,res,next)=>{
    try {
        const {token}= req.cookies;
        if(!token){
            res.status(404).json({
                success:false,
                message:'Not logedin!Please login first!',
            })
            return;
        };
        const decodeddata = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decodeddata.id
        next();
        
    } catch (error) {
        console.log(error);
    }
    
}

export const isAdmin=async (req, res, next)=>{
    try {
        const user = await Users.findById(req.user);
        user.role=1 //Making admin to login by doing role =1
        if(!user.role==1){
            res.status(404).json({
                success:false,
                message:'UnAuthorized access',
            
            });
            return;
        }
        else{
            next();
        }
        
        
    } catch (error) {
        console.log(error);
        res.status(401).send({
          success: false,
          error,
          message: "Error in admin middelware",})
    }
}