require('dotenv').config();

let bodyParser = require('body-parser');
let express = require('express');
let app = express();

app.use(function (req, res, next) {
    console.log(req.method + " " + req.path + " - " + req.ip);
    next();
});

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/views/index.html");
});

app.use("/public", express.static(__dirname + "/public"))

app.get("/json", function (req, res) {
    let responseMessage = "Hello json";
    if (process.env.MESSAGE_STYLE == "uppercase"){
        responseMessage = responseMessage.toUpperCase();    
    }
    res.json({"message": responseMessage})
});

app.get('/now', 
    function (req, res, next) {
        req.time = new Date().toString();
        next();
    },
    function (req, res){
        res.send({time: req.time});
    }
);

app.get("/:word/echo",
    function(req, res) {
        res.send({echo: req.params.word});
    }
);

app.use("/name", bodyParser.urlencoded({extended: false}));

app.post("/name",
    function(req, res) {
        res.send({name: req.body.first + " " + req.body.last});
    }
);


app.get("/name",
    function(req, res) {
        res.send({name: req.query.first + " " + req.query.last});
    }
);

console.log("Hello World");



 module.exports = app;
