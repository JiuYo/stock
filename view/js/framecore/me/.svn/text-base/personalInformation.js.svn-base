define(['jquery',"mui","common","service/system/userInfor","model/UserModel"], function ($,mui,common,userInforService,umodel) {　　　　
  var personalInformation = {};
  personalInformation.init = function (page) {
  	plus.navigator.setStatusBarBackground("#000000");
		plus.navigator.setStatusBarStyle("UIStatusBarStyleBlackOpaque");
 		mui.init();
 		personalInformation.getUserByToken();
 	
		//初始化单页的区域滚动
		mui('.mui-scroll-wrapper').scroll();
  };
  
  //点击提交按钮
	$('#btn').click(function(){
		//判断密码是否一致
		mui.openWindow({
			url: "editInformation.html",
			id: "editInformation.html",
			show:  {        
				autoShow:  true  //页面loaded事件发生后自动显示，默认为true 
			}
		});
	})
	
	
	
	//获取用户信息
	personalInformation.getUserByToken = function(){
		var params = {};
		
		userInforService.getUserByToken(params,function(data){
			console.log(data.obj);
			var userData = data.obj;
			var serverurl = common.getServerurl();
			var imgUrl = serverurl + userData.portrait;
				if(userData.portrait){
					console.log(imgUrl);
					$('#head-img1').attr('src',imgUrl);
				}else{
					$('#head-img1').attr('src',"../../images/cbd.jpg");
				}
				$('#department').html(userData.departName);
				$('#userName').html(userData.realName);
			  $('#userPhone').html(userData.mobilePhone);
			  $('#userTel').html(userData.officePhone);
			  $('#userEmail').html(userData.email);
		},function(errorInfo){
			if(typeof(errorInfo) == Object)
				mui.alert("失败!"+errorInfo.msg);
			else
				mui.alert("失败!"+errorInfo);
		})
	}
	
  return personalInformation;
});
