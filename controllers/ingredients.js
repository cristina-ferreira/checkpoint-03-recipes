const Ingredient = require("../models/Ingredient");

const createIngredient = (req, res) => {
    // get ingredients data from form
    // save to db
    // redirect to ingredients
    Ingredient.find({ name: req.body.name }, (error,foundIngredients) => {
        if (error) {
            return res.render("error", {error: error});
        }
        if (foundIngredients.length !== 0) {
            return res.render("ingredient-new", { message: `${foundIngredients[0].name} already exists, loser!`});
        }
        Ingredient.create([req.body], (err, createdIngs) => {
            if (err) {
                // send the error from db to the view error.pug
                res.render("error", {error: err});
            }
            return res.redirect("/ingredients");
        })
    }) 
}

const showIngredients = (req, res, next) => {
    Ingredient.find({}, (err, foundIngredients) => {
        if (err) {
            res.render("error", {error: err});
        }
        res.render('ingredients-list', {ingredients: foundIngredients});
    });
 };

const deleteIngredient = (req, res, next) => {
    Ingredient.deleteOne({_id: req.params.id}, (err) => {
        if (err) {
        res.render("error", {error: err, message: "Ingredient not deleted."});
        }
        return res.redirect("/ingredients");
    })
}

const getAllIngredients = (req, res, next) => {
    Ingredient.find({}, (err, foundIngredients) => {
        if (err) {
            res.render("error", {error: err});
        }
        req.ingredients = foundIngredients;
        next();
    });
};

module.exports = { createIngredient, showIngredients, deleteIngredient, getAllIngredients };
