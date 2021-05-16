var User = require("./User");


//查询该学生成绩
exports.checkScore  = function(sno,callback){
var query = 'select co.cname,sc.score from score sc inner join course co on sc.course_id = co.cid inner join student st on sc.student_id = st.sno where sno = "'+sno+'"';
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
  var query = 'SELECT r.total,r.rnk from (SELECT *,(SELECT count(DISTINCT total) FROM (select student_id,sum(score) total from score GROUP BY student_id) b WHERE a.total<b.total)+1 AS rnk FROM (select student_id,sum(score) total from score GROUP BY student_id) AS a ORDER BY rnk) r where r.student_id = "'+sno+'"';
    User.query(query,function(err,rows){
      if(err){
          console.log(err);
          return;
      }
      callback(rows)
      })
  }
