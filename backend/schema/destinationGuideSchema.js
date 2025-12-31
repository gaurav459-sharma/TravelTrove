const mongoose = require('mongoose')
const {User} = require('../schema/authSchema');
let schema ={};

schema.destinationGuideSchema = new mongoose.Schema({
    destinationName: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true,
        minlength: 10
    },
    photos: {
        type: [String],
        required: true
    },


});

schema.reviewSchema = new mongoose.Schema({
    username: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
    destinationId: { type: String },
})


  
const destinations = [
    {
        "destinationName":"Bali",
        "title": "Bali Destination Guide",
      
        "summary": "Discover the enchanting landscapes, vibrant culture, and stunning beaches of Bali with our detailed and informative guide. Perfect for travelers seeking adventure and relaxation alike.",
        "photos": ["/uploads/bali.jpg", "/uploads/peace.jpg"],
        "review": []

    },
    {
        "destinationName":"Paris",
        "title": "Paris Destination Guide",
        "summary": "Discover the magic of Paris, the City of Lights. Explore its iconic landmarks, rich history, and romantic ambiance with our comprehensive guide. Perfect for travelers seeking culture, art, and unforgettable experiences",
        "photos": ["/uploads/paris1.jpg", "/uploads/paris2.jpg","/uploads/london.jpg"],
        "review": []
    },
    {
        "destinationName":"Bangkok",
        "title": "Bangkok Destination Guide",
        "summary": "Discover the magic of Bangkok, the City of Love. Explore its vibrant street life, ornate shrines, and bustling markets with our comprehensive guide. Perfect for travelers seeking a mix of tradition and modernity.",
        "photos": ["/uploads/bangkok2.jpg", "/uploads/bangkok1.jpg","/uploads/bangkok3.jpg"],
        "review": []
    },
    {
        "destinationName":"Greek",
        "title": "Greek Destination Guide",
        "summary": "Discover the magic of Greece, a land of ancient history and breathtaking landscapes. Explore its iconic ruins, stunning islands, and rich cultural heritage with our comprehensive guide. Perfect for travelers seeking history, beauty, and adventure.",
        "photos": ["/uploads/itinerary.jpg", "/uploads/guywithbag.jpg"],
        "review": []
    },
    {
        "destinationName":"Goa",
        "title": "Goa Destination Guide",
        "summary": "Discover the magic of Goa, the City of love.",
        "photos": ["/uploads/cycle.jpg", "/uploads/guywithbag.jpg"],
        "review": []
    },
    {
        "destinationName":"Ooty",
        "title": "Ooty Destination Guide",
        "summary": "Discover the magic of ooty, the City of emotions.",
        "photos": ["/uploads/mm.jpg", "/uploads/bali.jpg"],
        "review": []
    }
]

schema.setupDb = async () => {

    let destModel =mongoose.model('destinationGuides' , schema.destinationGuideSchema)
    await destModel.deleteMany();
    let result = await destModel.insertMany(destinations);

    

    if (result) {
        return "Insertion successful"
    }
    else {
        let err = new Error("Insertion failed");
        err.status = 400;
        throw err;
    }


}


module.exports=schema;