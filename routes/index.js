const express = require('express');
const router = express.Router();
const { createIngredient, showIngredients, deleteIngredient, getAllIngredients } = require("../controllers/ingredients")
const { createRecipe, showRecipe, showRecipes, deleteRecipe } = require("../controllers/recipes")
const { getDoses } = require("../controllers/doses")
/* GET home page. */
router.get('/', showRecipes);

router.get('/recipes/new', getAllIngredients, (req, res, next) => {
  res.render('recipe-new', { ingredients: req.ingredients });
});

router.post('/recipes/new', createRecipe);

router.get('/recipe/:id', getDoses ,showRecipe)
router.get('/recipe/:id/delete', deleteRecipe)

router.get('/ingredients/new', (req, res, next) => {
  res.render('ingredient-new');
})

router.post('/ingredients/new', createIngredient);

router.get('/ingredients', showIngredients);

router.get('/ingredient/:id/delete', deleteIngredient)



module.exports = router;
