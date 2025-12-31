const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const destSchema = require('./destinationGuideSchema')
const tripSchema = require('./tripItnerarySchema')
const travelGroupSchema = require('./travelGroupSchema')
const jwt  =require('jsonwebtoken');

const authSchema = new mongoose.Schema({
    username:{
        type: String,
        required:true,
        unique:true,
        minlength:3,
    },
    email:{
        type:String,
        required: true,
        unique:true,
    },
    role:{
        type:String,
        default:"user"
    },
    password:{
        type: String,
        required: true,
        minlength: 6,
    },
    favouriteDestinations:{type:[destSchema.destinationGuideSchema],default:[],unique:true},
    myTrips:{type:[tripSchema.TripItnerary],default:[]},
    myTravelGroups:{type:[travelGroupSchema.travelGroup],default:[]}
});
//pre-save hook to hash the password before saving
authSchema.pre('save', async function (next){
    if(!this.isModified('password')){
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password  =await bcrypt.hash(this.password,salt);
    next();
});

//method to compare entered password with hashed password
authSchema.methods.matchPassword  = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

let getToken = (user)=>{
    let token = jwt.sign({id:user._id, email:user.email , username:user.username,role:user.role},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_IN,
    });
    return token
}

const User = mongoose.model('User', authSchema);

const setAdmin = async()=>{
   let admin = {
    "username":"Admin",
    "email":"admin@gmail.com",
    "password":"admin@123",
    "role":"admin"
   }
   let data = await User.create(admin);
}

module.exports = {setAdmin ,User,authSchema,getToken};