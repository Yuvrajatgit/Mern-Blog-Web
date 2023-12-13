const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const app = express();
const {authRouter, userRouter} = require('./routes/userRoutes');
const postRouter = require('./routes/postRoutes');

const DB = process.env.DATABASE;
const port = process.env.PORT || 4000;

mongoose.connect(DB).then(()=>{
    console.log('DB CONNECTED');
});

app.use(cors({
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type, Authorization',
}));

app.use(express.json({limit:'25mb'}));
app.use(express.urlencoded({limit: '25mb', extended: false}));
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/post', postRouter);


app.listen(port, ()=>{
    console.log("lISTENING");
});





