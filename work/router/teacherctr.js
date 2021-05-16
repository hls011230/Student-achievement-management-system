var express = require("express");
var router = express.Router();
var scoreCtr = require("../models/score_ctr");
var formidable = require("formidable");
var multer = require("multer")
var upload = multer({
  dest:"images"
})

var username1 = null;
var email = null;
var phone = null;
var jobno = null;

router.get("/",function(req,res){
    if(req.session.teacher) {
        res.render("t_index",{
          username: req.session.teacher.name
        })
        username1 = req.session.teacher.name;
        tid = req.session.teacher.tid;
        phone = req.session.teacher.phone;
        email = req.session.teacher.email;
        jobno = req.session.teacher.tid;
      } else {
        res.render('t_login');
      }
});

router.get("/t",function(req,res){
  res.json({"tid":tid});
});

//学生成绩录入
router.get("/score_ctr",function(req,res){
    res.render("t_score_ctr",{
        username: username1
    })
});

router.get("/s_ctr",function(req,res){
  scoreCtr.checkScore(function(data){
    res.json({
      "status":"success",
      "data": data
    })
  })
})

router.get("/s_course",function(req,res){
  scoreCtr.checkCourse(jobno,function(data){
    res.json({
      "status":"success",
      "data": data
    })
  })
})

router.post("/score_ctr",async function(req,res){
    var obj = req.body.data;
    var count = 0;
    for(var i = 0 ; i < obj.length ; i ++){
      if(obj[i].sno != null && obj[i].score !=null){
        scoreCtr.addScore(obj[i].course,obj[i].sno,obj[i].score,function(data){
          if(data == "err"){
            count++;
          }else if(data == "ok"){
            count++;
          }
        })
      }
    }
    res.json({
      "status":"success",
      "data": count,
    })
})

router.get("/score_form",function(req,res) {
  res.render("t_score_form",{
    username: username1
  })
})

router.delete("/score_ctr",function(req,res){
  var obj = req.body;
  scoreCtr.deleteScore(obj.course,obj.sno,function(data){
    if(data == "err"){
      res.json({
        "status":"fail",
        "data": 1
      })
    }else if(data == "ok"){
      res.json({
        "status":"success",
        "data": 1
      })
    }
  })
})





router.get("/todolist",function(req,res){
  res.render("tolist")
})

router.get("/score_result",function(req,res){
    res.render("t_score_result",{
       username: username1
    })
})

router.get("/s_result",function (req,res) {
  
  
})


router.get("/score_rank",function(req,res){
  res.render("t_score_rank",{
     username: username1
  })
})

router.get("/myself",function(req,res){
  res.render("t_myself",{
    username: username1,
    email:email,
    phone:phone,
    jobno:jobno
  })
})

router.post("/myself",upload.single("upload"),function(req,res){
  res.json({"status":1})
})

module.exports = router;