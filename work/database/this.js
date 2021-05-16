function fn(int,callback) {
    var a = int ;
    callback(a);
    
  }

  fn(2,function(data){
	  console.log(data)})


    fn("aaa",function(hls) {
      console.log(hls);
    })

  