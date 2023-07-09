const express= require("express");
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const cors=require('cors');

const dotenv=require('dotenv');
dotenv.config();

const app=express();


//middlewares
app.use(cors()); //to allow cross origin requests
app.use(express.json()); // Parse JSON bodies for API endpoints
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies for HTML form submissions
app.use(bodyParser.json()); // Parse JSON bodies for API endpoints
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies for HTML form submissions


//routes
const userRoutes=require("./routes/userRoute.js");
app.use("/auth",userRoutes);
const recipeRoutes=require("./routes/recipeRoute.js");
app.use("/api",recipeRoutes);


const port=process.env.PORT || 7000;


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  }
)


//----------------------------------------------------------------------------------------------------
//DB connection

DB_USERNAME=process.env.DB_USERNAME;
DB_PASSWORD=process.env.DB_PASSWORD;

const db_link=`mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.sx34siv.mongodb.net/?retryWrites=true&w=majority`;


mongoose
.connect( db_link, { useNewUrlParser: true, useUnifiedTopology: true })
.then(function(db){
    console.log("__ DB CONNECTED __");
})
.catch(function(err){
    console.log(err);
})

//----------------------------------------------------------------------------------------------------




