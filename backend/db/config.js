const mongoose = require('mongoose');
require('dotenv').config({
  path: require('path').resolve(__dirname, '.env')
});
// Load environment variables

const mongoURI = process.env.MONGO_URI;
console.log("MONGO_URI from env:", mongoURI); // Debug

mongoose.connect(mongoURI)
.then(() => {
    console.log(" Connected to MongoDB");
})
.catch((err) => {
    console.error(" MongoDB connection error:", err);
});
