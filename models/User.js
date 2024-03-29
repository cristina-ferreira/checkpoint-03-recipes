const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        isRequired: true,
    },
    password: {
        type: String,
        isRequired: true,
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
  