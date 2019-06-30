define(['jquery',"mui","common","service/stock/stock","model/UserModel",'utils/systemutil','vue'], function ($,mui,common,stock,umodel,systemutil,vue) {　　　　
  var showstock = {};
	var params = {};
  params.page = '';
  showstock.init = function (page) {
  	mui.init({
				pullRefresh: {
					container: '#pullrefresh',
					down: {
						style:'circle',
						color:'#cccccc',
						callback: showstock.getNewType
					},
					up: {
						auto:true,
						contentrefresh: '正在加载...',
						callback: showstock.getTypeDone
					}
				}
			});
	};
	mui.plusReady(function(){
		// showstock.getStockList();
	});
	
	//刷新页面
  	showstock.getNewType = function(){
  		params.page = "";
  		setTimeout(function() {
  				list.items = [];
					showstock.getTypeDone();
					mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);
					mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
				}, common.Time());
  	}
  	showstock.getTypeDone = function(){
  		var self = plus.webview.currentWebview();
			showstock.pullupRefresh(null);
  	}
  		
	/**
	 * 上拉加载具体业务实现
	 */
	showstock.pullupRefresh = function() {
		setTimeout(function() {
			params.page++;
			console.log(params.page);
			showstock.isGetByFun(null);
		}, common.Time());
	};
	
	  //把判断的方法提出来
   showstock.isGetByFun = function(filter){
   	if(params.page == "" || null == params.page || undefined == params.page) {
				params.page = 1;
			}
			params.rows = common.getPageSize();
		//判断全局变量,判读进入哪个方法
				console.log('22222');
				showstock.getStockList(filter);
  }
  
	 var list = new vue({
   	el:'.appendUL',
   	data:{
   		items:[]
   	}
   })
	
	// 获取列表的方法
	showstock.getStockList= function(filter){
		
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
		 // console.log(JSON.stringify(items));
		var newItems = [];
		// items.forEach(function(item) {
			for(var i=0;i<items.length;i++){
				item = items[i];
			newItems.push({
				id: systemutil.parsestr(item.id),
				imgSrc: "../images/huo.png",
				pname: systemutil.parsestr(item.pname),
				createTime: systemutil.parsestr(item.create_time),
				total: systemutil.parsestr(item.total),
				count: systemutil.parsestr(item.count),
				unit: systemutil.parsestr(item.unit ),
				price: systemutil.parsestr(item.price),
				date: systemutil.parsestr(item.date)
			});
		// });
		}
		return newItems;
	}
	

  return showstock;
});
