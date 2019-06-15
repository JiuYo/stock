define(['jquery',"mui","common","service/enrol","model/UserModel",'utils/systemutil'], function ($,mui,common,senrol,umodel,systemutil) {　　　　
  var enrol = {};
  enrol.init = function (page) {
  	mui.init();
  	
  	mui.plusReady(function() {
			mui.back = function(){
					mui.toast('退回到登录页');
					 mui.openWindow({
						url:"login.html",
						id:'login.html',
						show: {
			        autoShow: true //页面loaded事件发生后自动显示，默认为true
				    }
					})
				}
		})
  
  return enrol;
});
