const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
require('dotenv').config();

const userSchema = new mongoose.Schema({
    name:{
        type:String ,
        required:["Name required ", true],
    },
    username:{
        type:String,
        required: ["Username required" , true],
        unique: true,
    },
    email:{
        type:String,
        require : ["Email Required", true],
        unique: true,
    },
    password:{
        type:String , required : ["Password required" , true]
    },
    location:{
        lat:Number,
        lng:Number,
    },
    assignedZone:{
        type:String
    },
    isAvailable:{
        type:Boolean, default : true
    },
    profilePicture: { type: String }
},{timestamps: true});

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Compare password
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Generate JWT token
userSchema.methods.generateAuthToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

module.exports = mongoose.model('User', userSchema);