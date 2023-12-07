import mongoose from 'mongoose';

export const connectDB = async () => {
    try{
        await mongoose.connect('mongodb+srv://mauridevcde:Ecjp81lsx2Ta52R2@auth-mern-react.ndlzult.mongodb.net/db_auth-mern-react');
        console.log('>>> DB is connected');
        

    }catch(err){
        console.log(err);
    }
};