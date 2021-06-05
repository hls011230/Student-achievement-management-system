var User = require("./User");
var async = require("async");
var xlsx = require("node-xlsx")
var fs = require("fs");


//查询老师任教课程
exports.checkCourse  = function(tid,callback){
    var course = [];
    var sql = 'select s.class from t_schedule ts inner join student s on ts.classNo = s.class inner join course c on ts.courseNo = c.courseNo where ts.jobno = "'+tid+'" GROUP BY s.class'
    var query = 'select * from t_schedule ts inner join course co on ts.courseNo = co.courseNo where jobno = "'+tid+'" group by ts.courseNo ';
      User.query(query,function(err,rows){
        if(err){
            console.log(err);
            return;
        }
        course = rows;
        User.query(sql,function(err,result){
            if(err){
                console.log(err);
                return;
            }
            callback({"course":course,"class":result})
        })
    })
}

exports.checkStudy = function(jobno,course,s_class,callback){
    var query = "select * from t_schedule ts inner join student s on ts.classNo = s.class inner join course c on ts.courseNo = c.courseNo where ts.jobno = '"+jobno+"' and s.class = '"+s_class+"' and c.courseName = '"+course+"'"
    User.query(query,function(err,rows){
        if(err){
            console.log(err);
            return;
        }
        callback(rows);
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
exports.checkScore  = function(jobno,callback){
var query = 'select  st.sno , st.realname1 , co.courseName, sc.score from score sc inner join student st on sc.sno = st.sno inner join course co on sc.courseNo = co.courseNo where cur_teacher = '+jobno+' order by courseName';
  User.query(query,function(err,rows){
    if(err){
        console.log(err);
        return;
    }
    callback(rows)
    
    })
}

//模糊查询学生成绩
exports.dim_checkScore = function(name,jobno,callback) {
 var query = 'call mypro01("'+name+'","'+jobno+'");';
  User.query(query,function(err,rows){
    if(err){
        console.log(err);
        return;
    }
    callback(rows[0])
    
    })
}


//添加学生成绩
exports.addScore = function(arr,jobno,callback){
    var count = new Array();
    for (const i in arr) {
        var sql = 'select * from score where sno = '+arr[i].sno+' and courseNo = (select courseNo from course where courseName = "'+arr[i].course+'")'
        var query = 'insert into score (sno,courseNo,cur_time,cur_teacher,score) VALUES ("'+arr[i].sno+'",(select courseNo from course where courseName = "'+arr[i].course+'"),now(),"'+jobno+'",'+arr[i].score+');';
        User.query(sql,function(err,rows){
            if(err){
                console.log(err);
                return ;
            }
            if(rows[0]){
                count.push(arr[i].sno+" student have " + arr[i].course + "'s score");
                if(i == arr.length-1){
                    callback(count)
                }
            }else{
                User.query(query,function(err,rows){
                    if(err){
                        console.log(err);
                        return ;
                    }else{
                        count.push(arr[i].sno+" student add " + arr[i].course + "'s score success");
                        if(i == arr.length-1){
                            callback(count)
                        }
                    }
                })
            }
        })    
    }
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

//查询学生总分的年段排名
exports.selectRank = function(callback){
    var query = 'SELECT st.class,r.sno,st.realname1,r.total,r.rnk from (SELECT *,(SELECT count(DISTINCT total) FROM (select sno,sum(score) total from score GROUP BY sno) b WHERE a.total<b.total)+1 AS rnk FROM (select sno,sum(score) total from score GROUP BY sno) AS a ORDER BY rnk) r inner join student st on r.sno =st.sno ORDER BY r.rnk '
    User.query(query,function(err,rows) {
        if(err){
            callback("err");
            return ;
        }else{
            callback(rows);
        }
    })

}

//将学生成绩表的内容写入xlsx文件

exports.innerXlsx  = function(jobno,callback){
    
    var data=[];
    var query = 'select  st.sno , st.realname1 , co.courseName, sc.score from score sc inner join student st on sc.sno = st.sno inner join course co on sc.courseNo = co.courseNo where cur_teacher = '+jobno+' ORDER BY courseName  ';
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
        if(fs.existsSync(`static/xlsx/学生成绩表.xlsx`)){
            fs.unlinkSync(`static/xlsx/学生成绩表.xlsx`);
        }else{
            fs.writeFileSync('static/xlsx/学生成绩表.xlsx',buffer,{'flag':'w'});
            callback("ok")
        }    
    });   
}


//查询学生的申诉

exports.selectAppeal = function(jobno,callback){
    var query = 'select * from appeal ap inner join student st on ap.ap_sno = st.sno where done_teacher = (select realname1 from teacher where jobno = '+jobno+')'
    User.query(query,function(err,rows) {
        if(err){
            callback("err");
            console.log(err);
            return ;
        }else{
            callback(rows);
        }
    })
}


//修改申诉状态
exports.dealAppeal = function(jobno,sno,course,callback){
    var query = 'update appeal set done = 1 where done_teacher = (select realname1 from teacher where jobno = '+jobno+') and ap_sno = "'+sno+'" and ap_course = "'+course+'"'
    User.query(query,function(err,rows) {
        if(err){
            callback("err");
            console.log(err);
            return ;
        }else{
            callback();
        }
    })
}

//查询申诉学生的邮箱
exports.findStudentEmail = function(sno,callback){
    var query = 'select email from student where sno = '+sno+''
    User.query(query,function(err,rows) {
        if(err){
            callback("err");
            console.log(err);
            return ;
        }else{
            callback(rows);
        }
    })
}

