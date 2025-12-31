const express = require('express');
const router = express.Router();
const userCollection = require('../model/userModel')

const {getToken} = require('../schema/authSchema')
const validator  =require('../utilities/validation')

//POST //api/auth/signup

router.post('/signup', async(req,res,next)=>{

    try{
        validator.checkEmailValidation(req.body.email);
        validator.checkPasswordValidation(req.body.password);
        
       let userExist = await userCollection.searchUser(req.body)
       if(userExist){
         return res.status(409).json({message:'Username or email already exists',success:false});
       }

       //create new user
       let user = await userCollection.signUp(req.body)
        if(user){
            res.status(201).json({message:'User registered succesfully',success:true});
        }
        else{
            res.status(400).json({message:'something went wrong',success:false});
        }
        
    }catch(error){
        next(error)
    }
});

router.post('/login', async(req,res,next)=>{
  
    try{
        let user = await userCollection.loginUser(req.body)
        
        if(!user.checkUser){
            return res.status(400).json({message:'Invalid email or password',success:false});
        }

        //generate a jwt token
        const token = getToken(user.data);
        res.json({token:token,success:true});
    }catch(error){
        next(error)
    }
});

//to get a list of travel groups
router.get('/travel-group/my-groups', async(req,res,next)=>{
  
    try{
        let decodedToken = validator.checkToken(req.headers.authorization);
        if(!decodedToken){
            return res.status(403).json({message:'User not authorised',success:false});
        }
    
        let result = await userCollection.getMyTravelGroups(decodedToken.username);
        res.status(200).json(result);
    }catch(error){
        next(error)
    }
});

module.exports = router;
