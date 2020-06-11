var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/employees";

MongoClient.connect(url, function(err, database) {
    console.log("Database Created Successfully...")

    if(err) {
        console.log("Error Connection database...")
        return
    }

    var myDatabase = database.db("employees");
    myDatabase.createCollection("employeeList", function(err, res) {
        if(err) {
            console.log("Error Creating Collection");
            return;
        }

        var employeeListCollection = myDatabase.collection("employeeList")  
        employeeListCollection.insertOne({
            name: "Meha",
            age: 100
        }, function(err, success) {
            if(err) {
                console.log("Error Creating/ Adding Document");
                return;
            }

            employeeListCollection.find({name: "Anshul"}).toArray(function(err, result) {
                console.dir(result)

                employeeListCollection.deleteMany({ name: "Meha Xyz"}, function(err, obj) {
                    console.log("Object Deleted...")
                   
                })

                employeeListCollection.updateOne({name: "Meha"}, { $set: {age: "1000"} }, function(err, result) {
                    database.close();
                })

            })
            console.log("Document Added to database collection...");
            
        })
    })
})