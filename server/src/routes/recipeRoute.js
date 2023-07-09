const express=require("express");
const router=express.Router();

const {verifyToken} =require("../controller/userController.js");
const {getAllRecipes, createRecipe, getRecipeById, saveRecipes, getIdOfSavedRecipe, getSavedRecipes }=require("../controller/recipeController.js");

router.get("/", getAllRecipes);  //homePage router to show all recipes
router.post("/", verifyToken ,createRecipe);
router.get("/:recipeId",getRecipeById);
router.put("/", saveRecipes);
router.get("/savedRecipes/ids/:userId",getIdOfSavedRecipe);
router.get("/savedRecipes/:userId", getSavedRecipes);


module.exports =router;
