var User = require("./User");


//查询该学生成绩
exports.checkScore  = function(sno,callback){
var query = 'select courseName,score,cur_time,realname1 from score sc inner join course co on sc.courseNo = co.courseNo inner join teacher t on sc.cur_teacher=t.jobno  where sc.sno = "'+sno+'"';
User.query(query,function(err,rows){
  if(err){
      console.log(err);
      return;
  }
  callback(rows)
  })
}


//查询该学生的排名
exports.checkRank  = function(sno,callback){
  var query = 'SELECT r.total,r.rnk from (SELECT *,(SELECT count(DISTINCT total) FROM (select sno,sum(score) total from score GROUP BY sno) b WHERE a.total<b.total)+1 AS rnk FROM (select sno,sum(score) total from score GROUP BY sno) AS a ORDER BY rnk) r where r.sno = '+sno+'';
    User.query(query,function(err,rows){
      if(err){
          console.log(err);
          return;
      }
      callback(rows)
      })
}

//学生申诉成绩
exports.send_appeal = function(sno,course,teacher,content,callback){
  var query = 'insert into appeal values("'+sno+'","'+course+'","'+teacher+'",now(),"'+content+'",0)';
    User.query(query,function(err,rows){
      if(err){
          console.log(err);
          return;
      }
      callback("ok")
      })
}
