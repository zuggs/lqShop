var express = require('express');
var router = express.Router();
var crypto=require("crypto");//引入无秘钥加密模块
var mongoClient=require("mongodb").MongoClient;
var fs=require("fs");

//首页路由
router.get('/', function(req, res, next) {
  res.render('login');
});
router.post('/confirm', function(req, res, next) {
  var user=req.body.username;
  var pw=req.body.pw;
  var tocken=req.body.tocken;
  //console.log(req.body.tocken);
  function DealLogin(user,pw,tocken){
    this.user=user;
    this.pw=pw;
    this.tocken=tocken;
    this.init();
  }
  DealLogin.prototype={
    init:function(){
      this.encry=this.encryption();//无秘钥加密函数,结果为加密后的密码
      this.opendb("liqun","user")//打开数据库，此函数为promise对象
      .then(this.cldeal.bind(this));//执行集合处理函数
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
      db[0].find({username:this.user}).toArray(toarr1.bind(this));
      function toarr1(err,d){
        if(err) {//服务器崩了
          res.send("0");
          db[1].close();
          return;
        }
        if(d.length==0){//登录逻辑
          res.send("1")//代表账号未被注册
          db[1].close();
          return;
        }else if(d[0].password!=this.encry){//账号已被注册，判断密码是否错误          
          res.send("2")//代表密码错误
          db[1].close();
          return;          
        }else{//密码正确，判断做不做tocken免登陆验证
          //console.log(typeof eval(this.tocken) );          
            var that=this;
            //判断是否存在tocken的验证id，如果没有创立，否则更新
            var encrytk=this.encrytocken();
          if( eval(this.tocken) ) {   
            //免登陆，保存cookie7天         
            res.cookie("ZGSID",encrytk,{expires:new Date(Date.now()+604800000)});
          }else{
            //否则为会话
            res.cookie("ZGSID",encrytk);            
          }
            this.opendb("liqun","tocken")//打开了了同步promise数据库
            .then(function(dbs){           
              let [collection,database]=dbs;//存数据库
              collection.find({"username":that.user}).toArray(arr2.bind(this));
              function arr2(e,d){
                if(e) {//服务器崩了
                  res.send("0");
                  database.close();
                  return;
                }
                if(d.length==0){//没有则创建
                  collection.insert({
                    username:that.user,
                    ZGSID:encrytk
                  });
                }else{//有则更新
                  collection.update(
                    {username:that.user},
                    { $set:{ ZGSID:encrytk } }
                  );
                }
              }
              //database.close()
            })
          res.json({
            state:200,
            username:this.user,
            password:this.encry
          });
        }
      }    
    },
    encrytocken:function(){
      function objTohex(obj){
        return Buffer.from( JSON.stringify(obj) ).toString("hex");//对象转hex字符串
      }
      var header={//第一部分，加密依赖，加密头部
        "typ":"JWT",
        "alg":"sha1"
      };
      var payload={//第二部分，加密信息
        "iss":"zgs.com",
        "exp":"100000",
        "name":"GengshengZ"
      }
      //第三部分，加密文件(两者数据相加)
      var key=fs.readFileSync(__dirname+"/../server.pem").toString("ascii");//转换成ascii码；
      var hash=crypto.createHmac('sha1', key)//创建加密方式：
                    .update( objTohex(header) +"."+ objTohex(payload) )//加密数据：
                    .digest('hex');     //数据转码：
      return hash;
    }
  }
  new DealLogin(user,pw,tocken);
  //res.send("hello world");
});
module.exports = router;
