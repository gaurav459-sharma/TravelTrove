const mongoose  =require('mongoose')
const destSchema = require('../schema/destinationGuideSchema')
const tripSchema  =require('../schema/tripItnerarySchema')
const travelGroupSchema = require('../schema/travelGroupSchema')


let collection={};

collection.reviewModel= async ()=> 
    {
        return mongoose.model('userReviews' , destSchema.reviewSchema)
    }
collection.destinationGuideModel = async ()=>
    {
        return mongoose.model('destinationGuides' , destSchema.destinationGuideSchema)
    }
collection.TripItnerary = async ()=>
    {
        return mongoose.model('tripItnerary' , tripSchema.TripItnerary)
    }
collection.travelGroups = async ()=>
    {
        return mongoose.model('travelGroups' , travelGroupSchema.travelGroup)
    }


module.exports = collection