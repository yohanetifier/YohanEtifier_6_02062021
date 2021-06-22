const Sauces = require('../models/Sauces'); 
const fs = require('fs')

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce); 
    delete sauceObject._id
    const sauce = new Sauces({
      ...sauceObject, 
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` 
    })
    sauce.save()
    .then(() => res.status(201).json(sauce))
    .catch(error => res.status(400).json({ error }))
  }; 

  exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ? {
      ...JSON.parse(req.body.sauce), 
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` 
     } : { ...req.body}
    Sauces.updateOne({ _id: req.params.id}, {...sauceObject, _id: req.params.id})
    .then(() => res.status(200).json({ message : 'Objet mis à jour'}))
    .catch(error => res.status(400).json({ error }))
  }

  exports.deleteSauce = (req, res, next) => {
    Sauces.findOne({ _id: req.params.id})
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1]; 
      fs.unlink(`images/${filename}`, () => {
        Sauces.deleteOne({ _id: req.params.id})
    .then(() => res.status(200).json({ messsage: 'Objet supprimé'}))
    .catch(error => res.status(404).json({ error }))
      })
    })
    .catch(error => res.status(500).json({ error }))
  }
  
  exports.getAllSauce = (req, res, next) => {
    Sauces.find()
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(400).json({ error }))
  }

  exports.getOneSauce = (req, res, next) => {
    Sauces.findOne({_id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }))
  }

  exports.getLike = (req, res, next) => {

    Sauces.findOne({ _id: req.params.id})
    .then((sauce) => {
      const like = sauce.usersLiked.length; 

      if (req.body.like === 1){
        if (!sauce.likes){
          Sauces.updateOne({ _id: req.params.id}, {$set: {likes: 1}})
        .then(() => res.status(200).json({ message: 'first like'}))
        .catch(error => res.status(400).json({ error }))
          Sauces.updateOne({ _id: req.params.id}, {$push: {usersLiked: req.body.userId}})
        .then(() => res.status(200).json({ message: "in the array of likes"}))
        .catch(error => res.status(400).json({ error }))
        
        }else {
          Sauces.updateOne({ _id: req.params.id}, {$push: {usersLiked: req.body.userId}})
        .then(() => res.status(200).json({ message:"others like"}))
        .catch(error => res.status(400).json({ error }))
        Sauces.updateOne({ _id: req.params.id}, {$inc: {likes: 1}})
        .then(() => res.status(200).json({ message:"others like"}))
        .catch(error => res.status(400).json({ error }))

        }
      }
      

       if(req.body.like === 0){
         for (let i = 0; i < sauce.usersLiked.length; i++){
           if (req.body.userId === sauce.usersLiked[i]){
            Sauces.updateOne({ _id: req.params.id}, {$pull: {usersLiked: req.body.userId}})
            .then(() => res.status(200).json({ message:"out of the array of likes"}))
            .catch(error => res.status(400).json({ error }))
            Sauces.updateOne({ _id: req.params.id}, {$inc: {likes: -1}})
            .then(() => res.status(200).json({ message: 'first like'}))
            .catch(error => res.status(400).json({ error }))
           }
          }
           for (let j = 0; j < sauce.usersDisliked.length; j++){
            if (req.body.userId === sauce.usersDisliked[j]){
              Sauces.updateOne({ _id: req.params.id}, {$pull: {usersDisliked: req.body.userId}})
              .then(() => res.status(200).json({ message:"out of the array of likes"}))
              .catch(error => res.status(400).json({ error }))
              Sauces.updateOne({ _id: req.params.id}, {$inc: {dislikes: -1}})
              .then(() => res.status(200).json({ message: 'first like'}))
              .catch(error => res.status(400).json({ error }))
           }
           }
          }

      if (req.body.like === -1){
        if (!sauce.dislikes){
          Sauces.updateOne({ _id: req.params.id}, {$push: {usersDisliked: req.body.userId}})
        .then(() => res.status(200).json({ message:"in the array of dislikes"}))
        .catch(error => res.status(400).json({ error }))
        Sauces.updateOne({ _id: req.params.id}, {$set: {dislikes: 1}})
        .then(() => res.status(200).json({ message: 'first like'}))
        .catch(error => res.status(400).json({ error }))
        }else {
          Sauces.updateOne({ _id: req.params.id}, {$inc: {dislikes: 1}})
        .then(() => res.status(200).json({ message:"others like"}))
        .catch(error => res.status(400).json({ error }))

        }
      }
      res.status(200).json({ message: "Le like a bien été comptabilisé" })
    }).catch(error => res.status(400).json({ error }))

    }

   

    