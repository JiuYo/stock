define(['jquery',"mui","common","service/login","model/UserModel","utils/sysupdate","service/framecore/message"], function ($,mui,common,slogin,umodel,sysupdate,messageService) {　　　　
  var index = {};
  index.init = function (page) {
 	
	mui.plusReady(function(){
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
  		
  		
	    
	    //测试数据
	    var data = {
	    				"state": "yes",
				    	"version":"1.6.5",
				    	"title":"Hello H5+(1.6.5)版本更新",
				    	"note":"优化界面操作用户体验效果；\n修正关于页面的联系方式；\n修复一些其它已知的bug。\n",
				    	"url":"http://download.dcloud.net.cn/HelloH5.apk"
				    };
	    //sysupdate.androidUpdate(data,false,'1.0.0');
	    
		mui.currentWebview.addEventListener("show",function () {
			plus.navigator.setStatusBarBackground("#000000");
			plus.navigator.setStatusBarStyle("UIStatusBarStyleBlackOpaque");
	    var pages = ["stock/showstock.html","stock/stocklist.html","framecore/me/me.html"];
	    var pagenames =  ["商品展示","盘点明细","个人中心"];
	    var arr = document.getElementsByClassName("mui-tab-item")
	    var styles = {
	        top:"45px",
	        bottom:"51px"
	    }
	    var pageArr = [];
	    var slef = plus.webview.currentWebview();
	    for(var i=0; i<arr.length; i++){
	        // 有几个选项卡，需要创建几个子页面
	        var page = plus.webview.create(pages[i],pages[i],styles);
	        pageArr.push(page);
	        !function(i){
	            arr[i].addEventListener("tap",function(){
	                // 让当前页面(i)显示，不是当前页面隐藏
	                for(var j=0; j<pageArr.length; j++){
	                    if(j!=i) pageArr[j].hide();
	                    else 
	                    {
	                    		pageArr[j].show();
	                    		$(".mui-title").html(pagenames[i]);
	                    }
	                }
	                /* 让新创建的webview，追加合并到当前的窗口上。合并成一个窗口。
	                 * 目的：将父子窗口合并成一个页面，实现同开同关的效果。 避免点击返回安监室，子页面先关闭，而父页面的头部和尾部没有关闭的BUG。
	                 */
	                slef.append(pageArr[i]);
	            })
	        }(i);
	    }
	    // 默认触发第0个选项卡的tap事件。
	   
	   		 mui.trigger(arr[0],"tap");
				$('.xiaoxiButton').addClass('mui-active')
			 	$('.wodeButton').removeClass('mui-active')
			 	$('.applistButton').removeClass('mui-active')
		})
	});

  };
	
	
  return index;
});
