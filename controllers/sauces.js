const Sauces = require('../models/Sauces'); 

exports.createSauce = (req, res, next) => {
    delete req.body._id
    const sauce = new Sauces({
      ...req.body
    })
    sauce.save()
    .then(() => res.status(201).json(sauce))
    .catch(error => res.status(400).json({ error }))
  }; 

  exports.modifySauce = (req, res, next) => {
    Sauces.updateOne({ _id: req.params.id}, {...req.body._id, _id: req.params.id})
    .then(() => res.status(200).json({ message : 'Objet mis à jour'}))
    .catch(error => res.status(400).json({ error }))
  }

  exports.deleteSauce = (req, res, next) => {
    Sauces.deleteOne({ _id: req.params.id})
    .then(() => res.status(200).json({ messsage: 'Objet supprimé'}))
    .catch(error => res.status(404).json({ error }))
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