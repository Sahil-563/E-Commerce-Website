import Users from '../models/userModel.js'
import bcrypt from 'bcrypt';
import { setcookie } from '../utils/cookieSetter.js';
//Registering new user:-
export const registerController = async (req,res) => {
    const { name, email, password, phone } = req.body;
    let existing_user = await Users.findOne({ email });
    if (existing_user) {
        res.status(404).json({
            success: false,
            message: 'User Already Exists,Please login',
        });
    }
        try {
            const hashedpasword = await bcrypt.hash(password,10);
            const new_user = await Users.create({name:name,email:email,password:hashedpasword,phone:phone});
            res.status(201).send({
                success: true,
                message: "User Register Successfully",
                new_user,
              });
            } 
        

        catch (error) {
            console.log(error);
              res.status(500).send({
                success: false,
                message: "Error in Registeration",
                error,
            })
        }
    }

export const loginController=async(req,res)=>{
    try{
    const{email,password}=req.body;
    let user = await Users.findOne({email});
    if(!user){
     //Is user Email already exists then no need to register it again
        res.status(404).json({
            success:false,
            message:'User donot Exists!Please register first!',
        
        });
        return;
    }
    const isMatch =  await bcrypt.compare(password, user.password);
    if(!isMatch){
        res.status(404).json({
            success:false,
            message:'Incorrect password',
        });
    }
    else{
        setcookie(user,`${user.name} logined successfully`,200,res);
    }
    
}
     catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in login",
        error,
      });
    }

}

export const privateController =(req, res) => {
    try {
        res.send('private Route');
    } catch (error) {
        console.log(error);
        res.send({ error });
    }
    
}