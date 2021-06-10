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
      /* for (let i = 0; i < sauce.usersLiked.length; i++) {

        if (sauce.usersLiked[i] === req.body.userId) {
            Sauces.updateOne({ _id: req.params.id}, {$pull: { usersLiked : req.body.userId}})
          .then(() => res.status(200).json({ message:"drop"}))
          .catch(error => res.status(400).json({ error }))
        }
      } */

      /* for (let i = 0; i < sauce.usersDisLiked.length; i++) {

        if (sauce.usersDisliked[i] === req.body.userId) {
          if (req.body.like === 0){
            Sauces.updateOne({ _id: req.params.id}, {$pull: { usersDisliked : req.body.userId}})
          .then(() => res.status(200).json({ message:"drop"}))
          .catch(error => res.status(400).json({ error }))
          }
        }
      } */

      if (req.body.like === 1){
        if (!sauce.likes){
          Sauces.updateOne({ _id: req.params.id}, {$set: {likes: 1}})
        .then(() => res.status(200).json({ message:"first like"}))
        .catch(error => res.status(400).json({ error }))
        sauce.usersLiked.push(req.body.userId)
        }else {
          Sauces.updateOne({ _id: req.params.id}, {$inc: {likes: 1}})
        .then(() => res.status(200).json({ message:"others like"}))
        .catch(error => res.status(400).json({ error }))
        sauce.usersLiked.push(req.body.userId)
        }
      }

      if (req.body.like === -1){
        if(!sauce.dislikes){
          Sauces.updateOne({ _id: req.params.id}, {$set: {dislikes: 1}})
        .then(() => res.status(200).json({ message:"first dislike"}))
        .catch(error => res.status(400).json({ error }))
        }else {
          Sauces.updateOne({ _id: req.params.id}, {$inc: {dislikes: 1}})
          .then(() => res.status(200).json({ message:"others dislike"}))
          .catch(error => res.status(400).json({ error }))
        }
      }

      if (req.body.like === 0){

        for ( let i = 0; i < sauce.usersLiked; i++){

          if (sauce.likes && req.body.userId === sauce.usersLiked[i]){
            Sauces.updateOne({ _id: req.params.id}, {$inc: {likes: -1}})
            .then(() => res.status(200).json({ message : "undo like"}))
            .catch(error => res.status(400).json({ error }))
        }
        
          if(sauce.dislikes && req.body.userId === sauce.usersDisliked[i]){
            Sauces.updateOne({ _id: req.params.id}, {$inc: {dislikes: -1}})
            .then(() => res.status(200).json({ message : 'undo unlike'}))
            .catch(error => res.status(400).json({ error }))
        }
        }
        
      }

      res.status(200).json({ message: "good"})
    }).catch(error => res.status(400).json({ error }))

    /* if (!sauce.usersDisliked){
        Sauces.updateOne({ _id: req.params.id}, {$set: {dislikes: 1}})
        .then(() => res.status(200).json({ message:"first like"}))
        .catch(error => res.status(400).json({ error }))
        sauce.usersLiked.push(req.body.userId)
        console.log(sauce)
      }else {
        Sauces.updateOne({ _id: req.params.id}, {$inc: {likes: 1}})
        .then(() => res.status(200).json({ message: "like"}))
        .catch(error => res.status(400).json({ error }))
        sauce.usersLiked.push(req.body.userId);
        console.log(sauce);
        console.log(req.body)
      } */
    
    /* Sauces.findOne({ _id: req.params.id})
    .then((sauce) => {
      sauce.update({ _id: req.params.id}, {$set:{ville: 'lyon'}})
      console.log(sauce)
      return res.status(200).json({ message: 'like'})
    })
    .catch(error => res.status(400).json({ error })) */

     /* if (sauce.usersLiked){
        Sauces.updateOne({ _id: req.params.id}, {$inc: {likes: 1}})
        .then(() => res.status(200).json({ message: "like"}))
        .catch(error => res.status(400).json({ error }))
        sauce.usersLiked.push(req.body.userId)
        console.log(sauce)
      } */
    }