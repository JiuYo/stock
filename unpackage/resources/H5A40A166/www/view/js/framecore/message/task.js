define(['jquery',"mui","common","service/framecore/message","model/UserModel"], function ($,mui,common,messageService,umodel) {　　　　
  var task = {};
  task.init = function (page) {
			
					mui.init({
						gestureConfig:{
							doubletap:true
						},
						subpages:[{ 
							url:'task_sub.html',
							id:'task_sub.html',
							styles:{
								top: '34px',
								bottom: '0px', 
							}
						}] 
					});
			
		
	
		/*mui.plusReady(function() {
        mui.currentWebview.addEventListener("show",function () {
            console.info("show");
            task.getUserMessageList();
        })
    }*/
	
		/*	var contentWebview = null;
		document.querySelector('.mui-search').addEventListener('doubletap',function () {
			if(contentWebview==null){
				contentWebview = plus.webview.currentWebview().children()[0];
			}
			contentWebview.evalJS("mui('#pullrefresh').pullRefresh().scrollTo(0,0,100)");
		});*/
		document.querySelector('.btnsearch').addEventListener('click',function () {
				mui.openWindow({
					  url: "search.html",
					  id: "search.html",
					  //extras: eval("({"+data.params+"})"),
					  show: {
					        autoShow: true //页面loaded事件发生后自动显示，默认为true
				    }
				});
		});
		
  };
  
  	/*//获取消息列表
   task.getUserMessageList = function(){
  	messageService.getUserMessageList([],function(data){
  		console.log(data.msg);
  		console.log(JSON.stringify(data.obj));
  	},function(errorinfo){
  		if(typeof(errorinfo) == Object)
	        mui.alert("失败!"+errorinfo.msg);
	    else
	        mui.alert("失败!"+errorinfo);
  	});
  };*/
  
  return task;
});
