var express = require('express');
var router = express.Router();
var mongoClient = require("mongodb").MongoClient;
var qs = require("querystring");

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(1)
  var cookie=qs.parse(req.headers.cookie,"; ","=");
  //console.log(cookie.ZGSID.length)
  if(cookie.ZGSID){
    mongoClient.connect("mongodb://localhost:27017",(err,db)=>{
      var odb=db.db("liqun");
      var tk=odb.collection("tocken");
      tk.find({ZGSID:cookie.ZGSID}).toArray((e,d)=>{
        if(e) throw e;
        //console.log( d[0].username )
        res.render('list',{
          login:false,
          user:d[0].username
        });
      })
      db.close();
    })
  }else{
    res.render('list',{login:true});
  }  
});
router.get('/list', function(req, res, next) {
  opendb("liqun","list").then((db)=>{
    let [collection,database]=db;
    collection.find({}).toArray((e,d)=>{
        if(e) throw e;
        var obj=Object.assign({state:200},d[0]);
        res.json(obj);
        database.close();
    });
  })
})
function opendb(dbName,clName){
  return new Promise((resolve,reject)=>{
    mongoClient.connect("mongodb://localhost:27017",(err,db)=>{//打开数据库
      if(err) {
        res.send("0");
        db.close();
        return;
      }
      var odb=db.db(dbName);
      var collection=odb.collection(clName);
      //collection.find().toArray()
      resolve([collection,db]);
    })
  });      
}

module.exports = router;
