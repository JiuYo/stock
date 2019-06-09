define(['jquery',"mui","common","service/system/userInfor","model/UserModel","utils/validate_util",'layer/layer'], function ($,mui,common,userInforService,umodel,validateUtil,layer) {　　　　
  var restPassword = {};
  restPassword.init = function (page) {
 		mui.init();
		//初始化单页的区域滚动
		mui('.mui-scroll-wrapper').scroll();
  };
  mui.plusReady(function(){
  		plus.navigator.setStatusBarBackground("#000000");
			plus.navigator.setStatusBarStyle("UIStatusBarStyleBlackOpaque");
  })
  //点击提交按钮
	$('#btn').click(function(){
		console.log($('#newPassword').val());
		if($('#newPassword').val() == ""){
			mui.toast('密码不能为空,请重新输入');
		}else{
			//判断密码是否一致
			var lastPass = $('#oldPassword').val();
			var newPass = $('#newPassword').val();
			var confirm = $('#confirmPassword').val();
			if(newPass == confirm){
				var resultDatatype = validateUtil.validate("passWord");
				if(!resultDatatype.result){
					resultDatatype = JSON.stringify(resultDatatype.result_msg);
					resultDatatype = resultDatatype.substring(1,resultDatatype.length-1);
					layer.open({
				    content: resultDatatype,
				    skin: 'msg',
				    time: 2
				  })
					return false;
				}
				$('#layui-m-layer0').show();
				restPassword.updatePasswordByUserApp(lastPass,newPass);
			}else{
				mui.toast('两次输入密码不一致,请重新输入');
			}
		}
		
	})
  
  restPassword.updatePasswordByUserApp = function(lastPassword,newPassword){
  	var params = {};
  	params.lastPassword=lastPassword;
  	params.newPassword=newPassword;
  	userInforService.updatePasswordByUserApp(params,function(data){
  		$('#layui-m-layer0').hide();
   		console.log(params);
			mui.toast(data.msg);
			if((data.msg).indexOf("密码错误")==-1){
				setTimeout(function(){
//					var currView = plus.webview.currentWebview();
//					var parentView = currView.opener();
//					currView.close();
						mui.toast("请重新登录!");
						common.clearUserInfo();
						plus.storage.setItem("userPwd", "");
						common.getLoginView();
				},500);
			}
		},function(errorInfo){
			$('#layui-m-layer0').hide();
			if(typeof(errorInfo) == Object)
				mui.alert("失败!"+errorInfo.msg);
			else
				mui.alert("失败!"+errorInfo);
		})
  }
  
  return restPassword;
});
