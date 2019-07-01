define(['jquery',"mui","common","service/stock/stock","model/UserModel",'utils/systemutil',"utils/dateutil"], function ($,mui,common,stock,umodel,systemutil,dateutil) {　　　　
  var updatestock = {};
	var id = "";
	var pageType = "";
  updatestock.init = function (page) {
  	mui.init();
	};
	mui.plusReady(function(){
		var currentView = plus.webview.currentWebview();
		id = plus.webview.currentWebview().listId;
		pageType = plus.webview.currentWebview().pageType;
		if(pageType == "update"){
			$(".currentQty").show();
		}
		updatestock.getStockDetail();
		updatestock.getOutDetails();
	});
	
	// 获取货品详情
	updatestock.getStockDetail = function(){
		var params = {};
		params.ID = id;
		stock.getStockById(params,function(data){
			console.log(JSON.stringify(data));
				var ad = data[0];
				for(var index in ad){
					$("#"+index).html(ad[index]);
				}
		},function(errorinfo){
			
			mui.alert("请求失败!" + systemutil.parsestr(errorinfo));
		});
	}
	// 获取售出明细
	updatestock.getOutDetails = function(){
		var params = {};
		params.pid = id;
		stock.getOutDetailsByPId(params,function(data){
			console.log(JSON.stringify(data));
			$('.status-list').append(updatestock.progress(data));
		},function(errorinfo){
			
			mui.alert("请求失败!" + systemutil.parsestr(errorinfo));
		});
	}
	
	updatestock.progress = function (data){
    	if(systemutil.isNotBlank(data)){
    		var html = '';
    		html += '<p style="text-align:center;">没有查询到数据!</p>'
    		return html;
    	}else{
			var html = '';
			$.each(data, function(i, obj) {
				html +='<li>'
             +'<div class="status-content-before">'
             +'<span class="fl">'+obj.departName+' : '+obj.operator+' '+systemutil.parsestr(obj.optName)+'</span>'
							 +'<span class="fr">'+common.formatSolrTime(obj.operationTime)+'</span>'
             +'</div>'
             +'<div class="status-time-before">'
             +'<div class="mui-content-padded">'
             +'<ul>'
             if(obj.attachment){
             	 var imgList = obj.attachment.split(',');
             	 var parentImgPath = common.getServerurl();
                 $.each(imgList, function(i,obj) {
                 	if(systemutil.isNotBlank(obj)){
	                 	var path = parentImgPath+obj;
	                 	html+='<li>'
	                  +'<img src="'+path+'" data-preview-src data-preview-group="2">'
	                  +'</li>'
                  }
                 });
             }
             html+='</ul>'
             +'</div>'
             +'</div>'
             +'<div class="status-line"> 附言:'
             + (!obj.remark ? "无" : obj.remark)
             +'</div>'
             +'</li>'
			})
			return html;
    	}
    		
    }
	
	// 确认按钮的点击事件
	$("#subButton").on('tap',function(){
		$('#layui-m-layer0').show();
		// 总数-当前 = 当日卖出
		var stockVal = $("#stock").html();
		var currentQty = $("#currentQty").val();
		var saleVal = $("#sale").html();
		var currSale = stockVal-currentQty;
		var newSaleVal = saleVal+currSale;
		// 修改货品表数据；stock：之前-当日；sale：之前+当日
		var params = {};
		params.ID = id;
		params.stock = currentQty;
		params.sale = newSaleVal;
		stock.updatestockById(params,function(data){
			console.log(JSON.stringify(data));
				// 保存售出明细；pid：货品id；date：当前日期；outqty：当日卖出
				var param= {};
				param.pid = id;
				param.outtime = dateutil.getNewDate();
				// param.create_time = dateutil.getNewDate();
				param.outqty = currSale;
				
				stock.insertStockDetailes(param,function(data){
					$('#layui-m-layer0').hide();
					
					// 返回上一页、刷新列表、关闭当前页
					setTimeout(function(){
						var currView = plus.webview.currentWebview();
						var parentview = currView.opener();
						currView.close();
						parentview.reload(true);
					},500);
				},function(errorinfo){
					$('#layui-m-layer0').hide();
					mui.alert("请求失败!" + systemutil.parsestr(errorinfo));
				}); 
				
		},function(errorinfo){
			$('#layui-m-layer0').hide();
			mui.alert("请求失败!" + systemutil.parsestr(errorinfo));
		}); 
		
		
	})

  return updatestock;
});
