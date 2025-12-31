const jwt  =require('jsonwebtoken');
const { User } = require('../schema/authSchema');
let authCheck = (authHeader)=>{
      if(authHeader){
         const decodedToken = jwt.decode(authHeader.substring(7)) ;
         const userData = User.findOne({_id:decodedToken.id});
         if(userData) {
            return decodedToken
         }

         const error = new Error('user not found');
         throw error;
        
      }
      else return null;
}

module.exports=authCheck