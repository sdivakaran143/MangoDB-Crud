const express=require("express");
const exp=express()
const mongoclient =require("mongodb").MongoClient;
// exp.use(express.json);
var database;
var dbcollection="names";
exp.get('/',(req,res)=>{
    res.send("database connected .....");
})
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
    mongoclient.connect(`mongodb://0.0.0.0:27017//`, (err, result)=>{
        if(err) throw err;
        var dbs=result.db(`${req.params.dbdel}`);
        // console.log(dbs);
        try{
            dbs.dropDatabase();
            res.send("database sucessfully deleted");
            console.log("database sucessfully deleted");
        }
        catch{
            res.send("unable to delete database.....");
            console.log("unable to delete database.....");
        }
    })
});

//list the collections in the database
exp.get('/collections',(req,res)=>{
    database.listCollections().toArray((err,result)=>{
        if(err) throw err;
        res.send(result[0].name);
    })
})

//delete or remove collectiuon in database
exp.get('/delcollection/:collname',(req,res)=>{
    database.collection(`${req.params.collname}`).drop((err,result)=>{
        if(err)throw err;
        console.log(result);
        res.send(result)
    })
})
//create new collection 
exp.get('/createcollection/:collname',(req,res)=>{
    database.createCollection(`${req.params.collname}`,(err)=>{
        if (err) throw err;
            res.send("collection created...");
            dbcollection=req.params.collname;
    })
});

//insert value to the collections  
exp.get('/insertcoll/:collname',(req,res)=>{
    // database.collection(`${req.params.collname}`).insertOne({"name":"suresh"},(err)=>{
        database.collection(`${req.params.collname}`).insertMany([{"_id":62,"name":"surya","age":21},{"_id":63,"name":"manish","age":20},{"_id":61,"name":"kumari","age":20},{"_id":60,"name":"sara","age":21},],(err)=>{
        if(err) throw err;
        res.send("sucessfully Inserted....");
    });
})

//read from specific collection
exp.get('/getData/:collname',(req,res)=>{
    database.collection(`${req.params.collname}`).find().toArray((err,result)=>{
        if(err)throw err;
        res.send(result);
        console.log("Look At The 'Localhost:3000' FOr Result ...");
    });
});

//read from database 
exp.get('/getData',(req,res)=>{
    database.collection(dbcollection).find().toArray((err,result)=>{
    // database.collection(dbcollection).find({"age":21}).toArray((err,result)=>{
        if(err)throw err;
        res.send(result);
        console.log("Look At The 'Localhost:3000' FOr Result ...");
    });

    // database.collection("books").findOne({}, (err, result)=>{
    //     if (err) throw err;
    //     res.send(result);
    // });
});

// to delete the value from the collection 
exp.get('/delcollvalue/:collname',(req,res)=>{
    database.collection(req.params.collname).deleteOne({"name":"suresh"},(err,result)=>{
        if(err) throw err;
        res.send("sucessfully deleted ...")
    })
})

//drop the whole deteils in the table
exp.get('/dropcoll/:collname',(req,res)=>{
    database.collection(req.params.collname).drop((err,result)=>{
        if(err)throw err;
        if(result) res.send("sucessfully droped the datas in collection : "+req.params.collname);
    })
})

//switch database 
exp.get('/switchto/:dbname',(req,res)=>{

    mongoclient.connect("mongodb://0.0.0.0:27017",(err,result)=>{
        if (err) throw err;
        if((database.databaseName)==(result.db(req.params.dbname).databaseName)){res.send("already on db : "+req.params.dbname);}
        else{
            database=result.db(req.params.dbname);
            res.send("switched to db : "+req.params.dbname);
        }
    })
})

//switch collection
exp.get('/switchcoll/:collname',(req,res)=>{
    if(dbcollection==req.params.collname) res.send("Aldredy in collection "+req.params.collname);
    else{
        dbcollection=req.params.collname;
        res.send("sucess fully switched to "+req.params.collname);
    }
})

exp.listen(3000,()=>{
    mongoclient.connect("mongodb://0.0.0.0:27017", (err, result)=>{
    // mongoclient.connect("mongodb://0.0.0.0:27017",{useNewUrlParser:true},(err,result)=>{
        if(err) throw err;
        database=result.db("testdb");
        // console.log(database);
        console.log("Sucessfully connected with MongoDB . . .");
    });
});