const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required: [true, 'Please tell us your first name!']
    },
    lastName : {
        type: String,
        required: [true, 'Please tell us your last name!']
    },
    email : {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowecase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    password : {
        type: String,
        required: [true, 'Please provide a password'],
        select: false
    }
});

userSchema.pre('save', async function(next){
   this.password = await bcrypt.hash(this.password, 12);
   next();
});

userSchema.methods.correctPassword = async function(candidatePassword, userPassword){
    return await bcrypt.compare(candidatePassword, userPassword);
}

const User = mongoose.model('User', userSchema);

module.exports = User;