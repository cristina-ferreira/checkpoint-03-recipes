const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ingredientSchema = new Schema(
    {
        name: {
            type: String,
            isRequired: true,
        },
    },
    {
        timestamps: true
    }
)

const Ingredient = mongoose.model('Ingredient', ingredientSchema);

module.exports = Ingredient;
  