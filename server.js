const express = require('express');

const path = require('path');
const port = process.env.PORT || 80;
const app = express();
var bodyParser = require('body-parser')
const apiRoute = require('./src/route/api');

// mongodb
const mongoose = require('mongoose');
const dbName = "dbCarbo"
const usrName = "Mike"
const usrPswd = "12345"
mongoURL = `mongodb+srv://${usrName}:${usrPswd}@cluster0-snwtj.mongodb.net/${dbName}?retryWrites=true&w=majority`
// mongoURL = "mongodb+srv://Toby0106:dbforcardbo@cluster0-gfwld.mongodb.net/cardbo-db?retryWrites=true&w=majority"
mongoose.connect(mongoURL, {useNewUrlParser: true});
db = mongoose.connection;
db.on('error', e => {
	console.log(e);
})
db.once('open', () => {
	console.log('MongoDB connected!');
})

app.use(bodyParser.json())
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
app.use('/api', apiRoute);


app.get('/ping', function (req, res) {
  return res.send('pong');
});

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port);

