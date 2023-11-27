import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import db from './config/mongoose.js';
import userRouter from './routes/authRoutes.js'
import cookieParser from 'cookie-parser';
dotenv.config({
    path:'./config/config.env',
})

dotenv.config();
const app = express();
db();
app.use(cookieParser());
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:['GET','PUT','POST','DELETE'],
    credentials:true,
}))
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Nicely Working");
  });
app.use('/api/v1/users', userRouter);

app.listen(process.env.PORT,(err)=>{
    if(err){
        console.log('Error in running the server');
        return
    }
    console.log(`Server is running on ${process.env.PORT}`);
})