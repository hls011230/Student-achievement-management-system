var User = require("./User");
var async = require("async");
var xlsx = require("node-xlsx")
var fs = require("fs")


//查询老师任教课程
exports.checkCourse  = function(tid,callback){
    var query = 'select * from t_schedule ts inner join course co on ts.courseNo = co.courseNo where jobno = "'+tid+'" group by ts.courseNo ';
      User.query(query,function(err,rows){
        if(err){
            console.log(err);
            return;
        }
        callback(rows)
        
        })
    }

//成绩报告 ~~
exports.scoreResult = async function (tid,callback) {
    var query2 = "select * from (select st.class  , sc.courseNo  , round(avg(sc.score),2) ag from student st , score sc where st.sno = sc.sno GROUP BY st.class , sc.courseNo) a inner join course co  on a.courseNo = co.courseNo inner join t_schedule ts on co.courseNo = ts.courseNo where ts.jobNo = '"+tid+"' GROUP BY class,co.courseNo";
   
    User.query(query2,function (err,rows) {
        if(err){
            console.log(err);
            return;
        }
        callback(rows)
    })
        
}
   


//查询所有学生成绩
exports.checkScore  = function(callback){
var query = 'select  st.sno , st.realname1 , co.courseName, sc.score from score sc inner join student st on sc.sno = st.sno inner join course co on sc.courseNo = co.courseNo ';
  User.query(query,function(err,rows){
    if(err){
        console.log(err);
        return;
    }
    callback(rows)
    
    })
}

//模糊查询学生成绩
exports.dim_checkScore = function(name,callback) {
 var query = 'call mypro01("'+name+'");';
  User.query(query,function(err,rows){
    if(err){
        console.log(err);
        return;
    }
    callback(rows[0])
    
    })
}


//添加学生成绩
exports.addScore = function(course,sno,score,jobno,callback){
    var query = 'insert into score (sno,courseNo,cur_time,cur_teacher,score) VALUES ("'+sno+'",(select courseNo from course where courseName = "'+course+'"),now(),"'+jobno+'",'+score+');';
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
    var query = 'delete from score where sno = "'+sno+'" and courseNo = (select courseNo from course where courseName = "'+course+'");'
    User.query(query,function(err,rows) {
        if(err){
            callback("err");
            return ;
        }else{
            callback("ok");
        }
    })
}

//修改学生成绩
exports.updataScore = function(sno,course,score,callback){
    var query = 'update score set score = '+score+'  where sno = "'+sno+'" and courseNo = (select courseNo from course where courseName = "'+course+'");'
    User.query(query,function(err,rows) {
        if(err){
            callback("err");
            return ;
        }else{
            callback("ok");
        }
    })
}

//将学生成绩表的内容写入xlsx文件

exports.innerXlsx  = function(tid,callback){
    var data=[];
    var query = 'select  st.sno , st.realname1 , co.courseName, sc.score from score sc inner join student st on sc.sno = st.sno inner join course co on sc.courseNo = co.courseNo  ';
      User.query(query,function(err,rows){
        if(rows)
		{
			for(var i = 0; i < rows.length; i++)
			{
				var arr=[];
				var value=rows[i];
				for(var j in value){
					arr.push(value[j]);
				}
				data.push(arr);
			}
		}
		var buffer = xlsx.build([
			{
				name:'sheet1',
				data:data
			}
		]);
        
		fs.writeFileSync('static/xlsx/test1.xlsx',buffer,{'flag':'w'});
        callback("ok")
    });   
}


