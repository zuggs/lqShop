var express = require('express');
var router = express.Router();
var crypto=require("crypto");//引入无秘钥加密模块
var mongoClient=require("mongodb").MongoClient;

//首页路由
router.get('/', function(req, res, next) {
  res.render('register');
});
router.post('/confirm', function(req, res, next) {
   var user=req.body.username,
      pw=req.body.pw;
  //console.log(user,pw);
  function DealUser(user,pw){
    this.user=user;
    this.pw=pw;
    this.init();
  }
  DealUser.prototype={
    constructor:DealUser,
    init:function(){
      var encry=this.encryption();//实现无秘钥加密,为加密后的密码
      this.encry=encry;
      //console.log(encry);
      var db=this.opendb("liqun","user");//封装了打开liqun数据库的user集合的promise
      db.then(this.cldeal.bind(this));
    },
    encryption:function(){
      //无秘钥加密
      const cipher=crypto.createCipher("aes192","a password");//cipher：密码的意思，cryptogram：密码
      let encrypted=cipher.update(this.pw,"utf8","hex");//encrypted：加密的意思
      encrypted+=cipher.final('hex');//输出编译密码及后缀
      return encrypted;
     // console.log("mim",encrypted)
    },
    opendb:function(dbName,clName){
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
    },
    cldeal:function(db){
      var that=this;
      //console.log(db)  //[collection,db]    
      db[0].find({username:this.user}).toArray(toarr.bind(this));
      function toarr(err,d){
        if(err) {
          res.send("0");
          db[1].close();
          return;
        }
        if(d.length>0){//注册逻辑，即判断是否不为0，返回重名，否则插入数据
          res.send("1")//代表重名
          db[1].close();
          return;
        }else{
          //console.log(this.user,this.encry)
          db[0].insert({username:this.user,password:this.encry});
          res.json({
            state:200,
            username:this.user,
            pw:this.encry
          });
          db[1].close();
        }
      }    
    }
  }
  new DealUser(user,pw); 
  //res.send("hello word");
});
module.exports = router;
