define(['jquery',"mui","common","service/stock/stock","model/UserModel",'utils/systemutil',"muipicker","utils/validate_util","utils/dateutil"], function ($,mui,common,stock,umodel,systemutil,muipicker,validateUtil,dateutil) {　　　　
	var addstock = {};
	addstock.init = function (page) {
		mui.init();
	};
	mui.plusReady(function(){
			// 添加货品单价的计算方法,对货品单价和数量增加监听
			var totalData = document.getElementById("total");
			totalData.addEventListener('input',function(){
		  		addstock.getDrawingNoList();
			});
			var countData = document.getElementById("count");
			countData.addEventListener('input',function(){
				addstock.getDrawingNoList();
			});
		
	});
	$('#date').on('tap',function(){
		var dtpicker = new mui.DtPicker({ 
			type: "date",//设置日历初始视图模式 
			beginDate: new Date(1999, 04, 25),//设置开始日期 
			endDate: new Date(2070, 04, 25),//设置结束日期 
			labels: ['年', '月', '日'],//设置默认标签区域提示语
		})
		dtpicker.show(function(e) { 
			 $('#date').html(e.value);
			 $("#date").attr('data-selected',e.value);
		})
	});
	
	// 保存货物的方法
	$("#saveStock").on('tap',function(){
		var params = {};
		// 获取填入的货品名称
		var pnameVal = $("#pname").val();
		params.pname = pnameVal;
		// 数量
		var countVal = $("#count").val();
		params.count = countVal;
		// 计量单位
		var unitVal = $("#unit").val();
		params.unit = unitVal;
		// 进货总价
		var totalVal = $("#total").val();
		params.total = totalVal;
		// 货品单价
		var priceVal = $("#price").val();
		params.price = priceVal;
		// 进货时间
		var dateVal = $('#date').html();
		params.date = dateVal;
		params.create_time = dateutil.getNewDate();
		params.stock = countVal;
		params.sale = 0;
		//调用service保存货品的方法
		if(validateUtil.validateData("add-container")){
			addstock.saveStock(params);
		}
	})
	
	addstock.saveStock = function(params){
		$('#defaultSubmit').show();
		stock.saveStock(params,function(){
			$('#defaultSubmit').hide();
			mui.toast('货品保存成功！');
			setTimeout(function(){
				var currView = plus.webview.currentWebview();
				var parentview = currView.opener();
				console.log(JSON.stringify(parentview));
				// mui.fire(parentview, 'refresh');
				currView.close();
				parentview.reload(true);
				// mui.fire(parentview,'search',{
				//     searchData:'value'
				// });
			},1000)
		},function(errorinfo){
			$('#defaultSubmit').hide();
			mui.alert("请求失败!" + systemutil.parsestr(errorinfo));
		});
	}
	
	// 获取货品单价的方法
	addstock.getDrawingNoList = function(){
		var totalVal = $("#total").val();//获取商品总价
		var countVal = $("#count").val();//获取商品进货数量
		if(systemutil.isNotBlank(totalVal) && systemutil.isNotBlank(countVal) ){
			var priceVal = totalVal/countVal;
			$("#price").val(priceVal.toFixed(2));
		}
	}
 
  return addstock;
});
