const mongoose=require("mongoose");

const recipeSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    //as we can have multiple ingredients //we will take array
    ingredients:[
        {
            type:String,
            required:true
        }
    ],
    instructions:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    cookingTime:{
        type:Number,
        required:true
    },
    //to keep track of owner who created recipe
    userOwner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }

})

module.exports=mongoose.model("Recipes", recipeSchema);