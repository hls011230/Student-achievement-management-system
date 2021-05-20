
var fn = function(){
    var $btn = $("#btn");
    var $inputUsername = $("#username");
    var $password = $("#password");
  
    $btn.click(function(){
      var username = $inputUsername.val();
      var password = $password.val();
      $.post("/t_login",{
        "username": username,
        "password": password
      },function(data){
        if(data.result == 1) {
          window.location = "/teacher"

        } else {
          alert("用户名不存在或者密码错误！")
        }
      })
    })
  };
  fn();