const mongoose = require("mongoose");


const connectDB = async () => {
    try {

        MONGO_URI='mongodb+srv://desalegnrender:render@cluster0.tzhazec.mongodb.net/confusion'
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("MongoDB connection SUCCESS");
    } catch (error) {
        console.error("MongoDB connection FAIL");
        process.exit(1);
    }
}
module.exports = connectDB;
