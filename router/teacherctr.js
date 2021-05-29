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
    if(username1){
      res.render("t_score_ctr",{
        username: username1
    })
  }else{
    res.render('t_login');
  }
});

router.get("/s_ctr",function(req,res){
  var cur_page = req.query.page;
  scoreCtr.checkScore(jobno,function(data){
      var showdata = [];
      //分页处理
      var num = 8; //一页条数
      var current_page = cur_page;
      if(current_page == 1){
        for (var i = current_page-1 ; i < num ; i++){
          showdata.push(data[i]);
        }
      }else{
        for (var i = (current_page-1)*num ; i < (current_page-1)*num+num ; i++){
          showdata.push(data[i]);
        }
      }
      // 将得到的数据返回给前端
      if(current_page < 1){
        res.json({
          "status":"under",
          "total":Math.ceil(data.length/num)
        })
      }else if(current_page > Math.ceil(data.length/num)){
        res.json({
          "status":"beyond",
          "page":Math.ceil(data.length/num),
          "total":Math.ceil(data.length/num)
        })
      }else{
        res.json({
          "status":"success",
          "data": showdata,
          "total":Math.ceil(data.length/num)
        })
      }
  })
})


router.post("/s_ctr",function(req,res){
  var name = req.body.d
  scoreCtr.dim_checkScore(name,function(data){
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

//增加学生成绩
router.post("/score_ctr",async function(req,res){
    var obj = req.body.data;
    var count = 0;
    for(var i = 0 ; i < obj.length ; i ++){
      if(obj[i].sno != null && obj[i].score !=null){
        scoreCtr.addScore(obj[i].course,obj[i].sno,obj[i].score,jobno,function(data){
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
  if(username1){
    res.render("t_score_form",{
      username: username1
    })
}else{
  res.render('t_login');
}
})

//删除学生成绩
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


//修改学生成绩
router.patch("/score_ctr",function(req,res){
  var obj = req.body;
  console.log(obj)
  scoreCtr.updataScore(obj.sno,obj.course,obj.score,function(data){
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


//学期任务界面
router.get("/todolist",function(req,res){
  res.render("tolist")
})


//学生成绩查删改
router.get("/score_result",function(req,res){
    if(username1){
      res.render("t_score_result",{
        username: username1
     })
  }else{
    res.render('t_login');
  }
    
})

router.get("/s_result",function (req,res) {
  scoreCtr.scoreResult(jobno,function(data) {
    res.json({
      "data":data
    })
    
  })
  
})

router.get("/score_rank",function(req,res){
    if(username1){
      res.render("t_score_rank",{
        username: username1
    })
  }else{
    res.render('t_login');
  }
  
})

router.get("/select_rank",function(req,res){
  scoreCtr.selectRank(function(data){
    res.json({"data":data,"status":"success"})
  })
})

router.get("/myself",function(req,res){
  if(username1){
    res.render("t_myself",{
      username: username1,
      email:email,
      phone:phone,
      jobno:jobno
    })
}else{
  res.render('t_login');
}
})

router.post("/myself",upload.single("upload"),function(req,res){
  res.json({"status":1})
})


//将学生成绩写入excel文件
router.post("/write_in",function(req,res){
  scoreCtr.innerXlsx(jobno,function(data){
    if(data == "ok"){
      res.json({"status":"success"})
    }
  })
})

module.exports = router;