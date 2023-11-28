const express=require("express");     // COMMENT: add tabulation like in lines 3-4
const mongoose=require("mongoose");
const bigPromise = require("../middlewares/bigPromise.js");        // COMMENT: Chande to understand the name, use another way to handle the exception. Example: Global Exception Filter
const CustomError = require("../utils/customErrors.js");

const recipesModel=require("../models/recipeModel");
const UserModel=require("../models/userModel");

/** 
    !! GENERAL COMMENTS !!

    COMMENT: Use the module as an object and then send the current module to `module.exports = { ...module }`
        Also, I recommend using `inversify` for creating IoC container for other dependencies

    COMMENT: setup `eslint` for checking the correct code style
    
    COMMENT: Also here we need a layer for validation we can use `class-validator` or `joi`.
    COMMENT: remove this line to separate the code block
**/
// //----------------------------------------------------------------------------------

exports.getAllRecipes=bigPromise(async(req,res,next)=>{             // COMMENT: add space between variables and names  
    const result=await recipesModel.find({});                       // COMMENT: move this logic to service layer
    res.status(200).json(result);
})


// //------------------------------------------------------------------------------------

// COMMENT: How front-end team will know which data needs to be sent for this end-point? Answer: Use OpenAPI to document your API.
// COMMENT: Are all users can add recipes? Provide auth and permission.
exports.createRecipe=bigPromise(async(req,res,next)=>{
    const {name,ingredients,instructions,imageUrl,cookingTime} =req.body;
    const userObjID=req.user._id;
    const userOwner=userObjID.toString();

    //console.log("user ki id: ",userOwner);        // COMMENT: remove comment

    if(!userOwner){                                    
        return next(new CustomError("Please provide user id",400));              // COMMENT: use the validation layer for validation errors.
    }
    if(!name || !ingredients || !instructions || !cookingTime ){
        return next(new CustomError("Please provide all the fields",400));
    }

    //create recipe from model 
    const recipe=new recipesModel(
        {
            _id: new mongoose.Types.ObjectId(), //this is for unique id // we can use uuid also 
            name:name,
            ingredients:ingredients,
            instructions:instructions,
            imageUrl:imageUrl,
            cookingTime:cookingTime,
            userOwner:userOwner
        }   
                                                    /**
                                                        COMMENT: replace object to 
                                                           {
                                                            _id: new mongoose.Types.ObjectId(),
                                                            name,
                                                            ingredients,
                                                            instructions,
                                                            imageUrl,
                                                            cookingTime,
                                                            userOwner,
                                                        }   
                                                    **/
        
    );
    console.log("Recipe is here:", recipe);         // COMMENT: remove console.log(), I recommend using a special tool for logging: `morgan`, `pino `
    
    //save created recipe in DB
    const result=await recipe.save();

    //COMMENT: use 1 way to send a response.
    res.status(201).json({
        createdRecipe: {
            name: result.name,
            imageUrl: result.imageUrl,
            ingredients: result.ingredients,
            instructions: result.instructions,
            userOwner: result.userOwner,
            _id: result._id.toString(),
          },
    });
})



// //------------------------------------------------------------------------------------

// COMMENT: The same comments as for the previous end-point.
exports.getRecipeById=bigPromise(async(req,res,next)=>{
    const{recipeId} =req.params;
    if(!recipeId){
        return next(new CustomError("Please provide recipe id",400));
    }
    const result=await recipesModel.findById({ _id: recipeId });
    if(!result){
        return next(new CustomError("No recipe found with this id",404));
    }
    res.status(200).json(result);
})


// //------------------------------------------------------------------------------------

// COMMENT: The same comments as for the previous end-point.
exports.saveRecipes=bigPromise(async(req,res,next)=>{
    const {recipeId,userId}=req.body;
    if(!recipeId || !userId){
        return next(new CustomError("Please provide recipe id & user id",400));
    }
    const recipe= await recipesModel.findById(recipeId);
    if(!recipe){
        return next(new CustomError("No recipe found with this id",404));
    }
    const user= await UserModel.findById(userId);
    if(!user){
        return next(new CustomError("No user found with this id",404));
    }
    user.savedRecipes.push(recipe);
    await user.save();
    res.status(201).json({savedRecipes: user.savedRecipes});
})


// //------------------------------------------------------------------------------------


// COMMENT: The same comments as for the previous end-point.
exports.getSavedRecipeById=bigPromise(async(req,res,next)=>{
    const {userId}=req.params;
    if(!userId){
        return next(new CustomError("Please provide user id",400));
    }
    const user = await UserModel.findById(userId);
    if(!user){
        return next(new CustomError("No user found with this id",404));
    }
    const savedRecipes = user ? user.savedRecipes : [];
    res.status(201).json({ savedRecipes });
})
  


// //------------------------------------------------------------------------------------

// COMMENT: The same comments as for the previous end-point.
exports.getSavedRecipes=bigPromise(async(req,res,next)=>{
    const {userId}=req.params;
    if(!userId){
        return next(new CustomError("Please provide user id",400));
    }
    const user = await UserModel.findById(userId);
    if(!user){
        return next(new CustomError("No user found with this id",404));
    }
    const savedRecipes = await recipesModel.find({
      _id: { $in: user.savedRecipes },
    });
    console.log(savedRecipes);
    res.status(201).json({ savedRecipes });
})


// //------------------------------------------------------------------------------------

// COMMENT: The same comments as for the previous end-point.
exports.deleteRecipe=bigPromise(async(req,res,next)=>{
    const {recipeId}=req.params;
    if(!recipeId){
        return next(new CustomError("Please provide recipe id",400));
    }
    const result=await recipesModel.findByIdAndDelete(recipeId);
    if(!result){
        return next(new CustomError("No recipe found with this id",404));
    }
    res.status(200).json({message: "Recipe deleted successfully"});
})



// //------------------------------------------------------------------------------------
// COMMENT: The same comments as for the previous end-point.
exports.updateRecipe=bigPromise(async(req,res,next)=>{
    const {recipeId}=req.params;
    const {name,ingredients,instructions,imageUrl,cookingTime}=req.body;
    if(!recipeId){
        return next(new CustomError("Please provide recipe id",400));
    }
    const result=await recipesModel.findByIdAndUpdate(recipeId,{
        name:name,
        ingredients:ingredients,
        instructions:instructions,
        imageUrl:imageUrl,
        cookingTime:cookingTime
    });
    if(!result){
        return next(new CustomError("No recipe found with this id",404));
    }
    res.status(200).json({message: "Recipe updated successfully"});
})
