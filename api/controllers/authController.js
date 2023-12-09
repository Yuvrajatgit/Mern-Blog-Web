const jwt = require('jsonwebtoken');
const {promisify} = require('util');
const User = require('./../models/userModel');
const secret = process.env.JWT_SECRET;

exports.signup = async (req, res, next) => {
    try{
    const newUser = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    });
    const token = jwt.sign({id: newUser._id}, 'my-secret', {
        expiresIn: '90d'
    });
    res.header('Authorization', `Bearer ${token}`);
    res.status(201).json({
        status: 'success',
        token,
        data : {
            user: newUser
            }
        });
       }catch(error){
        res.status(404).json({
            status: 'fail',
            error: error.message
            })
    }
    next();
};

exports.login = async (req, res, next) => {
    try{
        const {email,password} = req.body;

        if(!email || !password){
            throw new Error('Email and password are required');
        }
        
        const user = await User.findOne({email}).select('+password');

        if (!user) {
            throw new Error('Incorrect Email or password');
        }

        const correct = await user.correctPassword(password, user.password);

        
        if (!correct) {
            throw new Error('Incorrect Email or password');
        }

        const token = jwt.sign({id: user._id}, 'my-secret', {
            expiresIn: '90d'
        });
        res.header('Authorization', `Bearer ${token}`);
        res.status(200).json({
            status: 'success',
            token,
            data : {
                user
                }
            })
           }catch(error){
            res.status(400).json({
                status: 'fail',
                error: error.message
                })
        }
        next();
};

exports.protect = async (req,res,next)=>{
    try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
       token = req.headers.authorization.split(' ')[1];
    }else{
        throw new Error('You are not loggein in, Please log in to get access');
    }

    const decoded = await promisify(jwt.verify)(token, 'my-secret');
    const user = await User.findById(decoded.id);
    if(!user){
      throw new Error('The user belonging to this token no longer exists.');
    }
    req.user = user;
    next();
    
} catch (error){
    res.status(401).json({
        status: 'fail',
        error: error.message
    })
}
};