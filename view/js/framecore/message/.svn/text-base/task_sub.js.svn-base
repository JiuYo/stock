define(['jquery',"mui","common","service/framecore/message","model/UserModel","../../index","utils/systemutil"], function ($,mui,common,messageService,umodel,indexView,systemutil) {　　　　
  var task_sub = {};
  var params = {};
  params.keyWords = '';
  params.isEmpty = false;
  var refreshsss = false;
  var isloading = true;
  task_sub.init = function (page) {
  		
			mui.init({
				pullRefresh: {
					container: '#pullrefresh',
					down: {
						callback: task_sub.pulldownRefresh
					},
					up: {
						auto:true,
						contentrefresh: '正在加载...',
						callback: task_sub.pullupRefresh
					}
				}
			});
						//添加待办任务点击事件
		mui('.mui-content .mui-table-view').on('tap', '.mui-slider-handle', function(e) {
      $(this).find(".relative").find(".red-circle").remove();
		  // 点击去掉未读红点
			//跳转方式1：内部跳转，2外部跳转，3：消息详细（内部跳转）
			  var id = this.getAttribute('data-jumpType');
			  var jumpUrl = this.getAttribute("data-jumpUrl");//跳转路径
			  var pageName = common.getQueryString(jumpUrl,"pageName");
			  var roleCode = common.getQueryString(jumpUrl,"roleCode");
			  common.getOperationalRoles(roleCode);
			  var jumpParams = this.getAttribute("data-paramsvalue");//传递的参数
			  messageid = this.getAttribute("data-messageid");//message的ID
			  var OldVersion = this.getAttribute("data-version");
			  var messageParamsData = {};
			  var arrJumpParams = jumpParams.split(",");
			     for(var i=0;i<arrJumpParams.length;i++){
			         var arrData = arrJumpParams[i].split(":");
			         messageParamsData[arrData[0]]=arrData[1];
			     }
			    messageParamsData.version = OldVersion;
			    messageParamsData.pageName = pageName;

			   //根据id获取详细信息
			  //外部跳转测试
			  var testdata1 = {
			  	jumpType:2,
			  	title:'测试',
			  	url:jumpUrl,
			  	params:messageParamsData
			  }
			  //内部跳转
			  var testdata = {
			  	jumpType:1,
			  	title:'测试',
			  	url:"../"+jumpUrl,
			  	params:messageParamsData
			  };
			  
			  
			  var data = testdata;
			  if(id == 1)
			  	data = testdata;
			  else
			  	data = testdata1;
			 if(data.jumpType == 2)
			 {
		      task_sub.getMessageRead(messageid);
			 		task_sub.jumpOutPage(data);
			 }
			 else
			 {
			    task_sub.getMessageRead(messageid);
			 		task_sub.jumpInnerPage(data);	
			 }
		});
  };
  
   var btnArray = ['确认', '取消'];
			//点击删除
	$('#OA_task_1').on('tap', '.mui-btn', function(event) {
			event.stopPropagation();
			event.preventDefault();
			var elem = this;
			var li = elem.parentNode.parentNode;
			messageid = $(li).find(".mui-selected").next().attr("data-messageid");
			mui.confirm('确认删除该条记录？',"提示",btnArray, function(e) {
				if (e.index == 0) {
					li.parentNode.removeChild(li);
					task_sub.delMessage(messageid);
				} else {
					setTimeout(function() {
						mui.swipeoutClose(li);
					}, 0);
				}
			});
		});
  
  var messageid = null;
  
	/**
	 * 跳转到外面页面
	 * @param {Object} url
	 */
  task_sub.jumpOutPage = function(data){
	  	if(data.url.indexOf("?")>0)
	  	{
	  		data.url +="&"+data.params;
	  	}
	  	else if(data.params.length>0)
	  	{
	  		data.url +="?" +data.params;
	  	}
	  	
	  	 var nwating = plus.nativeUI.showWaiting(); //显示原生等待框
        var webview_sub = plus.webview.create(
            'outpage/page.html',
            'outpagepagehtml', {}, data); //后台创建webview并打开页面
        webview_sub.addEventListener('loaded', function() {
            nwating.close(); //关闭等待框
            webview_sub.show('slide-in-right', 50); //把新的webview窗口显示出来
        }, false);
  }
  /**
   * 内部跳转
   */
  task_sub.jumpInnerPage = function(data){
  		mui.openWindow({
				  url: data.url,
				  id: data.url,
				  extras :{
				    messageparams:data.params
				  },
				  show: {
				        autoShow: true //页面loaded事件发生后自动显示，默认为true
			    }
			});
  }
  
  
  		/**
			 * 下拉刷新具体业务实现
			 */
			task_sub.pulldownRefresh = function() {
				if(isloading){
					isloading = false;
					refreshsss = true;
					$('#search').val('');delete params.keyWords;
					$('#search').blur();
					var parentView = plus.webview.currentWebview().opener();
					mui.fire(parentView,'pulldown');
					$('#OA_task_1').html("");
					params.page = 1;
					task_sub.getUserMessageList();
				}
				

			}
			/**
			 * 上拉加载具体业务实现
			 */
			var count = 0;
			task_sub.pullupRefresh = function() {
				if(isloading){
					isloading = false;
					if(params.page == "" || null == params.page || undefined == params.page) {
						params.page = count;
					}
					params.page ++;
					task_sub.getUserMessageList();
				}
			};
			
//		获取时间
		function getNowFormatDate() {
			var date = new Date();
			var seperator1 = "-";
			var year = date.getFullYear();
			var month = date.getMonth() + 1;
			var strDate = date.getDate();
			if(month >= 1 && month <= 9) {
				month = "0" + month;
			}
			if(strDate >= 0 && strDate <= 9) {
				strDate = "0" + strDate;
			}
			var currentdate = year + seperator1 + month + seperator1 + strDate;
			return currentdate;
		}
			
		//获取消息列表
   task_sub.getUserMessageList = function(){
			params.rows = common.getPageSize();
			console.log(JSON.stringify(params));
  	messageService.getUserMessageList(params,function(data){
  		if(refreshsss){
  			mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
  			refreshsss = false;
  		}
			if(params.isEmpty){
				$('#OA_task_1').html('');
				params.isEmpty = false;
			}
       task_sub.getUnreadCount();
  		if(data.obj){
  			console.log(common.getHttpServerUrl());
  			
  			mui('#pullrefresh').pullRefresh().refresh(true);
			 	mui('#pullrefresh').pullRefresh().endPullupToRefresh( params.rows > data.obj.length );
//			 	if(params.rows > data.obj.length){
//			 		setTimeout(function(){
//			 			mui('#pullrefresh').pullRefresh().disablePullupToRefresh();
//			 		},2000)
//			 	}
	  		var html = '';
  			$.each(data.obj,function(i,obj){
	  			html +='<li class="mui-table-view-cell mui-media">'
							 +'<div class="mui-slider-right mui-disabled">'
							 +'<a class="mui-btn mui-btn-red">删除</a>'
							 +'</div>'
 +'<div class="mui-slider-handle" data-messageid="'+obj.id+'" data-paramsvalue="'+obj.params+'" data-jumpType="'+obj.jumpType+'"  data-jumpUrl="'+obj.jumpUrl+'"   data-version="'+obj.version+'">'
							 +'<div class="relative">'
							 +'<img class="mui-media-object mui-pull-left" src="'+ common.getHttpServerUrl() +''+obj.imgUrl+'">'
							 if(!obj.msgRead){
							    html += '<span class="red-circle"></span>'
							 }
							 html +='</div>'
							 +'<div class="mui-media-body">'
							 +'<p class="mui-clearfix">'
							 +'<span class="mui-pull-left message-title mui-ellipsis-2">'+obj.title+'</span>'
							 +'<span class="mui-pull-right">'+ common.formatSolrTime(obj.createDate) +'</span>'
							 +'</p>'
							 +'<p class="mui-ellipsis">'+obj.content+'</p>'
							 +'</div>'
							 +'</div>'
						   +'</li>'
	  		})
	  		$('#OA_task_1').append(html);
	  		console.log($('#OA_task_1 li').length);
	  		if($('#OA_task_1 li').length){
//	  			$('.noData').hide();
	  		}else if(!$('#OA_task_1 li').length){
//	  			$('.noData').show();
	  		}
  		}
  		isloading = true;
  	},function(errorinfo){
  		if(typeof(errorinfo) == Object)
            mui.alert("失败!"+errorinfo.msg);
        else
            mui.alert("失败!"+errorinfo);
  	});
  }
  
  
  //调用消息已读接口
  task_sub.getMessageRead = function(messageid){
  var readParams = {};
  readParams.id = messageid;
    messageService.getMessageRead(readParams,function(data){
        console.log(JSON.stringify(data));
        task_sub.getUnreadCount();
    },function(errorinfo){
        if(typeof(errorinfo) == Object)
            mui.alert("失败!"+errorinfo.msg);
        else
            mui.alert("失败!"+errorinfo);
    });
  }
  
  task_sub.delMessage = function(messageid){
  var delParams = {};
  delParams.id = messageid;
    messageService.delMessage(delParams,function(data){
//      console.log(JSON.stringify(data));
        task_sub.getUnreadCount();
    },function(errorinfo){
        if(typeof(errorinfo) == Object)
            mui.alert("失败!"+errorinfo.msg);
        else
            mui.alert("失败!"+errorinfo);
    });
  }
  
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
  
  task_sub.getUnreadCount = function(){
        messageService.getUnreadCount(null,function(data){ 
         
        if(data.obj){
           plus.webview.currentWebview().parent().evalJS("$('.icon-xiaoxi').html(\"<span class='mui-badge mui-badge-danger'>"+data.obj+"</span>\")");
        }else{
            plus.webview.currentWebview().parent().evalJS("$('.icon-xiaoxi').html('')");
        }
    },function(errorinfo){
        if(typeof(errorInfo) == Object)
                mui.alert("失败!"+errorinfo.msg);
            else
                mui.alert("失败!"+errorinfo);
    });
    }
  
  return task_sub;
});
