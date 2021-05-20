var express = require("express");
var router = express.Router();
var User = require("../models/User");
var formidable = require("formidable");
var log = require("./loginctr")
var md5 = require("blueimp-md5")
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const Code = require("../database/Code.js")
var fs = require("fs");
var path = require("path");
var fn = require("../database/cod")
const assert = require('http-assert')
var async = require("async");

var filePath = path.resolve(__dirname,"../database/Code.js");

var checkemail = function(callback) {
    // 使用fs模块去读取文件
    var result = fs.readFile(filePath,function(err,data) {
      callback(JSON.parse(data.toString()))
    });
  }


var code = null;
var name = null;

router.get("/1",function(req,res){
    res.render("s_forget");
})

const randomFns=()=> { // 生成6位随机数
    let code = ""
    for(let i= 0;i<6;i++){
        code += parseInt(Math.random()*10)
    }
    return code 
}

router.post("/1", function(req,res){
    res.redirect("/student_forget_password/2")
})

router.post("/send",function(req,res) {
     var email = req.body.email;
     name = email;
     var checkCode = randomFns();
     code = checkCode;
     fn.send(email,checkCode)
     .then(() => {
        addemail(email,code,function(){})
        res.json({"status":1})
    })
    .catch(() => {
        res.json({"status":-1})
    }) 
})

router.get("/2",function(req,res){
    res.render("s_forget2")
})

router.post("/2", function(req,res){
    var em = req.body.email;
    module.exports.e = em ;
    var ver_code = req.body.ver_code;
    console.log(em);
    console.log(ver_code);
    patchemail(em,ver_code,function (data) {
        console.log(data);
        if (data == true){
            res.json({"status":1})
            deleteemail(em,function () {})
        }else{
            res.json({"status":-1})
        }
    });
    
})

router.get("/3",function(req,res){
    res.render("s_forget3")
})



router.post("/3",function(req,res){
    var password =md5(req.body.password) ;
    // console.log(e.e)
    var mysqlQuery = 'update student set password = '+User.escape(password)+' where email = "'+name+'";';
    User.query(mysqlQuery,function(err,rows,fields){
      if(err){
        console.log(err);
        return;
      }
        res.json({"status":1})
      
    })
  })


router.get("/4",function(req,res){
    res.render("s_forget4")
})



var deleteemail = function(id,callback) {
    checkemail(function(data){
      for(var i = 0; i < data.length; i++){
        if(data[i].email == id) {
          // 找到对应的下班删除这一项
          data.splice(i,1)
        }
    }
    fs.writeFile(filePath, JSON.stringify(data),function(){
        callback()
      })
})}

var addemail = function(e,d,callback) {
    // 增加数据是在已有数据的基础之上进行增加
    // 获取已有数据
    checkemail(function(data){
      
      // 将数据push给data
      let obj = {"email":e, "code": d};
      data.push(obj);
      // 写入到db.js
      // 第一个参数是写入的地址，第二个参数是文件内容，注意必须是字符
      fs.writeFile(filePath, JSON.stringify(data),function(){
        callback()
      })
        
    })
  }

var patchemail = function(e,d,callback){
    checkemail(function(data){
        var flag1 = false;
        for(var i = 0; i < data.length; i++){
            if(data[i].email == e && data[i].code == d) {
                var flag2 = true;
                callback(flag2);
                return;
            }
        }
        callback(flag1)
    })
}

module.exports = router ;