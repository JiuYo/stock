define(['jquery',"mui","common","service/login","service/system/userInfor","model/UserModel","muiview","utils/loadImage"], function ($,mui,common,slogin,userInforService,umodel,muiview,loadImage) {　　　　
  var me = {};
  me.init = function (page) {
 		mui.init();
		//初始化单页view
		var viewApi = mui('#app').view({
			defaultPage: '#setting'
		});
		//初始化单页的区域滚动
		mui('.mui-scroll-wrapper').scroll();
		mui.plusReady(function(){
			
					curr = plus.webview.currentWebview();
					wvs = plus.webview.all();
					me.getUserByToken();
					
		})
  };
  
  //quanjubianliang 
  var curr = null;
	var wvs = null;
  
	
	//个人信息跳转
	$('.account').click(function(){
		mui.openWindow({
				  url: "personalInformation.html",
				  id: "personalInformation.html",
				  show: {
				        autoShow: true //页面loaded事件发生后自动显示，默认为true
			    }
			});
	});
	//修改密码跳转
	$('.restPass').click(function(){
		mui.openWindow({
				  url: "restPassword.html",
				  id: "restPassword.html",
				  show: {
				        autoShow: true //页面loaded事件发生后自动显示，默认为true
			    }
			});
	});
	//修改密码跳转
	$('.about').click(function(){
		mui.openWindow({
				  url: "about.html",
				  id: "about.html",
				  show: {
				        autoShow: true //页面loaded事件发生后自动显示，默认为true
			    }
			});
	});
	
	//退出的监听
	document.getElementById("loginOut").addEventListener('tap',function(){
//		me.loginOut();
		if (mui.os.ios) {
			common.clearUserInfo();
			for (var i = 0, len = wvs.length; i < len; i++) {
				if (wvs[i].getURL().indexOf("/launch.html") != -1){
					plus.webview.open('../../launch.html','../../launch.html');
					wvs[i].close();
					continue;
				}
				if (wvs[i].getURL().indexOf("/me.html") != -1){
					continue;
				}
				plus.webview.close(wvs[i]);
			}			
				curr.close();
				return;
			}
			var btnArray = [{
				title: "注销当前账号"
			}, {
				title: "直接关闭应用"
			}];
			plus.nativeUI.actionSheet({
				cancel: "取消",
				buttons: btnArray
			}, function(event) {
				var index = event.index;
				switch (index) {
					case 1:
						//注销账号
						common.clearUserInfo();//清除前端本身的缓存
						// me.loginOut();//销毁token
				//循环关闭页面
						for (var i = 0, len = wvs.length; i < len; i++) {
							if (wvs[i].getURL().indexOf("/launch.html") != -1){
								wvs[i].show();
								continue;
							}
							if (wvs[i].getURL().indexOf("/me.html") != -1){
								continue;
							}
								plus.webview.close(wvs[i]);
					}
						curr.close();
						break;
					case 2:
						plus.runtime.quit();
						break;
				}
			});
		}, false);
	
			
	me.loginOut = function(){
	
		var userName = plus.storage.getItem("userName");
  	slogin.outTokens(userName,function(data){		
  		if(data.message == "成功"){
						
  		}else{
  			alert("失败");
  		}
  	},function(errorinfo){
  		if(typeof(errorInfo) == Object)
				mui.alert("失败!"+errorinfo.msg);
			else
				mui.alert("失败!"+errorinfo);
  	});
	}
	
	
	//获取用户信息
	me.getUserByToken = function(){
		umodel = common.getUserInfo();
		$("#titleName").html(umodel.realname+"<div class='mui-ellipsis' id='titleUserName'>"+"账号 : "+umodel.userName+"</div>")
	}
	
	//修改头像
	// $("#head-img").on("tap",function(){
	// 	var params = {};
	// 	loadImage.isconfirme(function(imagedata){
	// 		console.log(imagedata);
	// 		if(imagedata){
	// 			params.portrait = imagedata;
	// 			userInforService.UpdatePortraitByTokenUser(params,function(data){
	// 				console.log(JSON.stringify(data.obj));
	// 				var serverPath = common.getServerurl();
	// 				var imgageUrl = serverPath+imagedata;
	// 				console.log(imgageUrl);
	// 				$("#head-img").attr('src',imgageUrl);
	// 
	// 			},function(errorInfo){
	// 				if(typeof(errorInfo) == Object)
	// 					mui.alert("失败!"+errorInfo.msg);
	// 				else
	// 					mui.alert("失败!"+errorInfo);
	// 			})
	// 			
	// 			
	// 			
	// 		}
	// 	});
	// })
  
  
  return me;
});
