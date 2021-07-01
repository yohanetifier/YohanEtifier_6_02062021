const express = require('express'); 
const router = express.Router(); 
const Sauces = require('../models/Sauces'); 
const sauceCtrl = require('../controllers/sauces'); 
const auth = require('../middleware/auth'); 
const multer = require('../middleware/mutler-config'); 
const rateLimit = require('express-rate-limit');

// route for sauce

router.post('/', auth, multer, sauceCtrl.createSauce)
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce)
router.get('/', auth, sauceCtrl.getAllSauce)
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.post('/:id/like', auth, sauceCtrl.getLike)

module.exports = router; 

 