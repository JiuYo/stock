define(['jquery',"mui","common","service/framecore/contact","model/UserModel"], function ($,mui,common,contactService,umodel) {　　　　
  var contact_sub = {};
  contact_sub.init = function (page) {
		mui.init({
			pullRefresh: {
					container: '#pullrefresh',
					down: {
						style:'circle',
						color:'#cccccc',
						callback: contact_sub.pulldownRefresh
					}
				}
		});
//		mui('.mui-scroll-wrapper').scroll();
		
		mui.plusReady(function() {
			contact_sub.getLinkManByUser();
			mui.currentWebview.addEventListener("show",function () {
				if($('#search').val('') != ""){
					$('#search').val('');
					$('.mui-search').removeClass('mui-active');
				}
			})
   });
}
  //获取联系人列表
  contact_sub.getLinkManByUser = function(){
  	contactService.getLinkManByUser([],function(data){
  		console.log(data.obj);
  		var userData = data.obj;
  		var html = '';
  		$.each(userData,function(i,obj){
					html +='<ul  class="mui-table-view mui-table-view-chevron" linkmanID="'+obj.id+'">'
					     +'<p>'+obj.groupname+'</p >'
					     $.each(obj.userList, function(i,obj) {
					     		html+='<li class="mui-table-view-cell liLink" userPhone="'+obj.mobilePhone+'">'
//						   		+'< a href=" ">'
							 		+'<div class="lxr-name">'
							 		if(obj.portrait){
							 			var serverurl = common.getServerurl();
							 			var headImg = serverurl + obj.portrait;
							 			html +='<div class="img_header"><img src="'+headImg+'" alt="" /></div>'
							 		}else{
							 			html +='<img src="../../images/cbd.jpg" alt="" />'
							 		}
							 		html +='<span userID="'+obj.id+'">'+obj.realName+'</span>'
							 		+'</div>'
//						   		+'</ a>'
					     		+'</li>'
					     });
				       html+='</ul>'  			
  		})
		$('.mui-scroll').append(html);
  	},function(errorinfo){
			mui.toast('失败,请重新登录!');
  	});
  };
  //前段检索
  $('#search').on('input',function(){
		var key = $(this).val();
		$('li,p').hide();
		$("li:contains("+key+")").show();
		$("li:contains("+key+")").parents('ul').find('p').show();
		
		$('[userPhone *= '+key+']').show();
		$('[userPhone *= '+key+']').parents('ul').find('p').show();
	})
    //联系人详情跳转
    $('.mui-scroll').on('tap', '.liLink', function(event) {
    			var userInfo = {};
					userInfo.userID = $(this).find('span').attr('userID');
					userInfo.linkmanID = $(this).parents('ul').attr('linkmanID');
					mui.openWindow({
					url: "lxrDetail.html",
					id: "lxrDetail.html",
					extras:{
				  	userInfo: userInfo
				  },
					show:{
						autoShow:  true  //页面loaded事件发生后自动显示，默认为true
					}
				});
		});
		
		//刷新
		contact_sub.pulldownRefresh = function(){
			setTimeout(function() {
  				$('.mui-scroll').html('');
  				$('#search').val('');
					contact_sub.getLinkManByUser();
					mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);
					mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
				}, 500);
		}
		
  return contact_sub;
});
