const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const app = express();
const {authRouter, userRouter} = require('./routes/userRoutes');
const postRouter = require('./routes/postRoutes');

const DB = process.env.DATABASE;
const port = process.env.PORT || 4000;

mongoose.connect(DB).then(con=>{
    console.log('DB CONNECTED');
});


app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  }));

app.use(express.json());
app.use('/uploads',express.static(__dirname + '/uploads'));


app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/post', postRouter);


app.listen(port, ()=>{
    console.log("lISTENING");
});





