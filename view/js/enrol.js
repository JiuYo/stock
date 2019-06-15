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
				
				// 注册的方法
				$("#reg").on('tap',function(){
					var username=document.getElementById("username");
					var password=document.getElementById("password");
					var nickname=document.getElementById("nickname");
				  if(username.value.length==0){
					    plus.ui.toast("用户名不能为空");
					    return;
					}
					if(password.value.length==0){
					    plus.ui.toast("密码不能为空");
					    return;
					}
					if(nickname.value.length==0){
					    plus.ui.toast("昵称不能为空");
					    return;
					}
					// 调用注册方法
					enrol.enrolLogin();
				})
		})
		
		enrol.enrolLogin = function () {
		  	$('#layui-m-layer0').show();
				var username = $("#username").val();
				var password = $("#password").val();
				var nickname = $("#nickname").val();
				var umodel = {};
				
		  	slogin.enrolLogin(umodel,function(){
		  		//成功处理
		  		$('#layui-m-layer0').hide();
		  		//跳转到主页面
		  		login.toIndex();
		  	},function(errorinfo){
		  		$('#layui-m-layer0').hide();
		  		mui.alert("登录失败!" + systemutil.parsestr(errorinfo));
		  	});
		  // }else{
		  // 	$('#layui-m-layer0').hide();
		  // 	mui.toast("请阅读安全协议!");
		  // }
		  };
  
  return enrol;
});
