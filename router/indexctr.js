var express = require("express");
var router = express.Router();
var scoreCtr = require("../models/query_ctr");
var formidable = require("formidable");
var log = require("./loginctr")
var md5 = require("blueimp-md5")


var username1 = null;
var email = null;
var phone = null;
var sno = null;

router.get("/",function(req,res){
  
  if(req.session.student) {
      res.render("index",{
        username: log.log.name
      })
      username1 = log.log.name;
      phone = log.log.phone;
      email = log.log.email;
      sno = log.log.sno;
    } else {
      res.render('login');
    }
});


router.get("/query_score",function(req,res){
  res.render("s_query_score",{
    username:username1
  })
})

router.get("/q_score",function(req,res){
  scoreCtr.checkScore(sno,function(data){
    res.json({
      "status":"success",
      "data": data
    })
  })
})

router.post("/send_appeal",function(req,res){
  var ap_course = req.body.ap_course;
  var done_teacher = req.body.done_teacher;
  var ap_content = req.body.ap_content;
  scoreCtr.send_appeal(sno,ap_course,done_teacher,ap_content,function(data){
    if(data == "ok"){
      res.json({
        "status":"success"
      })
    }
  })
})


router.get("/query_result",function(req,res){
  res.render("s_query_result",{
    username:username1
  })
})



router.get("/query_rank",function(req,res){
  res.render("s_query_rank",{
    username:username1
  })
})

router.get("/q_rank",function(req,res){
  scoreCtr.checkRank(sno,function(data){
    res.json({
      "status":"success",
      "data": data
    })
  })
})

module.exports = router;
