define(['jquery',"mui","common","service/login","model/UserModel",'utils/systemutil'], function ($,mui,common,slogin,umodel,systemutil) {　　　　
  var login = {};
  login.init = function (page) {
  	mui.init();
  	//css  动画效果
  	$('#account').on('focus',function(){
  		$(this).prev('.userTit').removeClass('myfirstback');
  		$(this).prev('.userTit').addClass('myfirst');
  	})
  	$('#account').blur(function(){
  		if($('#account').val() == ""){
  			$('#account').prev('.userTit').removeClass('myfirst');
  			$('#account').prev('.userTit').addClass('myfirstback');
  		}
  	})
  	$('#password').on('focus',function(){
  		$(this).prev('.userTit').removeClass('myfirstback');
  		$(this).prev('.userTit').addClass('myfirst');
  	})
  	$('#password').blur(function(){
  		if($('#password').val() == ""){
  			$('#password').prev('.userTit').removeClass('myfirst');
  			$('#password').prev('.userTit').addClass('myfirstback');
  		}
  	});
  	mui.plusReady(function() {
  		plus.navigator.setStatusBarBackground("#000000");
			plus.navigator.setStatusBarStyle("UIStatusBarStyleBlackOpaque");
  		//退出应用
		var quitTime = null;
  		mui.back = function(){
				mui.toast('再按一次退出应用');
				if(!quitTime){
					quitTime = new Date().getTime();
					setTimeout(function(){
						quitTime = null;
					},1000);
				}else{
					if((new Date().getTime() - quitTime) < 1000){
						quitTime = null;
          	plus.runtime.quit();
					}
				}
			}
  		//h5+ 事件完成后
  		login.indexpreload();
  	});
  	//获取userInfo
  	var userInfo = common.getUserInfo();
  	//点击赋值
	  var remember = userInfo.remember;
	 	var rememberXy = userInfo.rememberXy;
	 	if(rememberXy == "true"){
	 		$('.readBefore').hide();
		 	$('#readXy').show();
	 		$('#readXy').attr("checked","checked");
	 	}
  	//判断是否记住密码
  	if(remember == "true"){
  		$('#account').val(userInfo.userName);
  		$('#password').val(userInfo.userPwd);
  		$('.mui-switch').addClass('mui-active');
  	}else{
//		$('#account').val(); //取消记住密码后,仅清空密码
			$('#account').val(userInfo.userName);
  		$('.mui-switch').removeClass('mui-active');
  	}
  	
  	
  	$('#account').focus(function(){
  		var valName = $('#account').val();
  		console.log(valName);
  		$(this).val(valName);
  	})
  	if($('#password').val() != ""){
  		$('#password').prev('.userTit').removeClass('myfirstback');
  		$('#password').prev('.userTit').addClass('myfirst');
  	}
  	if($('#account').val() != ""){
  		$('#account').prev('.userTit').removeClass('myfirstback');
  		$('#account').prev('.userTit').addClass('myfirst');
  	}
  	
    $("#login").click(login.login);
    $("#checkupdate").click(login.check);
    
  };
  $('#agreement').on('tap',function(){
  	mui.openWindow({
  		url:"framecore/me/agreement.html",
  		id:'framecore/me/agreement.html',
		  show: {
        autoShow: true //页面loaded事件发生后自动显示，默认为true
	    }
  	})
  })
  $('#enrol').on('tap',function(){
	  mui.openWindow({
		  url:"enrol.html",
			id:'framecore/me/agreement.html',
		  show: {
          autoShow: true //页面loaded事件发生后自动显示，默认为true
	    }
	  })
  })
  
  //安全协议跳转
  //预加载相关操作//
  var indepage;
  var index_loaded_flag = false;//最开始是false
  login.indexpreload = function()
  {
  	indepage = mui.preload({
			"id": 'index',
			"url": 'index.html'
		});

		indepage.addEventListener("loaded",function () {
			index_loaded_flag = true;
		});
  }
	login.toIndex = function() {
		//使用定时器的原因：
		//可能执行太快，main页面loaded事件尚未触发就执行自定义事件，此时必然会失败
		var id = setInterval(function () {
			if(index_loaded_flag){
				clearInterval(id);
				mui.fire(indepage, 'show', null);
				indepage.show("pop-in");
			}
		},20);
	};
  
  login.check = function(){
  	var cver = plus.runtime.version;
  	mui.toast(cver);
  }
  //是否勾选协议
  login.isreadXy = function(){
  	return $('#readXy').is(":checked");
  }
  
  //获取搜索参数值
		 window.addEventListener('readed', function(e){
		 	$('.readBefore').hide();
		 	$('#readXy').show();
		 	$('#readXy').attr('checked',"checked");
		 });
  $('.readBefore').on('tap',function(){
  	mui.toast('请先阅读安全协议!');
  })
  login.login = function () {
  	$('#layui-m-layer0').show();
// if(login.isreadXy()){
  	var txtusername = common.htmlEscape($.trim($("#account").val()));
  	var txtuserpwd = common.htmlEscape($("#password").val());
  	umodel.userName = txtusername;
  	umodel.userPwd = txtuserpwd;
  	var isActive = document.getElementById("autoLogin").classList.contains("mui-active");
			if(isActive){
			  umodel.remember = "true";
			  common.setUserInfo( "remember", umodel.remember);
			}else{
			  umodel.remember = "false";
			  common.setUserInfo( "remember", umodel.remember);
			}
			umodel.rememberXy = "true";
  		common.setUserInfo( "rememberXy", umodel.rememberXy);
  	slogin.login(umodel,function(){
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
  	
	
  
  return login;
});
