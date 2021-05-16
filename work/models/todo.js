var fs = require("fs");
var path = require("path");
// 公用路径
// __dirname的作用是智能补充我们的路径地址，因为当前的路径不能以相对路径展示
// path.resolve()方法表示智能合并路径，实际作用就是将__dirname和后面的相对路径进行智能合并
var filePath = path.resolve(__dirname,"../database/db.js");

// allTodos就是数据源
// 查询数据
exports.allTodos = allTodos = function(callback) {
  // 使用fs模块去读取文件
  var result = fs.readFile(filePath,function(err,data) {
    callback(JSON.parse(data.toString()))
  });
}

// 增加数据,机理就是获取所有的数据后，增加对应的数据然后再写入db.js
exports.addTodo = function(title,callback) {
  // 增加数据是在已有数据的基础之上进行增加
  // 获取已有数据
  allTodos(function(data){
    var maxId = 0;
    for(var i = 0; i < data.length; i++){
      if(data[i].id > maxId) {
        maxId = data[i].id;
      }
    }
    // 将数据push给data
    let obj = {"id": maxId + 1, "title": title, "done": "0"};
    data.push(obj);
    // 写入到db.js
    // 第一个参数是写入的地址，第二个参数是文件内容，注意必须是字符
    fs.writeFile(filePath, JSON.stringify(data),function(){
      callback()
    })
  })
}


// 删除数据，机理就是获取所有的数据后，删除对应id数据然后再写入db.js
exports.deleteTode = function(id,callback) {
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

