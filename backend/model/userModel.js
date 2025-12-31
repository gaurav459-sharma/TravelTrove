const {User} = require('../schema/authSchema');
const jwt  =require('jsonwebtoken');

let userCollection = {};

userCollection.searchUser = async (userData)=>{

    let data = await User.findOne({$or:[{email:userData.email},{username:userData.username}]});
    if(data)return data;
    else{
        return null;
    }
}

userCollection.signUp =  async (userData)=>{
     //create a new user
     let data = await User.create(userData)
     return data
}

userCollection.loginUser = async (userData)=>{

    let userExist = await userCollection.searchUser(userData);
    if(userExist){
        const isMatch = await userExist.matchPassword(userData.password);
        
        return {"checkUser":isMatch,data:userExist};
    }
    else return null;
}

userCollection.getMyTravelGroups = async (username)=>{  
    let user = await User.findOne({username:username});

    return user.travelGroups;
}

module.exports = userCollection;