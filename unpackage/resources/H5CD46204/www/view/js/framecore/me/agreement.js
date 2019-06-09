define(['jquery',"mui","common","service/system/userInfor","model/UserModel","utils/validate_util",'layer/layer'], function ($,mui,common,userInforService,umodel,validateUtil,layer) {　　　　
  var agreement = {};
  var readed = "";
  agreement.init = function (page) {
 		mui.init();
		//初始化单页的区域滚动
		mui('.mui-scroll-wrapper').scroll();
  };
  mui.plusReady(function(){
  		plus.navigator.setStatusBarBackground("#000000");
			plus.navigator.setStatusBarStyle("UIStatusBarStyleBlackOpaque");
			var isShowButton = plus.webview.currentWebview().isShowButton;
			if(isShowButton != 'display'){
				$('.readed').show();
			}
  })
  
  $('.readed').on('tap',function(){
  	readed = readed;
  	var view = plus.webview.currentWebview().opener();
				mui.fire(view,'readed',{
				    readed:readed
				});
				mui.back();
  	})

  
  return agreement;
});
