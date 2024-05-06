import mongoose from 'mongoose';

const connectDB = (url) => {
    mongoose.set('strictQuery', true);
    mongoose.connect(url)
    .then(() => console.log("DB connection successful"))
    .catch((err) => console.log("DB connection failed", err))
}

export default connectDB;