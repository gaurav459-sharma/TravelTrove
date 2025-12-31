const mongoose = require('mongoose')

// {
//     "destination": "Bali",
//     "duration": "7 days",
//     "activities": ["Surfing", "Snorkeling"],
//     "lodging": "Luxury villa",
//     "dining": "Local cuisine"
// }
  let schema ={};

  schema.TripItnerary = new mongoose.Schema({
    username:{
      type:String,
      required:true
    },
    destinationId: {
      type: String,
      required: true
  },
    destinationName: {
          type: String,
          required: true
      },
      
      duration: {
          type: Number,
          required: true,
      },
      activities: {
          type: [String],
          required: true,
      },
      lodging: {
          type: String,
          required: true,
      },
      dining: {
        type: String,
        required: true,
    },
  
  });
  
  module.exports = schema;