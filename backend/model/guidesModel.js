const collection = require('../utilities/connection');
const {User}  =require('../schema/authSchema')

destination={};

destination.getGuides = async ()=>{
    let model = await collection.destinationGuideModel();

    let data = await model.find({});
    if(data.length){
        return {
            data:data,
            success:true,
            message:"Destination guides fetched successfully"
        }
    }
    return {data,"message":"destination guides not available",success:true};
}
destination.getDestinationById = async (id)=>{
    let model = await collection.destinationGuideModel();

    let destGuide = await model.findOne({_id:id});
    if(destGuide){
        let review = await collection.reviewModel();
        let reviewData = await review.find({destinationId:id});
        
        if(reviewData.length){
            return {
                data: {...destGuide._doc, "reviews":reviewData},
                success:true,
                message:"destination guide fetched successfully"
            };
        }
        else{
            return {"message":"No reviews found!",success:true, data:destGuide}
        }
    }
    else{
        return {
            "message":"Destination guide not found!",
            success:false,
            data:destGuide
        }
    }
  
}
destination.searchGuidesByName = async (destination)=>{
    let model = await collection.destinationGuideModel();

    let data = await model.find({destinationName:{$regex:destination,$options:"i"}});
    if(data.length){
        return {data:data,success:true,"message":"destination guide fetched successfully!"}
    }

    return {data:data,success:false,"message":"destination guide not available!"};
}

destination.addToFavourite = async (name,destinationId)=>{

    let model = await collection.destinationGuideModel();
    let favData = await model.findOne({_id:destinationId});

    if(favData){
        let result = await User.updateOne({username:name},{$addToSet:{favouriteDestinations:favData}});
       
        if(result.modifiedCount){
            return {data:favData,"message":"destination guide added in your favourites destination!",success:true};
        }
        return {data:null,"message":"destination guide already added in favourites destination!",success:true};;

    }
    else{
       return {data:null,"message":"destination guide not found!",success:false};
    }
   
}

destination.getFavourites = async(userid)=>{
    let data  = await User.findOne({_id:userid},{favouriteDestinations:1});
   
    if(data){
        return {
            data:data.favouriteDestinations,
            "message":"favourite destination guides fetched successfully!",
            success:true
        };
    }
    else{
        return {data:null,"message":"No favourite guides are available",success:true}
    }
}

destination.deleteFavourite = async(name,id)=>{
    let model = await collection.destinationGuideModel();
    let destGuide = await model.findOne({_id:id});

    let data  = await User.updateOne({username:name},{$pull:{"favouriteDestinations":{destinationName:destGuide.destinationName}}});
    if(data.modifiedCount){
        return {data:null,"message":`favourite destination deleted successfully!`,success:true}
    }
    return {data:null,"message":"favourite destination failed to delete!", success:false};
}

destination.setReviews = async (review)=>{

    let model = await collection.reviewModel();
    let result = await model.create(review)
    if(result){
        return {success:true,"message":"review added successfully!",data:result};
    }
    else{
        return {success:false,"message":"failed to add review!",data:null};
    }
}

//admin access

//creation of destination router
destination.createDestinationGuide = async (destinationGuide)=>{
    let model = await collection.destinationGuideModel();
    
    let isExist = await model.findOne({destinationName:destinationGuide.destinationName});
    
    if(isExist){
     
        return {"message":"Destination guide already exist!",success:false,data:null};
    }

    let result = await model.create(destinationGuide);

    if(result){
        return {"message":"Destination guide created successfully", success:true,data:result};
    }
    else{
        return {"message":"Destination guide creation failed", success:false,data:null};
    }
}

//updation of destination route

destination.updateDestinationGuide = async (destinationGuide,destId)=>{
    let model = await collection.destinationGuideModel();
    
    let fieldToUpdate = {
        destinationName:destinationGuide.destinationName,
        title:destinationGuide.title,
        summary:destinationGuide.summary
    }

    if(destinationGuide.photos.length){
        fieldToUpdate.photos=destinationGuide.photos;
    }

    let result = await model.updateOne({_id:destId},{$set:fieldToUpdate});
    if(result){
        return {"message":"Destination guide update successfully", success:true,data:result};
    }
    else{
        return {"message":"Destination guide updation failed", success:false,data:null};
    }
}

//deletion of destination route

destination.deleteDestinationGuide = async (destId)=>{
    let model = await collection.destinationGuideModel();
    let result = await model.deleteOne({_id:destId});
   
    if(result.deletedCount){
        return {"message":"Destination guide deleted successfully!", success:true,data:result};
    }
    else{
        return {"message":"Destination guide deletion failed!", success:false,data:null};
    }
}



module.exports = destination;