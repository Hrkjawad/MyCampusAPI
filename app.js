// Application Configuration
const express = require("express");
const app = express();
const studentsRouter = require("./src/routes/StudentsApi");
const teachersRouter = require("./src/routes/TeachersApi");
const cookieParser = require('cookie-parser');
const cors = require("cors");
const hpp = require("hpp");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoose = require('mongoose');
const sanitizerPlugin = require('mongoose-sanitizer');

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });

// Apply mongoose-sanitizer plugin to mongoose globally
mongoose.plugin(sanitizerPlugin);

// Use middleware
app.use(cookieParser());
app.use(express.json());
app.use(cors());
//app.use(sanitizerPlugin)
app.use(hpp());
app.use(helmet());
app.use(limiter);
app.use('/api/student', studentsRouter);
app.use('/api/teacher', teachersRouter);

// let URI = "mongodb+srv://<username>:<password>@cluster0.7uslu.mongodb.net/practise?retryWrites=true&w=majority";
// let OPTION = {user: 'admin', pass:'admin', autoIndex: true}

// mongoose.connect("mongodb://localhost:27017/Testing")
// .then(()=>console.log('Database practise connected'))
// .catch((error)=>{
//     console.log('Failed to connect with database');
//     console.log(error);
//     process.exit(1);
// })
//
mongoose.connect("mongodb+srv://softenghasan25:aEaV06X6h7vb5arU@mycampus.jnbwms4.mongodb.net/?retryWrites=true&w=majority&appName=mycampus")
.then(()=>console.log('Database practise connected'))
.catch((error)=>{
    console.log('Failed to connect with database');
    console.log(error);
    process.exit(1);
})

module.exports = app;
