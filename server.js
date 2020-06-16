var express = require("express")
var app = express(); 
var fs = require("fs")

var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/employees";

app.get("/", function(req, res) {
    res.send("Hello World...")
})

app.get("/employees", function(req, res) {
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
})

app.get("/employees/:name", function(req, res) {
    MongoClient.connect(url, function(err, database) {
        if(err) {
            return
        }
        var myDatabase = database.db("employees");
        var employeeListCollection = myDatabase.collection("employeeList");
        var userName = req.params.name
        employeeListCollection.find({name: userName}).toArray(function(err, result) {
            var employeeList = result;
            database.close();
            res.send(employeeList)
        });
    });
})

app.get("/employees/:name/:age", function(req, res) {
    MongoClient.connect(url, function(err, database) {
        if(err) {
            return
        }
        var myDatabase = database.db("employees");
        var employeeListCollection = myDatabase.collection("employeeList");
        var userName = req.params.name;
        var userAge = req.params.age;
        employeeListCollection.insertOne({name: userName, age: userAge}, function(err, result) {
            alert("Data Inserted...")
        });
    });
})

app.get("/delete/:name", function(req, outResponse) {
    var userName = req.params.name;

    MongoClient.connect(url, function(err, response) {
        if(err) {
            return
        }

        var myDatabase = database.db("employees");
        var employeeListCollection = myDatabase.collection("employeeList");

        employeeListCollection.deleteMany({name: userName}, function(err, res) {
            outResponse.send("<h1>Employee Deleted...</h1>")
        })
    });
})

app.listen(4000)