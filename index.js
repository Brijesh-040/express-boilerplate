const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors")

dotenv.config();

// connect to DB

mongoose.connect('mongodb://localhost:27017/expres')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Failed to connect to MongoDB', error);
    });

// Import routes
const productRoutes = require("./routes/product")

// Middlewares
app.use(express.json())
app.use(cors());

// route Middlewares
app.use("/api/v1", productRoutes)

app.listen(1600, () => {
    console.log("server up and runging on port 1600!")
    console.log("http://localhost:1600");
})
