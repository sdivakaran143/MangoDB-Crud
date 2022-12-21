const express=require("express");
const exp=express()
const mongoclient =require("mongodb").MongoClient;
// exp.use(express.json);
var database;
exp.get('/',()=>{
    console.log("connected....");
});

exp.get('/getData',(req,res)=>{
    database.collection('books').find({}).toArray((err,result)=>{
        if(err)throw err;
        console.log(res.send(result));
    });

    // database.collection("books").findOne({}, (err, result)=>{
    //     if (err) throw err;
    //     res.send(result);
    // });
})



exp.listen(3000,()=>{
        // console.log("connected da kumaereaaa.......");
    mongoclient.connect("mongodb://localhost:27017",{useNewUrlParser:true},(err,result)=>{
        if(err) throw err;
        database=result.db("testdb");
        console.log("connected da kumaereaaa.......");
    });
});