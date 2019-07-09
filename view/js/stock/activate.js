define(['jquery',"mui","common","service/stock/stock","model/UserModel",'utils/systemutil','vue',"service/login",], function ($,mui,common,stock,umodel,systemutil,vue,slogin) {　　　　
  var activate = {};
	var params = {};
  params.page = '';
  activate.init = function (page) {
  	mui.init();
	};
	mui.plusReady(function(){
		// activate.getStockList();
	});
		//uuid 的加密解密方法调用
	$("#auuid").on('tap',function () {
		//随机获得一串字符串
		var b = Math.random().toString(36).substr(2);
		//把唯一的uuid赋值给输入框显示到界面
		$("#auuid").val(b);
	/* 	//加密方法
		var c = compileStr(b);
		alert(c)
		//解密方法
		var d = uncompileStr(c);
		alert(d); */
	});

	
	//判断验证激活方法   两个参数,一个是随机参数,一个是加密后的参数 
	function  activate(){
		var yuanma = $("#auuid").val();
		var jiamima =$("#mima").val();
		//把加密码转换成源码
		var zyuanma = uncompileStr(jiamima);
		alert(1)
		alert(zyuanma)
		//判断转换后的源码是否与自动生成的源码一致,然后进行判断
		if(zyuanma == yuanma){
			//调用后台方法,把后台字段的时间限制去掉
			alert("激活成功了！")
		}else{
			alert("激活码错误，请重新输入！！！")
		}
	}
	
	//自动算码方法
	$("#auuid").on('tap',function(){
		var yuanma = $("#auuid").val();
		var sma = compileStr(yuanma);
		$("#suanma").val(sma);
	})
	function suanma(){
		var yuanma = $("#auuid").val();
		var sma = compileStr(yuanma);
		$("#suanma").val(sma);
		}
	//对随机字符串进行加密  
	function compileStr(code) {
		var c = String.fromCharCode(code.charCodeAt(0) + code.length);
		for (var i = 1; i < code.length; i++) {
			c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
		}
		return escape(c);
	}
	
	//对随机字符串进行解密  
	function uncompileStr(code) { 
		code = unescape(code);
		var c = String.fromCharCode(code.charCodeAt(0) - code.length);
		for (var i = 1; i < code.length; i++) {
			c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
		}
		return c;
	}

//判断验证激活方法   两个参数,一个是随机参数,一个是加密后的参数 
	$("#buttonActivate").on('tap',function () {
		var yuanma = $("#auuid").val();
		var jiamima =$("#mima").val();
		//把加密码转换成源码
		var zyuanma = uncompileStr(jiamima);
		console.log(yuanma);
		console.log(jiamima);
		console.log(zyuanma);
		//判断转换后的源码是否与自动生成的源码一致,然后进行判断
		if(zyuanma == yuanma){
			//调用后台方法,把后台字段的时间限制去掉
			slogin.activateUser(umodel,function(){
				//成功处理
				$('#layui-m-layer0').hide();
			},function(errorinfo){
				$('#layui-m-layer0').hide();
				mui.alert("登录失败!" + systemutil.parsestr(errorinfo));
			});
			alert("激活成功了！")
			
		}else{
			alert("激活码错误，请重新输入！！！")
		}
	});
	
  return activate;
});
	
	