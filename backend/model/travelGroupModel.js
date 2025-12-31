const collection = require('../utilities/connection')
const { User } = require('../schema/authSchema')

const travelGroup = {};

travelGroup.getTravelGroups = async () => {
    try {
        let model = await collection.travelGroups();
        let travelGroups = await model.find({});
        if (travelGroups.length) {
            return { "message": "travel groups found", success: true, data: travelGroups }
        }
        else {
            return { "message": "travel groups not found", success: false, data: travelGroups }
        }
    } catch (error) {
        throw error;
    }
}

travelGroup.getMyTravelGroups = async (username) => {
  let myGroups = await User.findOne({username:username},{myTravelGroups:1,_id:0});
  if(myGroups){
    return {"message":"my travel groups",success:true,data:myGroups.myTravelGroups}
  }
  else{
    return {"message":"my travel groups not found",success:false,data:null}
  }
}

travelGroup.createTravelGroup = async (travelData) => {
    try{
        let model = await collection.travelGroups();

        let createGroup = await model.create(travelData);
    //inserting the first member who created the group
        createGroup.members.push({ "username": travelData.createdBy })
        createGroup.save();
       

        if (createGroup) {
            let addToUser = await User.updateOne({ username: travelData.createdBy }, { $push: { myTravelGroups: { createGroup} } })
            
            return { "message": "travel group created successfully!", success: true, data: createGroup }
        }
        else {
            return { "message": "failed to create travel group!", success: false, data: createGroup }
        }

    }catch(error){
        throw error;

    }
}

travelGroup.addToTravelGroup = async (id, username) => {

    let model = await collection.travelGroups();

    //find the group with group name
    let findGroup = await model.findOne({ _id: id });


    let checkUser = findGroup.members.some(item => item.username === username)
    if (checkUser) {
        return { "message": "user already exist in group", success: false, data: null }
    }

    if (findGroup) {
        let addMember = await model.updateOne({ _id: id }, { $addToSet: { members: { "username": username } } });
    
        let updatenewUser = await User.updateOne({ username: username }, { $push: { myTravelGroups: {findGroup} } })

        if (addMember.modifiedCount) {
            return { "message": `${username} are added successfully!`, success: true, data: addMember }
        }
        else {
            return { "message": `${username} already exist`, success: false, data: null }

        }
    }
    else {
        return { "message": "travel group not exist", success: false, data: null }
    }
}

travelGroup.sendMessageToGroup = async (userObject, groupId) => {

    let model = await collection.travelGroups();

    let travelGroup = await model.findOne({ _id: groupId })
    if(travelGroup){
        let checkUser = travelGroup.members.some(item => item.username === userObject.sender)
        if (!checkUser) {
            return { "message": "you are not member of group", success: false, data: null }
        }

        let updateMessage = await model.updateOne({_id:groupId},{$push:{messages:userObject}});
        if(updateMessage.modifiedCount){
            return {"message":"message sent",success:true,data:userObject.message};
        }
        else{
            return {"message":"message not sent",success:false,data:userObject.message};

        }

    }
    else{
        return {"message":"travel group not found!", success:false,data:null}
    }

}

travelGroup.getMessageFromGroup = async (groupId) => {

    let model = await collection.travelGroups();

    let travelGroup = await model.findOne({ _id: groupId })
    if(travelGroup){
        
        let getMessages = await model.findOne({_id:groupId},{messages:1,_id:0});
    
        if(getMessages){
            return {"message":"message fetched",success:true,data:getMessages};
        }
        else{
            return {"message":"no messages found",success:false,data:null};

        }
    }
    else{
        return {"message":"travel group not found!", success:false,data:null}
    }

}

travelGroup.getGroupMembers = async (groupId) => {
    
        let model = await collection.travelGroups();
    
        let travelGroup = await model.findOne({ _id: groupId })
        if(travelGroup){
            
            let getMembers = await model.findOne({_id:groupId},{members:1,_id:0});
            if(getMembers){
                return {"message":"members fetched",success:true,data:getMembers};
            }
            else{
                return {"message":"no members found",success:false,data:null};
    
            }
        }
        else{
            return {"message":"travel group not found!", success:false,data:null}
        }
}

module.exports = travelGroup;
