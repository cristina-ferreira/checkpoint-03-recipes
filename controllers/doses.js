const Dose = require("../models/Dose");

const getDoses = (req, res, next) => {
    // in Doses table the id of th recipe is stored in recipe,
    // not recipe_id.
    Dose.find({recipe: req.params.id}, (error, foundDoses)=>{
        if(error) res.render('error', {error});
        req.doses = foundDoses;
        next();
    })
}

module.exports = { getDoses };