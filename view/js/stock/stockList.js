define(['jquery',"mui","common","service/stock/stock","model/UserModel",'utils/systemutil','vue'], function ($,mui,common,stock,umodel,systemutil,vue) {　　　　
  var stockList = {};
	var params = {};
	params.page = '';
  stockList.init = function (page) {
  	mui.init({
  			pullRefresh: {
  				container: '#pullrefresh',
  				down: {
  					style:'circle',
  					color:'#cccccc',
  					callback: stockList.getNewType
  				},
  				up: {
  					auto:true,
  					contentrefresh: '正在加载...',
  					callback: stockList.getTypeDone
  				}
  			}
  		});
	 };
	mui.plusReady(function(){
	
	});
	
	//刷新页面
		stockList.getNewType = function(){
			plus.webview.currentWebview().parent().evalJS("$('.mui-title').html('盘货明细');");
			params.page = "";
			setTimeout(function() {
					list.items = [];
					stockList.getTypeDone();
					mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);
					mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
				}, common.Time());
		}
		stockList.getTypeDone = function(){
			var self = plus.webview.currentWebview();
			stockList.pullupRefresh(null);
		}
			
	/**
	 * 上拉加载具体业务实现
	 */
	stockList.pullupRefresh = function() {
		setTimeout(function() {
			params.page++;
			console.log(params.page);
			stockList.isGetByFun(null);
		}, common.Time());
	};
	
	  //把判断的方法提出来
	 stockList.isGetByFun = function(filter){
	 	if(params.page == "" || null == params.page || undefined == params.page) {
				params.page = 1;
			}
			params.rows = common.getPageSize();
		//判断全局变量,判读进入哪个方法
				console.log('22222');
				stockList.getStockList(filter);
	}
	
	 var list = new vue({
	 	el:'.appendUL',
	 	data:{
	 		items:[]
	 	}
	 })
	
	// 获取列表的方法
	stockList.getStockList= function(filter){
		stock.getStockList(params,function(data){
			console.log(JSON.stringify(data));
					mui('#pullrefresh').pullRefresh().refresh(true);
					mui('#pullrefresh').pullRefresh().endPullupToRefresh( params.rows > data.length );
					if("" !== filter && undefined !== filter && null !== filter) {
						list.items = [];
					}
					list.items = list.items.concat(convert(data));
		},function(errorinfo){
	
			mui.alert("请求失败!" + systemutil.parsestr(errorinfo));
		});
	}
	
	 function convert(items) {
		var newItems = [];
			for(var i=0;i<items.length;i++){
			var	item = items[i];
			newItems.push({
				id: systemutil.parsestr(item.ID),
				imgSrc: "../images/huo.png",
				pname: systemutil.parsestr(item.pname),
				createTime: systemutil.parsestr(item.create_time),
				total: systemutil.parsestr(item.total),
				count: systemutil.parsestr(item.count),
				stock1: systemutil.parsestr(item.stock),
				sale1: systemutil.parsestr(item.sale),
				unit: systemutil.parsestr(item.unit ),
				price: systemutil.parsestr(item.price),
				date: systemutil.parsestr(item.date)
			});
		}
		return newItems;
	}
	
	//  列表点击事件
	$('.appendUL').on('tap',"li", function() {
			var listId = $(this).attr('data-id');
			console.log(listId);
				mui.openWindow({
					url: 'updatestock.html?id='+listId,
					id:  'updatestock.html?id='+listId,
					//参数
					extras:{
						id: listId,
						pageType : "update"
					},
					show:{
						//页面loaded事件发生后自动显示，默认为true
						autoShow:  true  
					}
				});
	})
	
	// 搜索事件
	$("#searchBtn").on('tap',function(){
		var searchVal = $("#searchValue").val();
		console.log(searchVal);
		if(systemutil.isNotBlank(searchVal)){
			params.pname_like = "%"+searchVal+"%";
			list.items = [];
			stockList.isGetByFun(null);
		}else{
			delete params.pname_like;
			list.items = [];
			stockList.isGetByFun(null);
		}
	})
	
	
 
  return stockList;
});
