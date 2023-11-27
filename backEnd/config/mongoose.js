import mongoose from 'mongoose';

const db= ()=>{
    // console.log(process.env.MONGO_URI);
    mongoose.connect(process.env.MONGO_URI,{
        dbname :'ecommerce_backend',
    })
    .then(()=>console.log('DataBase Connected'))
    .catch((err)=>console.log(err));
}
export default db;