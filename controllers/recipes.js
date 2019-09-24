const Recipe = require("../models/Recipe");
const Dose = require("../models/Dose");


const createRecipe = (req, res) => {
    Recipe.find({ name: req.body.name }, (error,foundRecipes) => {
        if (error) {
            return res.render("error", {error: error});
        }
        if (foundRecipes.length !== 0) {
            return res.render("recipe-new", { message: `${foundRecipes[0].name} Recipe already exists`});
        }
        Recipe.create(req.body, (err, createdRecipe) => {
            if (err) {
                // send the error from db to the view error.pug
                res.render("error", {error: err});
            }
            //creating doses
            const doses = req.body.ingredients.map(ingredient =>{
                return {
                    recipe: createdRecipe._id,
                    ingredient
                };
            })
            Dose.create(doses, (er) => {
                if(er) {
                    res.render('error',{error: er});
                }
                return res.redirect("/");
            });
        })
    }) 
}

const showRecipe = (req, res, next) => {
    Recipe.findById(req.params.id, (err, foundRecipe) => {
        if (err) {
            res.render("error", {error: err});
        }
        const promise = Dose.populate(
            req.doses,
            [{ path: 'ingredient' }]
        );

        promise.then(populatedDoses => {
            res.render(
                'recipe',
                { recipe: foundRecipe, doses: populatedDoses }
            );
        })

    });
 };

const showRecipes = (req, res, next) => {
    Recipe.find({}, (err, foundRecipes) => {
        if (err) {
            res.render("error", {error: err});
        }
        res.render('recipes-list', {recipes: foundRecipes});
    });
 };

 const deleteRecipe = (req, res, next) => {
     Recipe.deleteOne({_id: req.params.id}, (err) => {
         if (err) {
            res.render("error", {error: err, message: "Recipe not deleted."});
         }
         return res.redirect("/");
     })
 }

module.exports = { createRecipe, showRecipes, showRecipe, deleteRecipe };
