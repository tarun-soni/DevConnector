const mongoose = require('mongoose');
//config will get values stored in config/default.json
const config = require('config');

const db = config.get('mongoURI')

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.log('error is ', err.message);
        //exit process with failure
        process.exit(1);
    }
}
module.exports = connectDB;