define(['jquery',"mui","common","service/stock","model/UserModel",'utils/systemutil'], function ($,mui,common,stock,umodel,systemutil) {　　　　
  var addstock = {};
  addstock.init = function (page) {
  	mui.init();
	
	mui.plusReady(function(){
		// 关闭页面
		$("#back").on('tap',function(){
			console.log(11111);
			plus.webview.currentWebview().close();
		})
	});
	
  };
  return addstock;
});
