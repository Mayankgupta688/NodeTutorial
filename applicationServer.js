 var express = require("express");
 var fs = require("fs");
 var bodyParser = require("body-parser");
const { BSONType } = require("mongodb");

 var app = express();

 app.use(bodyParser.json())
 app.use(bodyParser.urlencoded({extended: true}))

app.use(function(req, res, next) {
    if(req.originalUrl == "/") {
        return next();
    } else if(req.originalUrl == "/postdata") {
        if(req.body.userName == "Mayank") {
            res.send("Cannot Process")
        } else {
            return next();
        }
    }
})

 app.get("/", function(req, res) {
     fs.readFile("./template/index.html", function(err, data) {
         res.send(data.toString());
     })
 });

 app.post("/postdata", function(req, res) {
     res.send("Data Updated...")
 })

 app.post("/postother", function(req, res) {
     res.send("Other Data Added...")
 })

 app.listen(8000)