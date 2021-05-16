var fs = require("fs");
var user = require("./User")
// allTodos就是数据源
// 查询数据
exports.allTodos = function(tid,callback) {
  
  var query = 'select * from teacher_todo td inner join teacher t on td.tid = t.jobno where t.realname1 ='+user.escape(tid);
  User.query(query,function(err,rows){
    if(err){
        console.log(err);
        return;
    }
    callback(rows)
})
}

// 增加数据,机理就是获取所有的数据后，增加对应的数据然后再写入db.js
exports.addTodo = function(tid,title,callback) {
  // 增加数据是在已有数据的基础之上进行增加
  // 获取已有数据
  var query = 'insert tid title done into teacher_todo values ("'+tid+'","'+title+'",0) ';
  User.query(query,function(err,rows){
    if(err){
        console.log(err);
        return;
    }
  })
}


// 删除数据，机理就是获取所有的数据后，删除对应id数据然后再写入db.js
exports.deleteTode = function(tid,callback) {
  allTodos(function(data){
    for(var i = 0; i < data.length; i++){
      if(data[i].id == id) {
        // 找到对应的下班删除这一项
        data.splice(i,1)
      }
    }
    // 写入
    fs.writeFile(filePath, JSON.stringify(data),function(){
      callback()
    })
  })
}

// 修改,机理就是获取所有的数据后，修改某一条数据然后再次写入到db.js
exports.updateTodo = function(id,key,value,callback) {
  allTodos(function(data){
    for(var i = 0; i < data.length; i++){
      if(data[i].id == id) {
        data[i][key] = value;
      }
    }
      // 写入
    fs.writeFile(filePath, JSON.stringify(data),function(){
      callback()
    })
  })
}
// 拖拽，startIdx指的是开始的下标，endIdx指的是结束的下标
exports.moveData = function(startIdx,endIdx,callback){
  allTodos(function(data){
    
    // 改变todos位置，通过startIdx和endIdx
    data.splice(endIdx,0,data.splice(startIdx,1)[0]);
    console.log(data)
    // 写入
     fs.writeFile(filePath, JSON.stringify(data),function(){
      callback()
    })
  })
}

