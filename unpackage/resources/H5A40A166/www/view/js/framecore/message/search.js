define(['jquery',"mui","common","service/login","model/UserModel","service/problem/problem","service/component/component","service/framecore/app","service/fault/fault","utils/systemutil","service/kit/kit"], function ($,mui,common,slogin,umodel,problemService,componentService,appService,faultService,systemutil,kitService) {　　　　
  var search = {};
  search.init = function (page) {
		mui.init({
			pullRefresh: {
					container: '#pullrefresh',
					up: {
						contentrefresh: '正在加载...',
						callback: search.pullupRefresh
					}
				}
		});
		
  	search.isDisplayTitle(
  		function(){
  			$(".tabTitle").children('a').each(function(){
	  			if(!$(this).is(':hidden')){
	  				isProOrCon = this.id;
	  				search.isGetFun();
	  				isHideenTle = 0;
	  				return false;
	  			}
	  		})

				var reg = /^\s+$/;
				if(isHideenTle == 1 && reg.test($(".appendUL").text())){
					//提示没有权限并将全局变量设为空
					isProOrCon = "";
					$('.noData').html('您目前还没有这里的相关权限呀!');
					$('.noData').show();
				}
  		}
  	);
  	
  	

  	
  };
  
  //定义全局变量
  var isProOrCon = "";
  var params = {};
  var isHideenTle = 1;
  
  
  //判断是否显示title
  search.isDisplayTitle = function(successApp){
  	appService.getFuncByUserForApp(null,function(data){
  		var data = data.obj;
  		$.each(data, function(i,obj) {
	     	$.each(obj.tSFunctions, function(i,obj) {
	     		//是否有已发布的列表
	     		if(obj.functionUrl.indexOf("problemList.html?proStatus=2") != -1){
	     			$("#problemSerach").show();
	     		}
	     		//是否有全部成品的列表
	     		if(obj.functionUrl.indexOf("allComponentList.html") != -1){
	     			$("#componentSerach").show();
	     		}
	     		//是否有包装箱列表
	     		if(obj.functionUrl.indexOf("faultList.html?pageName=fiveSearch&caseState=999") != -1){
	     			$("#faultSerach").show();
	     		}
	     		//是否有
	     		if(obj.functionUrl.indexOf("kit/deliverablesList.html?pageName=deliverablesList") != -1){
	     			$("#deliverablesDetailSerach").show();
	     		}
	     	});
  		});
  		successApp();
  	},function(errorinfo){
  		if(typeof(errorinfo) == Object)
				mui.alert("失败!"+errorinfo.msg);
			else
				mui.alert("失败!"+errorinfo);
  	});
  }
  
  //点击搜索
  document.getElementById("search").addEventListener('tap',function(){
  	$('.appendUL').html(" ");
  	$('.appendUL0').html(" ");
  	var searchData = $('#searchValue').val();
  	searchData = $.trim(searchData);
  	params.page = 1;
  	params.rows = common.getPageSize();
  	params.keyWords = searchData;
  	search.isGetFun();
  })
  //问题报告单
  document.getElementById("problemSerach").addEventListener('tap',function(){
  	$('.appendUL').html(' ');
  	isProOrCon = "problemSerach";
		search.isGetFun();
  })
  //成品返修单
  document.getElementById("componentSerach").addEventListener('tap',function(){
  	$('.appendUL').html(' ');
  	isProOrCon = "componentSerach";
		search.isGetFun();
  })
  //包装箱
  document.getElementById("faultSerach").addEventListener('tap',function(){
  	$('.appendUL').html(' ');
  	isProOrCon = "faultSerach";
		search.isGetFun();
  })
  //雷云交付物
  document.getElementById("deliverablesDetailSerach").addEventListener('tap',function(){
  	$('.appendUL').html(' ');
  	isProOrCon = "deliverablesDetailSerach";
		search.isGetFun();
  })
  
  search.getProblemList = function(filter){
  	var filter = filter;
  	params.proStatus = 2;
  	problemService.getProblemByProstats(params,function(data){
				console.log(JSON.stringify(data.obj));
				console.log(JSON.stringify(params));
				mui('#pullrefresh').pullRefresh().refresh(true);
			 mui('#pullrefresh').pullRefresh().endPullupToRefresh( params.rows > data.obj.length );
				var html = "";
				$.each(data.obj, function(i, obj) {
					html += '<li class="mui-table-view-cell mui-media" data-id="'+obj.id+'" data-prostatus="'+obj.proStatusName+'"  data-version="'+obj.version+'" >' +
						'<img class="mui-media-object mui-pull-left" src="'+common.getListImgPath(obj.materialType)+'">' +
						'<div class="mui-media-body mui-clearfix">'
						if(obj.problemListNum){
							html+='<span class="order-con">报告单号:<span class="order-num">'+obj.problemListNum+'</span></span>'							
								+'<span class="right-time mui-pull-right">'+common.formatSolrTime(obj.createTime)+'</span>'
							  +'<p class="order-list"><span>图号:</span><span class="pic-num">'+obj.drawingNo+'</span></p>'
						}else{
							html+='<span class="order-con">图号:<span class="order-num">'+obj.drawingNo+'</span></span>'
								  +'<span class="right-time mui-pull-right">'+common.formatSolrTime(obj.createTime)+'</span>'
						}
					html += '<p class="order-list mui-ellipsis"><span>型号/牌号:</span><span class="apply-reason">'+systemutil.parsestr(obj.marque)+'</span></p>'+
						'<p class="order-list"><span>数量:</span><span class="apply-reason">' + obj.qty + '' + obj.unitName + '</span></p>' +
						'<p class="order-list"><span>原因:</span><span class="apply-reason">'+obj.reasonName+'</span></p>' +
						'<p class="order-list"><span>状态:</span><span class="audit-pass">'+obj.proStatusName+'</span></p>' +
						'</div>'
					  +'</li>'
				})
				if(null == filter || undefined == filter || "" == filter){
					$('.appendUL').html("");
				}
				$('.appendUL').append(html);
				if($('.appendUL li').length){
					$('.noData').hide();
				}else{
					$('.noData').show();
				}
		},function(errorInfo){
			$('#layui-m-layer0').hide();
			if(typeof(errorInfo) == Object)
				mui.alert("失败!"+errorInfo.msg);
			else
				mui.alert("失败!"+errorInfo);
		});
  }
  
  //获取日期
  getNowFormatDate = function() {
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
  
  search.getComponentList = function(filter){
  	delete params.proStatus;
  	componentService.allComponentList(params,function(data){
				console.log(JSON.stringify(data.obj));
				console.log(JSON.stringify(params));
				mui('#pullrefresh').pullRefresh().refresh(true);
			 mui('#pullrefresh').pullRefresh().endPullupToRefresh( params.rows > data.obj.length );
				var html = '';
				$.each(data.obj, function(i, obj) {
					html += '<li class="mui-table-view-cell mui-media" data-id="'+obj.id+'">' +
						'<img class="mui-media-object mui-pull-left" src="'+common.getListImgPath(obj.responsibleParty)+'">' +
						'<div class="mui-media-body mui-clearfix">' +
						'<span class="order-con">图号:<span class="order-num">' + obj.drawingNumber + '</span></span>'+
						'<span class="right-time mui-pull-right">'+common.formatSolrTime(obj.createTime) +'</span>'+
					  '<p class="order-list"><span>名称:</span><span class="pic-num">' + systemutil.parsestr(obj.chName) + '</span></p>' +
						'<p class="order-list"><span>件号:</span><span class="pro-num">' + systemutil.parsestr(obj.pieceNum) + '</span></p>' +
						'<p class="order-list mui-ellipsis"><span>型号/牌号:</span><span class="apply-reason">'+systemutil.parsestr(obj.marque)+'</span></p>'+
						'<p class="order-list"><span>数量:</span><span class="apply-reason">' + obj.qty + '' + obj.unitName + '</span></p>' +
						'<p class="order-list"><span>OEM厂商:</span><span class="vendor">' + systemutil.parsestr(obj.oemDeptName) + '</span></p>' +
						'</div>'
					if(obj.isOverdue) {
						html += '<div class="triangle">' +
							'<span class="triangle_tit">超期</span>' +
							'</div>'
					}
					html+='</li>'
				})
				$('.appendUL').append(html);
				if($('.appendUL li').length){
					$('.noData').hide();
				}else{
					$('.noData').show();
				}
		},function(errorInfo){
			if(typeof(errorInfo) == Object)
				mui.alert("失败!"+errorInfo.msg);
			else
				mui.alert("失败!"+errorInfo);
		});
  }
  
  search.getFaultList = function(filter){
  	var filter = filter;
		params.caseState = "999";
		faultService.getPackingBOXList(params,function(data){
		//判断返回数据的数量
		mui('#pullrefresh').pullRefresh().refresh(true);
		mui('#pullrefresh').pullRefresh().endPullupToRefresh( params.rows > data.obj.length );
		var html = '';
		$.each(data.obj, function(i,obj) {
		html += '<li class="mui-table-view-cell mui-media" data-id="'+obj.id+'" data-version="'+obj.version+'" data-opt="'+obj.opt+'" data-state="'+obj.state+'"  data-version="'+obj.version+'">' +
			'<a class="mui-navigate-right">' +
			'<img class="mui-media-object mui-pull-left" src="../../images/box.png">' +
			'<div class="mui-media-body mui-clearfix">' +
			'<span class="order-con">包装箱号:<span class="order-num">' + obj.caseNo + '</span></span>'+
			'<span class="right-time mui-pull-right">' + common.formatSolrTime(obj.createTime) + '</span>'
			+'<p class="order-list"><span>交付物数量:</span><span class="pic-num">' 
			+ obj.faultQty 
			+ '</span></p>' 
			+'<p class="order-list"><span>状态:</span><span class="pro-num">' 
			+ obj.caseStateName + '</span></p>' 
			+ '</div>'
		if(obj.caseState == 6) {
			html += '<div class="trianglesmall">' +
				'<span class="triangle_tit">异</span>' +
				'</div>'
		}
		html += '</a>' 
		     +'</li>'
		})
		if(null == filter || undefined == filter || "" == filter) {
			$('.noData').hide();
			$('.appendUL').html("");
//			$('.appendUL').find('li').remove();
		}
		$('.appendUL').append(html);
		console.log($('.appendUL li').length);
		}, function(errorInfo) {
			if(typeof(errorInfo) == Object)
				mui.alert("失败!"+errorInfo.msg);
			else
				mui.alert("失败!"+errorInfo);
		})
  }
  
  search.getDeliverablesList = function(filter){
  	var filter = filter;
  	console.log(JSON.stringify(params));
		kitService.deliverablesList(params,function(data){
			console.log(JSON.stringify(data.obj));
		//判断返回数据的数量
		mui('#pullrefresh').pullRefresh().refresh(true);
		mui('#pullrefresh').pullRefresh().endPullupToRefresh( params.rows > data.obj.length );
		var html = '';
		$.each(data.obj, function(i,obj) {
			 		html +='<li class="mui-table-view-cell mui-media" data-id="'+obj.id+'">'
							+'<a class="mui-navigate-right">'
							+'<img class="mui-media-object mui-pull-left" src="'+common.getListImgPath('lei')+'">'
							+'<div class="mui-media-body mui-clearfix">'
							+'<p class="order-list mui-clearfix">'
							+'<span class="order-con mui-ellipsis mui-pull-left" style="width: 70%;">图号:<span class="order-num">'+systemutil.parsestr(obj.fPartNo)+'</span></span>'
							+'<span class="right-time mui-pull-right">'+common.formatSolrTime(obj.fEditDate)+'</span>'
							+'</p>'
							+'<p class="order-list mui-ellipsis"><span>型号/牌号:</span><span class="apply-reason">'+systemutil.parsestr(obj.marque)+'</span></p>'
							+'<p class="order-list mui-ellipsis"><span>条码号:</span><span class="pic-num">'+systemutil.parsestr(obj.fBarcode)+'</span></p>'
							+'<p class="order-list""><span>数量:</span><span class="pro-num">'+systemutil.parsestr(obj.fQty)+''+systemutil.parsestr(obj.fUnit)+'</span></p>'
							+'<p class="order-list"><span>发运批次:</span><span class="apply-reason">'+systemutil.parsestr(obj.fShipBatch)+'</span></p>'
							+'<p class="order-list"><span>包装箱号:</span><span class="pro-num">'+systemutil.parsestr(obj.fPCaseNo)+'</span></p>'
							+'<p class="order-list"><span>状态:</span><span class="audit-pass">'+systemutil.parsestr(obj.kitStatusName)+'</span></p>'
							+'</div>'
							+'</a>'
			 	});
		if(null == filter || undefined == filter || "" == filter) {
			$('.noData').hide();
			$('.appendUL').html("");
//			$('.appendUL').find('li').remove();
		}
		$('.appendUL').append(html);
		console.log($('.appendUL li').length);
		}, function(errorInfo) {
			if(typeof(errorInfo) == Object)
				mui.alert("失败!"+errorInfo.msg);
			else
				mui.alert("失败!"+errorInfo);
		})
  }
  
  //分页
		search.pullupRefresh = function() {
				params.page++;
				setTimeout(function() {
					search.isGetFun("11111111");
				}, 500);

		};
  
  //判断进入那个方法
  search.isGetFun = function(filter){
  	console.log(isProOrCon);
  	var filter = filter;
  		if(isProOrCon == "problemSerach"){
  			if(null == filter || undefined == filter || "" == filter){
					params.page = 1;
				}
  			search.getProblemList(filter);
  		}else if(isProOrCon == "componentSerach"){
  			if(null == filter || undefined == filter || "" == filter){
					params.page = 1;
				}
  			search.getComponentList(filter);
  		}else if(isProOrCon == "faultSerach"){
  			if(null == filter || undefined == filter || "" == filter){
					params.page = 1;
				}
  			search.getFaultList(filter);
  		}else if(isProOrCon == "deliverablesDetailSerach"){
  			if(null == filter || undefined == filter || "" == filter){
					params.page = 1;
				}
  			search.getDeliverablesList(filter);
  		}
  }
  
  
  		//列表的点击事件
			$('.appendUL').on('tap', 'li', function(event) {	
				var id = $(this).attr("data-id");
				console.log($(this).attr("data-id"));
				var prostatus = $(this).attr("data-prostatus");
				var oldVersion = $(this).attr("data-version");
				var value = $(this).attr("data-id");
				var version = $(this).attr("data-version");
				var boxNum = $(this).find('.order-num').html();
				console.log("prostatus" + prostatus);
				if(isProOrCon == "problemSerach"){
					mui.openWindow({
						url: '../../problem/problemDetailProgress.html?id='+id,
						id:  '../../problem/problemDetailProgress.html?id='+id,
						//参数
						extras: { 
							id: id,
							oldVersion : oldVersion,
							prostatus : prostatus
						},
						show:  {        
							//页面loaded事件发生后自动显示，默认为true    
							autoShow:  true  
						}
					});
				}else if(isProOrCon == "componentSerach"){
					mui.openWindow({
						url: '../../component/allComponentDetail.html',
						id:  '../../component/allComponentDetail.html',
						//参数
						extras: { 
							sid: id
						},
						show:  {        
							//页面loaded事件发生后自动显示，默认为true    
							autoShow:  true  
						}
					});
				}else if(isProOrCon == "faultSerach"){
					mui.openWindow({
						url: '../../fault/fiveDifferentList.html',
						id:  '../../fault/fiveDifferentList.html',
						//参数
						extras: { 
							sid: value,
							caseState:"999",
							pageName:"fiveSearch",
							boxNum:boxNum
						},
						show:  {        
							//页面loaded事件发生后自动显示，默认为true    
							autoShow:  true  
						}
					});
				}else if(isProOrCon == "deliverablesDetailSerach"){
					//从跳转地址截取二级搜索筛选参数
					mui.openWindow({
						url: '../../kit/deliverablesDetail.html',
						id:  '../../kit/deliverablesDetail.html',
						//参数
						extras:{
							listId: id
						},
						show:{
							autoShow:true  
						},
						waiting:{
							autoShow:false
						}
					});
				}
				
		});
		
		
  return search;
});
