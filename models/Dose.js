const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const doseSchema = new Schema(
    {
        ingredient: {
            type: Schema.Types.ObjectId, ref: 'Ingredient',
            required: true
        },
        recipe: {
            type: Schema.Types.ObjectId, ref: 'Recipe',
            required: true
        }
    },
    {
        timestamps: true
    }
)

const Dose = mongoose.model('Dose', doseSchema);

module.exports = Dose;