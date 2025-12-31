const express = require('express');
const router = express.Router();
const authCheck = require('../utilities/authUtility')
const trips = require('../model/tripModel')


router.post('/trip-itineraries/:destId',async(req,res,next)=>{
    try{
       let decodedToken = authCheck(req.headers.authorization);
       if(!decodedToken){
          res.status(403).json({"message":"user not authorised",success:false})
       }
 
       let tripData ={...req.body,username: decodedToken.username};
      
     let result = await trips.createTripItnerary(tripData,req.params.destId);

     if(result.success){
   
       res.status(201).json(result);
     }
     else{
       res.status(200).json(result)
     }
 
    }catch(error){
     next(error);
    }
 })

 router.get('/trip-itineraries/my-itenrary',async(req,res,next)=>{
   try{
      let decodedToken = authCheck(req.headers.authorization);
      if(!decodedToken){
         res.status(403).json({"message":"user not authorised",success:false})
      }

   let data = await trips.getMyTripItnerary(decodedToken.id);
 
    res.json(data);

   }catch(error){
    next(error);
   }
})
 
 router.get('/trip-itineraries/my-itenrary/:id',async(req,res,next)=>{
    try{
       let decodedToken = authCheck(req.headers.authorization);
       if(!decodedToken){
          res.status(403).json({"message":"user not authorised",success:false})
       }
 
      
     let data = await trips.getTripItneraryById(req.params.id);
       
      res.status(200).json(data);
 
    }catch(error){
     next(error);
    }
 })


 //admin access
 
 //creation of trip itinerary

 router.put('/trip-itineraries/update/:id',async(req,res,next)=>{
   try{

      let decodedToken = authCheck(req.headers.authorization);
      if(!decodedToken || decodedToken.role!='admin'){
         res.status(403).json({"message":"Admin access required!"})
      }
      let dataToUpdate = req.body;

     
    let data = await trips.updateTripItneraryById(dataToUpdate,req.params.id);
    if(data.success){
      res.status(200).json(data);
    }
    else{
      res.status(400).json(data);

    }

   }catch(error){
    next(error);
   }
})
 
//deletion of trip-itenary
router.delete('/trip-itineraries/delete/:id',async(req,res,next)=>{
   try{

      let decodedToken = authCheck(req.headers.authorization);
      if(!decodedToken || decodedToken.role!='admin'){
         res.status(403).json({"message":"Admin access required!"})
      }
      
    let data = await trips.deleteTripItneraryById(req.params.id);
    if(data.success){
      res.status(200).json(data);
    }
    else{
      res.status(400).json(data);

    }

   }catch(error){
    next(error);
   }
})

 module.exports = router;