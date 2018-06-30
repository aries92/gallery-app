require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logger = require('morgan');
const router = require('./routes/picture.route');
const cors = require('cors');
const path = require('path');
const app = express();

const port = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(logger('dev'));

app.use(cors())

// configure app
app.use(logger('dev'));
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit: 50000}));

// connect to database
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URL, error => {
    if (error) console.log(error);
});

// const db = mongoose.connection;
// const testData = require('./test.data');
// db.collection('pictures').insert(testData);

app.get('/api/favicon.ico', (req, res) => res.status(204));

app.use('/api', router);

app.use(express.static(path.join(__dirname, 'build')));

// catch 404
app.use((req, res, next) => {
    res.status(404).send('<h2 align=center>Page Not Found!</h2>');
});

// start the app
app.listen(port, () => {
    console.log(`App Server Listening at ${port}`);
});
