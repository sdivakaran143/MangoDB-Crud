const express=require("express");
const exp=express()
const mongoclient =require("mongodb").MongoClient;
// exp.use(express.json);
var database;
var dbcollection="books";

//create database
exp.get('/createDB/:dbname',(req,res,)=>{
        mongoclient.connect(`mongodb://0.0.0.0:27017/${req.params.dbname}`, (err, result)=>{
            if(err) throw err;
            database=result.db(`${req.params.dbname}`);
            console.log("sucessfully created database");
        });
});


//drop the database
exp.get('/dropdatabase/:dbdel',(req,res)=>{
    console.log(req.params.dbdel);
    mongoclient.connect(`mongodb:/0.0.0.0:27017/${req.params.dbdel}`, (err, result)=>{
        if(err) throw err;
        db.dropDatabase((err,result)=>{
            if(err) throw err;
            res.send("sucessfully deleted"+result);
        })
    })
});

//create new collection 
exp.get('/createcollection/:collname',(req,res)=>{
    database.createCollection(`${req.params.collname}`,(err)=>{
        if (err) throw err;
            res.send("collection created...");
    })
});

//list the collections in the database
exp.get('/collections',(req,res)=>{
    database.listCollections().toArray((err,result)=>{
        if(err) throw err;
        res.send(result[0].name);
    })
})

//insert value to the collections  
exp.get('/insertcoll/:collname',(req,res)=>{
    database.collection(`${req.params.collname}`).insertOne({"name":"suresh"},(err)=>{
        if(err) throw err;
        res.send("sucessfully Inserted....");
    });
})

//read from specific database
exp.get('/getData/:collname',(req,res)=>{
    database.collection(`${req.params.collname}`).find({}).toArray((err,result)=>{
        if(err)throw err;
        res.send(result);
        console.log("Look At The 'Localhost:3000' FOr Result ...");
    });
});

//read from database
exp.get('/getData',(req,res)=>{
    database.collection(dbcollection).find({}).toArray((err,result)=>{
        if(err)throw err;
        res.send(result);
        console.log("Look At The 'Localhost:3000' FOr Result ...");
    });

    // database.collection("books").findOne({}, (err, result)=>{
    //     if (err) throw err;
    //     res.send(result);
    // });
});

exp.listen(3000,()=>{
    mongoclient.connect("mongodb://0.0.0.0:27017", (err, result)=>{
    // mongoclient.connect("mongodb://0.0.0.0:27017",{useNewUrlParser:true},(err,result)=>{
        if(err) throw err;
        database=result.db("testdb");
        console.log("Sucessfully connected with MongoDB . . .");
    });
});