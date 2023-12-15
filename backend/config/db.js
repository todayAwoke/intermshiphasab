const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb://127.0.0.1:27017/hasab", {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useFindAndModify: true,
        });
        console.log(`mongodb connected :${conn.connection.host}`.cyan.underline);
    } catch (error) {
        console.log(`error :${error.message}`)
        process.exit();
    }
}

module.exports = connectDB