const bodyParser = require('body-parser');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');

mongoose.connect(process.env.MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, err => {
        if (err) throw err;
        console.log('Connected to MongoDB!!!')
    });

require('./api/models/person');
require('./api/models/address');

const app = express();
 
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const personRoutes = require('./api/routes/persons');
const addressRoutes = require('./api/routes/address');

app.use('/persons', personRoutes);
app.use('/address', addressRoutes);

let swaggerSpec = require('./api/config/swagger');
app.use('/api-docs', swaggerUi.serve, 
         swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
    res.send('A simple Node App is '
        + 'running on this server')
    res.end()
})
 
const PORT = 5000;
 
app.listen(PORT,console.log(
  `Server started on port ${PORT}`));

module.exports = app;