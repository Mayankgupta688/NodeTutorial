var express = require("express");
var fs = require("fs");
var bodyParser = require("body-parser");
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/employees";

var app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    next();
    });

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get("/employees", function(req, res) {

    res.header("Access-Control-Allow-Origin", "*")

    MongoClient.connect(url, function(err, database) {
        if(err) {
            return
        }
        var myDatabase = database.db("employees");
        var employeeListCollection = myDatabase.collection("employeeList");

        employeeListCollection.find({}).toArray(function(err, result) {
            var employeeList = result;
            res.send(employeeList)
        });
    });
});

app.post("/addemployees", function(req, res) {

    MongoClient.connect(url, function(err, database) {
        if(err) {
            return
        }
        var myDatabase = database.db("employees");
        var employeeListCollection = myDatabase.collection("employeeList");

        employeeListCollection.insertOne({name: req.body.userName, id: req.body.userId, avatar: req.body.userAvatar, createdAt: req.body.userCreatedAt}, function(err, result) {
            database.close()
            res.send("Data Inserted...")
        });
    });
    
})


app.listen(8000)