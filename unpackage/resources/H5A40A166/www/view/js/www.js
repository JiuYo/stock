define(['jquery',"mui","common","service/system/userInfor","model/UserModel","muiview","utils/systemutil"], function ($,mui,common,userInforService,umodel,muiview,systemutil) {　　　　
  var launch = {};

 	launch.init = function (page) {
 		mui.plusReady(function() {
	 		launch.toView();	 		
	 		mui.currentWebview.addEventListener("show",function () {
	 			launch.toView();
	 		});
  	});
 	};
 	
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
	
	
  return launch;
});
