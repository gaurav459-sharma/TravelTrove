const express = require('express');
const connectDB = require('./config/db')
const cors = require('cors');
require('dotenv').config();
const router = require('./routes/auth');
const guidesRouter = require('./routes/guidesRouter')
const tripRouter = require('./routes/tripRouter')
const travelGroupRouter = require('./routes/travelGroupRouter')

const schema = require('./schema/destinationGuideSchema');
const requestLogger  = require('./utilities/requestLogger');
const errorLogger = require('./utilities/errorLogger');
const {setAdmin} = require('./schema/authSchema')
const path  =require('path');

const app = express();
app.use(express.json());
app.use(cors());

app.use(requestLogger)
//connect to db
connectDB();
app.get('/setupDb',async (req,res,next)=>{
    try{
        await setAdmin()
        let data = await schema.setupDb();
        res.send(data);
    }catch(error){
        next(error);
    }
})

app.use('/uploads', express.static(path.join(__dirname,'assets/uploads')))

app.use('/api/auth', router);
app.use('/' , guidesRouter)
app.use('/' , tripRouter)
app.use('/' , travelGroupRouter)



app.use(errorLogger)
app.get('/',(req,res)=>{
    res.send('API is running..');
});

app.listen(3000,()=> console.log("server is running on port 3000"));
