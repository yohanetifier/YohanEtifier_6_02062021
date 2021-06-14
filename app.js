const express = require('express');
const mongoose = require('mongoose'); 
const bodyParser = require('body-parser');
const saucesRoutes = require('./routes/sauces'); 
const userRoutes = require('./routes/user'); 
const path = require('path'); 
const session = require('cookie-session'); 
const helmet = require('helmet'); 
const express_enforces_ssl = require('express-enforces-ssl');
const cors = require('cors');



mongoose.connect('mongodb+srv://yohan:Eti300508@cluster0.dxnkf.mongodb.net/SoPekockoDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true, 
    'useCreateIndex': true})
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  const app = express(); 

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next()
  })

  app.use(bodyParser.json());

  app.use('/images', express.static(path.join(__dirname, 'images')))
  app.use('/api/sauces',saucesRoutes); 
  app.use('/api/auth', userRoutes)

  var expiryDate = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

app.use(session({
  name: 'toto',
  keys: ['key1', 'key2'],
  cookie: {
    secure: true,
    httpOnly: true,
    path: 'api/auth',
    expires: expiryDate
  }}));

  app.use(helmet.xssFilter());
  app.use(helmet.frameguard({ action: 'deny' }));
  app.use(helmet.noSniff());
  app.use(express_enforces_ssl());
  app.use(cors());
  


  
module.exports = app; 