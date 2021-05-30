var express = require("express");
var session = require('express-session');
var path = require('path');
var bodyParser=require('body-parser');
// 引入路径
var indexctrl = require('./router/indexctr')
var registctrl = require("./router/registctr");
var loginctrl = require("./router/loginctr");
var teacherctrl = require("./router/teacherctr");
var mainctrl = require("./router/mainctrl");
var forgetctrl = require("./router/forget")


var app = express();
// 设置模板引擎
var ejs = require('ejs');
app.engine('.html',ejs.__express);
app.set("view engine","html");
// 静态化文件夹
app.use(express.static(path.join(__dirname,"static")));


// 使用session
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: '123',
  name:"hls",
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge:8640000},
  
}))

var server=require('http').createServer(app);
app.use(bodyParser.urlencoded({extended:true}));
var PORT=process.env.PORT||3008;
server.listen(PORT);

// 
app.use("/",indexctrl);
// 登录页面 `
app.post("/login",loginctrl.doLogin);
// 显示注册
app.get("/regist",registctrl.showRegist);
app.checkout("/ck_email_regist",registctrl.check_email_Regist)
app.checkout("/ck_username_regist",registctrl.check_username_Regist)
app.checkout("/ck_class_regist",registctrl.check_class_Regist)
// 执行注册
app.post("/regist",registctrl.doRegist);
// 登录显示
app.get("/login",loginctrl.login);

//教师管理
app.use("/teacher",teacherctrl)
//教师登录页面
app.post("/t_login",loginctrl.t_doLogin);
// 教师登录显示
app.get("/t_login",loginctrl.t_login);
//教师教学计划
app.get("/todolist",mainctrl.getTodo); //查找
app.post("/todolist",mainctrl.addTodo); //增加
app.delete("/todolist",mainctrl.deleteTode); //删除
app.patch("/todolist",mainctrl.updateTodo); //修改
app.move("/todolist",mainctrl.moveData); //移动

app.use("/student_forget_password",forgetctrl)//忘记密码
// 监听端口
app.listen(3000);