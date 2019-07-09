define(['jquery',"mui","common","service/system/userInfor","model/UserModel","muiview","utils/systemutil",'service/system/currentAbout',"dao/unlineimpl/initialization"], function ($,mui,common,userInforService,umodel,muiview,systemutil,currentAboutService,initialization) {　　　　
  var launch = {};
	
 	launch.init = function (page) {
		initialization.init();
 		mui.plusReady(function() {
			initialization.createTable();
 			launch.getCurrentAbout();	
	 		mui.currentWebview.addEventListener("show",function () {
	 			launch.toView();	
	 		});
		});
 	};
 	
 	/**
	 * 判断是否更新
	 */
	var btn = ["立即更新", "暂不更新"];
	var btn1 = ["立即更新", "本次跳转"];
 	launch.isUpdate = function(){
				var AppVersion = common.getVersion();
	 			var serverVersion = wcVersion.version;//数据库中的版本号
	 			//判断是否更新
	 		if(serverVersion>AppVersion){
	 			//是否强制更新wcVersion.updateDesc 是
	 			if(wcVersion.forceUpdate){
				 	var _msg = "发现新版本:" + wcVersion.version;
				 	if(systemutil.isNotBlank(wcVersion.updateDesc)){
				 		_msg += "\n更新描述:\n"+launch.splitUpdateDesc(wcVersion.updateDesc);
				 	}
					mui.confirm(_msg, '升级确认', btn, function(e) {
						if(e.index == 0) { //执行升级操作
							plus.nativeUI.toast("正在准备环境，请稍后！");
							if(launch.getPhoneType() == "android"){
								launch.downloadinstallapk(wcVersion.downloadUrl);
//									document.location.href = wcVersion.downloadUrl;
							}else{
								//IOS
								document.location.href = wcVersion.downloadUrl;
							}
						}else{
							if(launch.getPhoneType() == "android"){
								plus.runtime.quit();
							}else{
								console.log('1111');
								var threadClass = plus.ios.importClass("NSThread");
							    var mainThread = plus.ios.invoke(threadClass, "mainThread");
							    plus.ios.invoke(mainThread, "exit");
							}
						}
					});
	 			}else{
	 				//是否强制更新wcVersion.updateDesc 否
	 				var _msg = "发现新版本:" + wcVersion.version;
	 						if(systemutil.isNotBlank(wcVersion.updateDesc)){
						 		_msg += "\n更新描述:\n"+launch.splitUpdateDesc(wcVersion.updateDesc);
						 	}
					mui.confirm(_msg, '升级确认', btn1, function(e) {
						if(e.index == 0) { //执行升级操作
							plus.nativeUI.toast("正在准备环境，请稍后！");
							if(launch.getPhoneType() == "android"){
								launch.downloadinstallapk(wcVersion.downloadUrl);
							}else{
								//IOS 
								document.location.href = wcVersion.downloadUrl;
							}
						}else{
							launch.toView();
						}
					});
	 			}
	 		}else {
	 			//否
	 			launch.toView();
	 		}
	 
 	}
 	
 	launch.toView = function(){
 		if(systemutil.isBlank(plus.storage.getItem("token"))){
 			launch.toLogin();
 		}else{
 			launch.indexpreload();
 			launch.toIndex();
 		}
 	}
 	
 	  //安全协议跳转
  //预加载相关操作//
  var indepage;
  var index_loaded_flag = false;//最开始是false
  launch.indexpreload = function(){
  	indepage = mui.preload({
			"id": 'index',
			"url": 'index.html'
		});

		indepage.addEventListener("loaded",function () {
			index_loaded_flag = true;
		});
  }
 	
launch.toIndex = function() {

		//使用定时器的原因：
		//可能执行太快，main页面loaded事件尚未触发就执行自定义事件，此时必然会失败
		var i = 0;
		var id = setInterval(function () {
			if(index_loaded_flag){
				clearInterval(id);
					mui.fire(indepage, 'show', null);
					setTimeout(function(){
						indepage.show("pop-in");
					},500)
			}
		},20);
	};
	
	
	launch.toLogin = function() {
		var nwating = plus.nativeUI.showWaiting(); //显示原生等待框
    var webview_sub = plus.webview.create(
        'login.html',
        'login'
        ); //后台创建webview并打开页面
    webview_sub.addEventListener('loaded', function() {
        nwating.close(); //关闭等待框
        webview_sub.show('slide-in-right', 150); //把新的webview窗口显示出来
        
    }, false);
	};
	
	
	/**
	 * 获取手机类型  android / ios
	 */
	launch.getPhoneType = function() {
		var ua = navigator.userAgent.toLowerCase();
		if(/iphone|ipad|ipod/.test(ua)) {
			//苹果手机
			return "ios";
		} else {
			return "android";
		}
	}
	
	/**
	 * 获取版本信息
	 */
	var wcVersion = {};	
	launch.getCurrentAbout = function(){
		if(common.getDao().indexOf("onlineimpl") != -1){
	  	var params = {};
			params.plusType = launch.getPhoneType();
	  	if(common.networkState())
	  		var userModel = common.getUserInfo();
	  		mui.ajax({
			    url:common.getAllServerurl() +"wcVersionController/getVersionByPlus",
			    data: params,
			    async: true,
			    dataType: 'json',
			    timeout:3000,//超时时间设置为5秒；
			    crossDomain: true, //强制使用5+跨域
			    type: 'post',
			    success: function(data) {	
			        wcVersion = data.obj;
			        if(systemutil.isNotBlank(data.obj)){
			        	launch.isUpdate();	
			        }	else{
			        	launch.toView();
			        }
			    },
			    error: function(xhr, type, errorThrown) {
			       		mui.toast("无法连接到服务!");
			       		launch.toLogin();
			    }
				});
		}else{
			launch.toView();
		}
	}

	var wgtWaiting = null;
	/**
	 * 下载并开始安装apk文件
	 * @param {Object} url
	 */
	launch.downloadinstallapk = function(url) {
		launch.toLogin();
		wgtWaiting = plus.nativeUI.showWaiting("开始下载");
		var dtask = plus.downloader.createDownload(url, {}, function(d, status) {
			if(status == 200) {
				var path = d.filename; //下载apk
				plus.runtime.install(path); // 自动安装apk文件
			} else {
				plus.nativeUI.alert('版本更新失败:' + status);
				if(launch.getPhoneType() == "android"){
					plus.runtime.quit();
				}else{
					console.log('1111');
					var threadClass = plus.ios.importClass("NSThread");
				    var mainThread = plus.ios.invoke(threadClass, "mainThread");
				    plus.ios.invoke(mainThread, "exit");
				}
			}
		});
		dtask.addEventListener("statechanged", function (download, status) {
        switch (download.state) {
            case 2:
                wgtWaiting.setTitle("已连接到服务器");
                break;
            case 3:
                var percent = download.downloadedSize / download.totalSize * 100;
                wgtWaiting.setTitle("已下载 " + parseInt(percent) + "%");
                break;
            case 4:
                wgtWaiting.setTitle("下载完成");
                break;
        }
    });
		dtask.start();
	}
	
	launch.splitUpdateDesc = function(updateDesc){
		var updateDescArr = new Array();
		updateDescArr = updateDesc.split(";");
		updateDescArr = updateDesc.split("；");
		var updateDescStr = "";
		var rowCount = 0;
		for(var i=0;i<updateDescArr.length;i++){
			var strval = updateDescArr[i];
			if((updateDescStr.length + strval.length) > 66){
				strval = strval.substring(0,(60-updateDescStr.length));
				strval += "......";
				updateDescStr += strval;
				break;
			}else{
				updateDescStr+=strval+";\n"
			}
		}
		var lastThree = updateDescStr.substring(updateDescStr.length-3,updateDescStr.length);
		console.log(lastThree);
		if(lastThree.indexOf("\n")!=-1){
			updateDescStr = updateDescStr.substring(0,updateDescStr.length-2);
		}
		return updateDescStr;
	}
	
  return launch;
});
