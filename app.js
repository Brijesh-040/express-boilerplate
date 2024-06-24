const express = require('express');
const cors = require("cors")

const app = express();
app.use(cors())

// Import routes
const userRoutes = require("./server/routes/user.route")

// Middlewares
app.use(express.json())
app.use(cors());

// Root Route setup
app.get('/',(request,res)=>{  
    res.json(`${new Date()}, welcome folk's🎉`)
})

// Routes Middlewares
app.use("/api/v1", userRoutes)

module.exports = app;