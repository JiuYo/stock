define(['jquery',"mui","common","service/system/userInfor","model/UserModel","utils/validate_util",'layer/layer'], function ($,mui,common,userInforService,umodel,validateUtil,layer) {　　　　
  var editInformation = {};
  editInformation.init = function (page) {
  	plus.navigator.setStatusBarBackground("#000000");
		plus.navigator.setStatusBarStyle("UIStatusBarStyleBlackOpaque");
 		mui.init();
		//初始化单页的区域滚动
		mui('.mui-scroll-wrapper').scroll();
		mui.plusReady(function() {
			editInformation.getUserByToken();
		});
		
  };
  
  //定义全局变量
  	var params = {};
  	var resultPhoneDatatype = "";//提示信息
  //点击提交按钮
	$('#saveBtn').click(function(){
		console.log($("#officePhone").val());
			editInformation.isAddReg();
			var resultDatatype = validateUtil.validate("editUserInfor");
				if(!resultDatatype.result || "" !== resultPhoneDatatype){
					resultDatatype = JSON.stringify(resultDatatype.result_msg);
					resultDatatype = resultDatatype.substring(1,resultDatatype.length-1);
					resultDatatype += resultPhoneDatatype;
					layer.open({
				    content: resultDatatype,
				    skin: 'msg',
				    time: 2
				  })
					return false;
				}else{
					editInformation.updateUserInfor();
				}
		
	})
	
	
	editInformation.isAddReg = function(){
		resultPhoneDatatype = "";
		var phoneReg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
		var officePhoneReg =  /^(0[0-9]{2,3}\-)([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/;
		var emailReg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
		$("input").each(function(){
			var inputValue = $.trim(this.value);
		  	if(this.value){
		  		if(this.id == "officePhone"){
	  				if(inputValue.length<50){
	  					params[this.id] = this.value;
	  				}else{
	  					resultPhoneDatatype += "[办公电话]不能大于50个字符!</br>";	
	  				}
		  		}
		  		if(this.id == "email"){
		  			if(!emailReg.test(inputValue)){
	  					resultPhoneDatatype += "[邮箱]格式不正确!</br>";
	  				}else{
	  					params[this.id] = this.value;
	  				}
		  		}
		  	}
		})
	}
	
	
	//获取用户信息
	editInformation.getUserByToken = function(){
		userInforService.getUserByToken(params,function(data){
				console.log(data.obj);
				var userData = data.obj;
				var serverurl = common.getServerurl();
				var imgUrl = serverurl + userData.portrait;
				if(userData.portrait){
					$('#head-img1').attr('src',imgUrl);
				}else{
					$('#head-img1').attr('src',"../../images/cbd.jpg");
				}
					$('#head-img1').src = serverurl + userData.signatureFile;
					$('#department').text(userData.departName);
					$('#realName').val(userData.realName);
				  $('#mobilePhone').val(userData.mobilePhone);
				  $('#officePhone').val(userData.officePhone);
				  $('#email').val(userData.email);
				  params.email=userData.email;
				  params.realName=userData.realName;
				  params.mobilePhone=userData.mobilePhone;
				  params.officePhone=userData.officePhone;
			},function(errorInfo){
				if(typeof(errorInfo) == Object)
					mui.alert("失败!"+errorInfo.msg);
				else
					mui.alert("失败!"+errorInfo);
			})
	}
	//修改用户信息
	editInformation.updateUserInfor = function(){
		for (var index in params){
			if(null == params[index] || "" == params[index] || undefined == params[index] || "null" == params[index] ){
				delete params[index];
			}
		}
		params.officePhone = $("#officePhone").val();
		params.mobilePhone=$("#mobilePhone").val();
		params.email = $("#email").val();
		params.realName = $("#realName").val();
		userInforService.UpdateByUserData(params,function(data){
				mui.toast(data.msg);
				setTimeout(function(){
  				var currView = plus.webview.currentWebview();
  				var parentview = currView.opener();
  				currView.close();
  				parentview.reload(true);
  			},500);
			},function(errorInfo){
				if(typeof(errorInfo) == Object)
					mui.alert("失败!"+errorInfo.msg);
				else
					mui.alert("失败!"+errorInfo);
			})
	}
  
  return editInformation;
});
