const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const userModel = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please enter your name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [5, "Name should have more than 4 characters"]
    },
    email:{
        type: String,
        required: [true, "Please enter your email id"],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email"]
    },
    password:{
        type: String,
        required: [true, "Please enter your password"],
        minLength: [8, "Name should have more than 8 characters"],
        select: false
    },
    avatar:{
        public_id:{
            type: String,
            required: true
        },
        url:{
            type:String,
            required:true
        }
    },
    role:{
        type: String,
        default: "user"
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
})

userModel.pre("save", async function(next){
    if(!this.isModified("password")){
        next()
    }
    this.password = await bcryptjs.hash(this.password, 10)
})

userModel.methods.getJwtToken = function(){
    return jwt.sign({id:this._id}, process.env.SIGN, {
        expiresIn: process.env.SIGN_EXPIRE
    })
}

userModel.methods.comaparePassword = async function(password){
    return (bcryptjs.compare(password, this.password))
}

userModel.methods.getResetPasswordToken = async function(){
    const resetToken = crypto.randomBytes(20).toString("hex")
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000
    return resetToken
}

module.exports = mongoose.model('user', userModel)