const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
    name : {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})
const User = mongoose.model('user', UserSchema);  //create a copy of model by calling model function of mongoose and passing UserSchema as the Schema or outlay of our; and user is just a name given to the collection of our schema
module.exports = User;