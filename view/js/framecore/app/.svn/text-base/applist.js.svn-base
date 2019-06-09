define(['jquery',"mui","common","service/framecore/app","model/UserModel"], function ($,mui,common,appservice,umodel) {　　　　
  var applist = {};
  applist.init = function (page) {
		mui.init();
		mui.plusReady(function() {
			applist.getFuncByUserForApp();
    });
    

			// 应用链接列表
    $('.mui-content').on('tap', '.fxUrl', function(event) {
    			var postData = {}
    			postData.urlHref = $(this).attr('linkurl');
    			postData.title = $(this).find('.mui-ellipsis').html();
    			var index = postData.urlHref.lastIndexOf('?');
    			if(index !== -1){
    				detailroot = postData.urlHref.substring(0, index);
    			}else{
    				detailroot = postData.urlHref;
    			}
					mui.openWindow({
					url: '../../' + detailroot,
					id:  '../../' + detailroot,
					extras: {
						postData:postData
					},
					show:  {        
						autoShow:  true  //页面loaded事件发生后自动显示，默认为true
						    
					}
				});
		});
};
  
  
  applist.getFuncByUserForApp = function(){
  	appservice.getFuncByUserForApp({'aaa':'abc'},function(data){
  		var data = data.obj;
  		var html = '';
  		$.each(data, function(i,obj) {
  			html += '<div class="mui-bgd">'
				     +'<p>'+obj.functionName+'</p>'
				     +'<ul class="icon-container">'
				     $.each(obj.tSFunctions, function(i,obj) {
				     	html +='<li class="fxUrl" linkUrl="'+obj.functionUrl+'">'
						 			 +'<span class="mui-icon iconfont '+obj.funClassname+' '+obj.funClassbgcolor+'"></span>'
						       +'<h5 class="mui-ellipsis">'+obj.functionName+'</h5>'
					         +'</li>'
				     }); 
				    html +='</ul>'
			      +'</div>'
  		});
  		$('.mui-content').append(html);
  	},function(errorinfo){
  		if(typeof(errorinfo) == Object)
				mui.alert("失败!"+errorinfo.msg);
			else
				mui.alert("失败!"+errorinfo);
  	});
  }
  
  return applist;
});
