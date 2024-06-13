let dotenv = require('dotenv').config()
const express = require("express");
const app = express();
var server = require('http').Server(app)
app.set('view engine', 'ejs');
app.use(express.static('public'))
const chatRoute =  require("./routes/imageRoute");
var bodyParser = require('body-parser')
const path = require('path');
app.use(express.static(path.join(__dirname, 'build')));
const cors = require('cors');

app.use(cors({
    origin: ['http://localhost:5000','http://localhost:3000','http://192.168.2.137:3000']
}));

// parse various different custom JSON types as JSON
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({ type: 'application/json' }))

app.use(chatRoute)


server.listen(dotenv.parsed.PORT, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", dotenv.parsed.PORT);
})


