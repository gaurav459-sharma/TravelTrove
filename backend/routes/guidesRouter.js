const express = require('express');
const router = express.Router();
const destination = require('../model/guidesModel')
const authCheck = require('../utilities/authUtility')
const upload  =require('../utilities/uploadMiddleware')

router.get('/destination-guide',async(req,res,next)=>{
   try{
    let result = await destination.getGuides();
    if(result.success){
      res.status(200).json(result);
    }
    else{
      res.status(400).json(result);
    }
   }catch(error){
    next(error);
   }
})

router.get('/destination-guide/:id',async(req,res,next)=>{
   try{
    let result = await destination.getDestinationById(req.params.id);
    if(result.success){
      res.status(200).json(result);
    }
    else{
      res.status(400).json(result);
    }

   }catch(error){
    next(error);
   }
})

router.post('/destination-guide/search',async(req,res,next)=>{
   try{
    let result = await destination.searchGuidesByName(req.body.name)
    if(result.success){
    res.status(200).json(result);
    }
    else{
      res.status(200).json(result)
    }
   }catch(error){
    next(error);
   }
})

//set reviews

router.post('/user/destination-guide/:id/add-review',async(req,res,next)=>{
    try{
      let decodedToken = authCheck(req.headers.authorization);
      if(!decodedToken){
        res.status(403).json({"message":"user not authorised",success:false})
      }

      let review = req.body;
      review.username = decodedToken.username;
      review.destinationId = req.params.id;

    let result = await destination.setReviews(review);

    if(result.success){
      res.status(200).json(result)
    }
    else{
      res.status(400).json(result);
    }

  }catch(error){
    next(error);
  }
})
//user favourites

router.post('/user/destination-guide/:id/favourites',async(req,res,next)=>{
   try{
      let decodedToken = authCheck(req.headers.authorization);
      if(!decodedToken){
         res.status(403).json({"message":"user not authorised",success:false})
      }
  
    let result = await destination.addToFavourite(decodedToken.username,req.params.id);
  
    if(result.success){
      res.status(200).json(result)
    }
    else{
      res.status(404).json(result);
    }
  
   }catch(error){
    next(error);
   }

})

router.get('/user/destination-guide/favourites',async(req,res,next)=>{
   try{
      let decodedToken = authCheck(req.headers.authorization);
      if(!decodedToken){
         res.status(403).json({"message":"user not authorised",success:false})
      }
      
    let result = await destination.getFavourites(decodedToken.id);
    if(result.success){
      res.status(200).json(result)
    }
    else{
      res.status(200).json(result)
    }
   
   }catch(error){
      next(error);
   }
})

router.delete('/user/destination-guide/:id/favourites',async(req,res,next)=>{
   try{
      let decodedToken = authCheck(req.headers.authorization);
      if(!decodedToken){
         res.status(403).json({"message":"user not authorised"})
      }
      else{
          let deleted = await destination.deleteFavourite(decodedToken.username,req.params.id);
    
          if(deleted.success){
            res.status(200).json(deleted)
          }
          else{
            res.status(400).json(deleted)
          }
      }

   }catch(error){
    next(error);
   }
})

//admin access

//creation of destination guide
router.post('/destination-guide/create',upload.array('photos',5),async(req,res,next)=>{
  try{

    let decodedToken = authCheck(req.headers.authorization);
    if(!decodedToken || decodedToken.role!='admin'){
       res.status(403).json({"message":"Admin access required!"})
    }
    //get photo path form upload files
    const photoPaths = req.files? req.files.map(file=> `/uploads/${file.filename}`):[];
    let destinationGuide = {...req.body, photos:photoPaths};

    let result = await destination.createDestinationGuide(destinationGuide)
  
   if(result.success){
     res.status(200).json(result);
   }
   else{
     res.status(201).json(result);
   }
  }catch(error){
   next(error);
  }
})

//updation of destination route
router.put('/destination-guide/update/:id',upload.array('photos',5),async(req,res,next)=>{
  try{

    let decodedToken = authCheck(req.headers.authorization);
    if(!decodedToken || decodedToken.role!='admin'){
       res.status(403).json({"message":"Admin access required!"})
    }
     //get photo path form upload files
    const photoPaths = req.files? req.files.map(file=> `/uploads/${file.filename}`):[];
    let destinationGuide = {...req.body, photos:photoPaths};
    let result = await destination.updateDestinationGuide(destinationGuide,req.params.id)
  
   if(result.success){
     res.status(200).json(result);
   }
   else{
     res.status(400).json(result);
   }
  }catch(error){
   next(error);
  }
})

//deletion of destination guide
router.delete('/destination-guide/delete/:id',async(req,res,next)=>{
  try{

    let decodedToken = authCheck(req.headers.authorization);
    if(!decodedToken || decodedToken.role!='admin'){
       res.status(403).json({"message":"Admin access required!"})
    }
  
  
    let result = await destination.deleteDestinationGuide(req.params.id)
  
   if(result.success){
     res.status(200).json(result);
   }
   else{

     res.status(403).json(result);
   }
  }catch(error){
   next(error);
  }
})



module.exports = router