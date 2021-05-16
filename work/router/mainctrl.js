// 引入对数据操作的方法
var todos = require("../models/todo");

var formidable = require("formidable");

// 查询，找出所有的已办和未办的清单
exports.getTodo = function(req,res){
  todos.allTodos(function(data){
    // 将得到的数据返回给前端
    res.json({
      "status":"success",
      "data": data
    })
  })
}

exports.addTodo = function(req,res){
    // 得到用户输入的数据后，要写入db.js
    var obj = req.body;
    todos.addTodo(obj.title,function(){
      res.json({
          "status":"success",
          "data": 1
        })
    })
}

exports.deleteTode = function(req,res){
    var obj = req.body;
    console.log(obj.id)
    todos.deleteTode(obj.id,function(){
      res.json({
        "status":"success",
        "data": 1
      })
    })
}


exports.updateTodo = function(req,res){
    // 修改数据
    var obj = req.body;
    todos.updateTodo(obj.id,obj.key,obj.value,function(){
      res.json({
          "status":"success",
          "data": 1
        })
    })

}

exports.moveData = function(req,res){
    // 修改数据
    var obj = req.body;
    todos.moveData(obj.sId,obj.eId,function(){
      res.json({
          "status":"success",
          "data": 1
        })
    })
}