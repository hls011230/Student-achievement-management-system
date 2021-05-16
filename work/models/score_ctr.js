var User = require("./User");


//查询老师任教课程
exports.checkCourse  = function(tid,callback){
    var query = 'SELECT * from course where tid = "'+tid+'"';
      User.query(query,function(err,rows){
        if(err){
            console.log(err);
            return;
        }
        callback(rows)
        
        })
    }

//成绩报告 ~~
exports.scoreResult = function (tid,callback) {
    var data1 = null;
    var data2 = [];
    var query1 = "select * from teach_cls where tid = '"+tid+"'";
    var query2 = "select * from teach_cls where tid = '"+tid+"'";
    User.query(query1,function (err,rows) {
        if(err){
            console.log(err);
            return;
        }
        data1 = Array.of(rows)
    })
    User.query(query2,function (err,rows) {
        if(err){
            console.log(err);
            return;
        }
        data1 = Array.of(rows)
    })
        
}
   




//查询所有学生成绩
exports.checkScore  = function(callback){
var query = 'select st.sno , st.realname1 , co.cname,sc.score from score sc inner join course co on sc.course_id = co.cid inner join student st on sc.student_id = st.sno';
  User.query(query,function(err,rows){
    if(err){
        console.log(err);
        return;
    }
    callback(rows)
    
    })
}


//添加学生成绩
exports.addScore = function(course,sno,score,callback){
    var query = 'insert into score (student_id,course_id,score) VALUES ("'+sno+'",(select cid from course where cname = "'+course+'"),'+score+');';
    User.query(query,function(err,rows){
      if(err){
          callback("err")
          return ;
      }else{
          callback("ok")
      }
    })
}

//删除学生成绩
exports.deleteScore = function(course,sno,callback){
    var query = 'delete from score where student_id = "'+sno+'" and course_id = (select cid from course where cname = "'+course+'");'
    User.query(query,function(err,rows) {
        if(err){
            callback("err");
            return ;
        }else{
            callback("ok");
        }
    })
}
