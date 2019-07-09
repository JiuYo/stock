define(['jquery',"mui","common","service/framecore/contact","model/UserModel"], function ($,mui,common,contactService,umodel) {　　　　
  var contact = {};
  contact.init = function (page) {
		
		mui.plusReady(function() {
			mui.currentWebview.addEventListener("show",function () {
					mui.init({
						gestureConfig:{
							doubletap:true
						},
						subpages:[{ 
							url:'contact_sub.html',
							id:'contact_sub.html',
							styles:{
								top: '40px',
								bottom: '0px', 
							}
						}] 
						
					});
				})
    });
		
		
	
//		var contentWebview = null;
//		document.querySelector('.mui-search').addEventListener('doubletap',function () {
//			if(contentWebview==null){
//				contentWebview = plus.webview.currentWebview().children()[0];
//			}
//			contentWebview.evalJS("mui('#pullrefresh').pullRefresh().scrollTo(0,0,100)");
//		});
			
			document.getElementById("search").addEventListener("keypress",function(event) {
					console.log()
			    if(event.keyCode == "13") {
			        document.activeElement.blur();//收起虚拟键盘
			        event.preventDefault(); // 阻止默认事件---阻止页面刷新
			    }
			});
  };
  
 
  
  return contact;
});
