const express = require('express');
const app = express();
const port = 8900;
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const mongoUrl = "mongodb://localhost:27017"
var cors = require('cors');
let db;
app.use(cors());

//restaurant
app.get('/restauranthome',(req,res) => {
    //var city = req.query.city
    var query = {};
	if(req.query.city && req.query.mealtype)
	{   console.log("1")
		query = { city:req.query.city ,"type.mealtype":req.query.mealtype};
	}
	else if(req.query.city)
    {   console.log("2");
    query = { city:req.query.city};
		
    }
    else if(req.query.mealtype)
    {   console.log("3")
        query = {"type.mealtype":req.query.mealtype};
    }
	
    db.collection('restaurant').find(query).sort({cost:1}).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

app.get('/restaurantlist/:city/:mealtype',(req,res) => {
    //var city = req.query.city
    var page = (req.query.page)? parseFloat(req.query.page):1
    var limit = 2
    var query = {city:req.params.city,"type.mealtype":req.params.mealtype};
	var sort = {cost:1};
    if(req.query.cuisine && req.query.lcost && req.query.hcost && req.query.sort)
    {   console.log("3");
        query["Cuisine.cuisine"] = req.query.cuisine;
        query.cost ={$gt:parseFloat(req.query.lcost),$lt:parseFloat(req.query.hcost)};
        sort = {cost:parseFloat(req.query.sort)}
    }
    else if(req.query.cuisine && req.query.lcost && req.query.hcost)
    {   console.log("2");
        query["Cuisine.cuisine"] = req.query.cuisine;
        query.cost ={$gt:parseFloat(req.query.lcost),$lt:parseFloat(req.query.hcost)};   
    }
    else if(req.query.lcost && req.query.hcost && req.query.sort)
    {   console.log("22");
        query.cost ={$gt:parseFloat(req.query.lcost),$lt:parseFloat(req.query.hcost)};
        sort = {cost:parseFloat(req.query.sort)}
    }
    else if(req.query.cuisine && req.query.sort)
    {   console.log("222")
        query["Cuisine.cuisine"] = req.query.cuisine;
        sort = {cost:parseFloat(req.query.sort)};
    }
    else if(req.query.cuisine)
    {   console.log("1")
        query["Cuisine.cuisine"] = req.query.cuisine;
    }
    else if(req.query.lcost && req.query.hcost)
    {   console.log("11")
        query.cost ={$gt:parseFloat(req.query.lcost),$lt:parseFloat(req.query.hcost)};   
    }
    else if(req.query.sort) {
        console.log("111")
        sort = {cost:parseFloat(req.query.sort)};

    }
    console.log(query);
    db.collection('restaurant').find(query).sort(sort).toArray((err,result) => {
        if(err) throw err;
        var totalNoOfItems = result.length
        result = result.slice((page - 1) * limit,((page - 1) * limit + limit))
        result.push({"totalNoOfItems":totalNoOfItems})
        res.send(result)
    })
})



app.get('/restaurantdetail/:id',(req,res) => {
    console.log(req.params.id)
    var query = {_id:req.params.id}
    db.collection('restaurant').find(query).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

//City List
app.get('/location',(req,res) => {
    db.collection('city').find({}).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

//cuisine
app.get('/cuisine',(req,res) => {
    db.collection('cuisine').find({}).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

//mealtype
app.get('/mealtype',(req,res) => {
    db.collection('mealtype').find({}).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

MongoClient.connect(mongoUrl,(err,client) => {
    if(err) console.log(err)
    db= client.db('edurekainternship');
    app.listen(port,(err) => {
        if(err) throw err;
        console.log(`Server is running on port ${port}`)
    })
})
