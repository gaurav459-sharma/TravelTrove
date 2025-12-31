const collection = require('../utilities/connection')
const {User}  =require('../schema/authSchema')

const trip ={}


trip.createTripItnerary = async (trip,destId) =>{

    let model  =await collection.TripItnerary();
    let result = await model.findOne({$and:[{username:trip.username},{destinationId:destId}]});
    
    if(result){
        return {success:false,"message":"Trip already found!",data:result}
    }
 
    //fetching destination guide data 
    let destModel  =await collection.destinationGuideModel();
    let destGuide = await destModel.findOne({_id:destId});

    trip.destinationId = destId;
    trip.destinationName= destGuide.destinationName;

    let data  =await model.create(trip);
    if(data){
        let updatedTrip = await User.updateOne({username:data.username},{$addToSet:{myTrips:data}});
       
        if(updatedTrip.modifiedCount){
            return {data:data,success:true,"message":"trip-itenrary added successfully!"};
        }
        else{
            return {"message":"trip-itenrary already exist",success:false,data:null};
        }
    }
    else return {success:false,"message":"trip-itenrary creation failed",data:null};

}

trip.getMyTripItnerary = async(userId)=>{

    let data = await User.findOne({_id:userId},{myTrips:1});
    if(data){
        return {data:data,success:true,"message":"trip-itenrary data fetched successfully!"}
    }
    else{
        return {"message":"No trips found!",success:true,data:null}
    }
}

trip.getTripItneraryById = async(tripId)=>{

    let tripModel  =await collection.TripItnerary();
    let data = await tripModel.findOne({_id:tripId});
    if(data){
        return {data:data,success:true,"message":"trip-itenrary data fetched successfully!"}
    }
    else{
        return {"message":"trip not found!",success:true,data:null}
    }
}

//admin access

//updation of trip by admin
trip.updateTripItneraryById = async(uptedData,tripId)=>{

    let tripModel  =await collection.TripItnerary();
    let data = await tripModel.updateOne({_id:tripId},{$set:uptedData});
    if(data.modifiedCount){
        return {data:data,success:true,"message":"trip-itenrary data updated successfully!"}
    }
    else{
        return {"message":"trip-itenrary failed updated",success:false,data:null}
    }
}

//deletion of trip by admin
trip.deleteTripItneraryById = async(tripId)=>{

    let tripModel  =await collection.TripItnerary();
    let data = await tripModel.deleteOne({_id:tripId});
    if(data.deletedCount){
        return {data:data,success:true,"message":"trip-itenrary data deleted successfully!"}
    }
    else{
        return {"message":"trip-itenrary failed deleted",success:false,data:null}
    }
}


module.exports = trip