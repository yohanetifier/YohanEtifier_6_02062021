const express = require('express'); 
const router = express.Router(); 
const Sauces = require('../models/Sauces'); 

const sauceCtrl = require('../controllers/sauces')

router.post('/', sauceCtrl.createSauce)
router.put('/:id', sauceCtrl.modifySauce);
router.delete('/:id', sauceCtrl.deleteSauce)
router.get('/', sauceCtrl.getAllSauce)
router.get('/:id', sauceCtrl.getOneSauce);

module.exports = router; 

 