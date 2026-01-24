const mongoose = require('mongoose');

const connectDB = async(db_url) => {
    try {
        const connection = await mongoose.connect(db_url);
        if(connection) {
            console.log('mongo connected successfully');
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;