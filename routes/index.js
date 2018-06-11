var express = require('express');
var router = express.Router();
var mongoClient = require("mongodb").MongoClient;
var qs = require("querystring");
//首页路由
router.get('/', function(req, res, next) {
  var cookie=qs.parse(req.headers.cookie,"; ","=");
  //console.log(cookie.ZGSID.length)
  if(cookie.ZGSID){
    mongoClient.connect("mongodb://localhost:27017",(err,db)=>{
      var odb=db.db("liqun");
      var tk=odb.collection("tocken");
      tk.find({ZGSID:cookie.ZGSID}).toArray((e,d)=>{
        if(e) throw e;
        //console.log( d[0].username )
        res.render('index',{
          login:false,
          user:d[0].username
        });
      })
      db.close();
    })
  }else{
    res.render('index',{login:true});
  }  
});
router.get("/confirm",(req,res,next)=>{
  res.clearCookie("ZGSID");
  res.render('index',{login:true});
})

module.exports = router;
