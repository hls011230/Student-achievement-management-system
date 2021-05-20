var formidable = require("formidable");
var User = require("../models/User");
var md5 = require("blueimp-md5");
var log = null ;
//用户对象
class student {
  constructor(name,pass,sno,email,phone){
    this.name = name;
    this.pass = pass;
    this.sno = sno;
    this.email = email;
    this.phone = phone;
  }
}
class teacher {
  constructor(name,pass,tid,email,phone){
    this.name = name,
    this.pass = pass;
    this.tid = tid;
    this.email = email;
    this.phone = phone;
  }
}

// 显示login页面
exports.login = function(req,res){
  res.render("login")
}
exports.t_login = function(req,res){
  res.render("t_login")
}

// 登录login
exports.doLogin = function(req,res){
    //  获取用户名和密码
   var username = req.body.username;
   var password =md5(req.body.password);
  //  和数据进行比对，如果有了，存入session
  var query = 'select * from student where username1 = '+User.escape(username)+ ' and password =' + User.escape(password);
  User.query(query,function(err,rows){
      if(err){
          console.log(err);
          return;
      }
      var user = rows[0];
      if(!user){
        res.json({"result":-1})
        return;
      }
      var s_user = new student(rows[0].realname1,rows[0].password,rows[0].sno,rows[0].email,rows[0].phone);
      req.session.student = s_user;
      log = s_user;
      res.json({"result":1});
      exports.log = log;
  })
}



exports.t_doLogin = function(req,res){
     //  获取用户名和密码
    var username = req.body.username;
    var password = req.body.password;
   //  和数据进行比对，如果有了，存入session
   var query = 'select * from teacher where jobno = '+User.escape(username)+ ' and password =' + User.escape(password);
   User.query(query,function(err,rows){
       if(err){
           console.log(err);
           return;
       }
       var user = rows[0];
       if(!user){
         res.json({"result":-1})
         return;
       }
       var user2 = new teacher(rows[0].realname1,rows[0].password,rows[0].jobno,rows[0].email,rows[0].phone);
       req.session.teacher = user2;
       res.json({"result":1,
                  "user" : user2
      });
   })
 }