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
    if(!Sauces.likes){
      Sauces.updateOne({ _id: req.params.id}, {$set: {likes: 1}})
    .then(() => {
      res.status(200).json({ message: 'like'})
      
    })
    .catch(error => res.status(400).json({ error }))
    }else {
      Sauces.updateOne({ _id: req.params.id}, {$inc: {likes: 1}})
    .then(() => res.status(200).json({ message: 'like'}))
    .catch(error => res.status(400).json({ error }))
    }

    
    /* Sauces.findOne({ _id: req.params.id})
    .then((sauce) => {
      sauce.update({ _id: req.params.id}, {$set:{ville: 'lyon'}})
      console.log(sauce)
      return res.status(200).json({ message: 'like'})
    })
    .catch(error => res.status(400).json({ error })) */
    }