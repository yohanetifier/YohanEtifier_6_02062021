const mongoose = require('mongoose'); 

// model for one sauce

const saucesSchema = mongoose.Schema({
    userId: {type: String, required: true}, 
    name: {type: String, required: true},
    manufacturer: {type: String, required: true},
    description: {type: String, required: true},
    mainPepper: {type: String, required: true},
    imageUrl: {type: String, required: true},
    heat: {type: Number, required: true},
    likes: {type: Number, default: ""},
    dislikes: {type: Number, default: ""},
    usersLiked: {type: [String], required: true},
    usersDisliked: {type: [String], required: true},
});

module.exports = mongoose.model('Sauces', saucesSchema); 