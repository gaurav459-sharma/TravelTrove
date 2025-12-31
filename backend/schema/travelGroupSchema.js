const {authSchema} = require('./authSchema')

const mongoose = require('mongoose')

let schema ={};
schema.messageSchema = new mongoose.Schema({
    sender: {type:String},
    text: String,
    timeStamp:{type:Date, default:Date.now }
})

schema.travelGroup = new mongoose.Schema({
    groupName:{
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    createdBy: {
        type: String,
        required: true,
    },
    members:{type:[{username:String}],default:[]},
    messages: {type:[schema.messageSchema],default:[]}
},{timestamps:true});

module.exports=schema;