const express = require('express');
const mongoose = require('mongoose'); 
const bodyParser = require('body-parser');
const saucesRoutes = require('./routes/sauces'); 
const userRoutes = require('./routes/user'); 
const path = require('path'); 
const helmet = require('helmet'); 
require('dotenv').config();

mongoose.connect(`mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.dxnkf.mongodb.net/SoPekockoDatabase?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true, 
    'useCreateIndex': true})
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express(); 

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:4200');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next()
  })

app.use(bodyParser.json());


app.use('/images', express.static(path.join(__dirname, 'images')))
app.use('/api/sauces',saucesRoutes); 
app.use('/api/auth', userRoutes)

app.use(helmet()); 

  
 
module.exports = app; 