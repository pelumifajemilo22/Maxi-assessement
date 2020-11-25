const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/Authentication') 
    .then(()=> console.log('connected to mongodb..'))
    .catch(err => console.error('could not connect to mongodb'))

const app = express();
app.use(cors());
require("./Prod/prod")(app)


//middleware
app.use(morgan(`dev`));
app.use(bodyParser.json());


// Routes
app.use('/users', require('./routes/users'))

// start the server
const port = process.env.PORT || 5000; 
app.listen(port);
console.log(`Server listening at ${port}`)            