var formidable = require("formidable");
var User = require("../models/User");
var md5 = require("blueimp-md5");
// 显示注册页面
exports.showRegist = function(req,res){
  // 渲染注册页面
  res.render("regist")
}

exports.doRegist = function(req,res){

    var email = req.body.email;
    var username1 = req.body.username1;
    var realname1 = req.body.realname1;
    var sno = req.body.sno;
    var phone = req.body.phone;
    var sex = req.body.sex;
    var password =md5(req.body.password) ;
    var classid = req.body.classid;
    var mysqlQuery = 'insert student values(?,?,?,?,?,?,?,?)';
    User.query(mysqlQuery,[email,username1,realname1,sno,phone,sex,password,classid],function(err,rows,fields){
      if(err){
        console.log(err);
        return;
      }
      var success = {
        message:"添加成功"
      };
      res.json({"result": !err ? 1 : -1})
      console.log(success)
    })
}

exports.check_email_Regist = function(req,res){

    var email = req.body.email;
    // 去数据库查询有无匹配email地址
    var mysqlQuery = 'select * from student where email = "'+email+'"';
    User.query(mysqlQuery,function(err,rows,fields){
      if(err){
        console.log(err);
        return;
      }
      res.json({"result":rows})
    })
}


exports.check_username_Regist = function(req,res){
    var name = req.body.name;
    // 去数据库查询有无匹配email地址
    var mysqlQuery = 'select * from student where username1 = "'+name+'"';
    User.query(mysqlQuery,function(err,rows,fields){
      if(err){
        console.log(err);
        return;
      }
      res.json({"result":rows})
    })
}

exports.check_class_Regist = function(req,res){
  var classid = req.body.classid;
  // 去数据库查询有无匹配email地址
  var mysqlQuery = 'select * from class where class = "'+classid+'"';
  User.query(mysqlQuery,function(err,rows,fields){
    if(err){
      console.log(err);
      return;
    }
    if(!rows[0]){
      res.json({"status":-1});
      return;
    }
    res.json({"status":1})
  })
}