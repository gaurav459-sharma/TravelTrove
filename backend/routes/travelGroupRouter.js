const express = require('express');
const router = express.Router();
const authCheck = require('../utilities/authUtility')
const travelGroup = require('../model/travelGroupModel');
const { model } = require('mongoose');


router.get('/travel-group',async(req,res,next)=>{
  try{
     let decodedToken = authCheck(req.headers.authorization);
     if(!decodedToken){
        res.status(403).json({"message":"user not authorised",success:false})
     }

   let result = await travelGroup.getTravelGroups(); 
   res.status(200).json(result)


  }catch(error){

   next(error);
  }
})
//get login user travel groups

router.get('/travel-group/my-groups',async(req,res,next)=>{
  try{
     let decodedToken = authCheck(req.headers.authorization);
     if(!decodedToken){
        res.status(403).json({"message":"user not authorised",success:false})
     }

   let result = await travelGroup.getMyTravelGroups(decodedToken.username);
 
   res.status(200).json(result)


  }catch(error){

   next(error);
  }
})


router.post('/travel-group/create',async(req,res,next)=>{
    try{
       let decodedToken = authCheck(req.headers.authorization);
       if(!decodedToken){
          res.status(403).json({"message":"user not authorised",success:false})
       }
 
       let travelData ={...req.body,createdBy: decodedToken.username};

     let result = await travelGroup.createTravelGroup(travelData);
   
     if(!result.success){
       res.status(400).json(result);
     }
     else{
       res.status(201).json(result)
     }
 
    }catch(error){

     next(error);
    }
 })

 router.post('/travel-group/add/:id',async(req,res,next)=>{
  try{
     let decodedToken = authCheck(req.headers.authorization);
     if(!decodedToken){
        res.status(403).json({"message":"user not authorised",success:false})
     }

   
   let result = await travelGroup.addToTravelGroup(req.params.id,decodedToken.username);
 
   if(!result.success){
     res.status(200).json(result);
   }
   else{
     res.status(201).json(result)
   }

  }catch(error){
   next(error);
  }
})

router.post('/travel-group/chat/:id/send-message',async(req,res,next)=>{
  try{
     let decodedToken = authCheck(req.headers.authorization);
     if(!decodedToken){
        res.status(403).json({"message":"user not authorised",success:false})
     }
    let userObject  = req.body.messageObj;
    let result = await travelGroup.sendMessageToGroup(userObject,req.params.id);
 
   if(!result.success){
     res.status(200).json(result);
   }
   else{
     res.status(201).json(result)
   }

  }catch(error){
   next(error);
  }
})


router.get('/travel-group/chat/:id/get-message',async(req,res,next)=>{
  try{
     let decodedToken = authCheck(req.headers.authorization);
     if(!decodedToken){
        res.status(403).json({"message":"user not authorised",success:false})
     }
 
   let result = await travelGroup.getMessageFromGroup(req.params.id);
   if(!result.success){
     res.status(200).json(result);
   }
   else{
     res.status(201).json(result)
   }

  }catch(error){
   next(error);
  }
})

router.get('/travel-group/members/:id',async(req,res,next)=>{
  try{
     let decodedToken = authCheck(req.headers.authorization);
     if(!decodedToken){
        res.status(403).json({"message":"user not authorised",success:false})
     }
 
   let result = await travelGroup.getGroupMembers(req.params.id);
   if(!result.success){
     res.status(200).json(result);
   }
   else{
     res.status(201).json(result)
   }

  }catch(error){
   next(error);
  }
})


 module.exports = router;
