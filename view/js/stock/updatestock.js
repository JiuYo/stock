define(['jquery', "mui", "common", "service/stock/stock", "model/UserModel", 'utils/systemutil', "utils/dateutil"],
	function($, mui, common, stock, umodel, systemutil, dateutil) {
		var updatestock = {};
		var id = "";
		var pageType = "";
		var ad = {};
		updatestock.init = function(page) {
			mui.init();
			mui(".mui-scroll-wrapper").scroll();
		};
		mui.plusReady(function() {
			var currentView = plus.webview.currentWebview();
			id = plus.webview.currentWebview().listId;
			pageType = plus.webview.currentWebview().pageType;
			if (pageType == "update") {
				$(".currentQty").show();
			}
			updatestock.getStockDetail();
		});

		// 获取货品详情
		updatestock.getStockDetail = function() {
			var params = {};
			params.ID = id;
			stock.getStockById(params, function(data) {
				console.log(JSON.stringify(data));
				ad = data[0];
				for (var index in ad) {
					$("#" + index).html(ad[index]);
				}
			}, function(errorinfo) {

				mui.alert("请求失败!" + systemutil.parsestr(errorinfo));
			});
		}

		updatestock.progress = function(data) {
			console.log(JSON.stringify(data));
			if (systemutil.isBlank(data)) {
				var html = '';
				html += '<p style="text-align:center;">没有查询到数据!</p>'
				return html;
			} else {
				var html = '';
				// $.each(data, function(i, obj) {
				for (var i = 0; i < data.length; i++) {
					var obj = data[i];
					html += '<li>' +
						'<div class="status-content-before">' +
						'<span class="fl">' + ad.pname + ' : ' + obj.outqty + '/' + ad.unit + '</span>' +
						'<span class="fr">' + obj.outtime + '</span>' +
						'</div>' +
						'<div class="status-time-before">' +
						'<div class="mui-content-padded">' +
						'<ul>'
					html += '</ul>' +
						'</div>' +
						'</div>' +
						'</li>'
					// })
				}
				return html;
			}

		}

		// 确认按钮的点击事件
		$("#subButton").on('tap', function() {
			$('#layui-m-layer0').show();
			// 总数-当前 = 当日卖出
			var stockVal = $("#stock").html();
			var currentQty = $("#currentQty").val();
			var saleVal = $("#sale").html();
			stockVal = parseInt(stockVal.trim());
			currentQty = parseInt(currentQty.trim());
			saleVal = parseInt(saleVal.trim());
			// 修改货品表数据；stock：之前-当日；sale：之前+当日
			var paramss = {};
			paramss.ID = id;
			paramss.stock = currentQty;
			paramss.sale = saleVal + stockVal - currentQty;
			console.log(JSON.stringify(paramss));
			stock.updatestockById(paramss, function(data) {
				mui.toast("保存成功！");

			}, function(errorinfo) {
				$('#layui-m-layer0').hide();
				mui.alert("请求失败!" + systemutil.parsestr(errorinfo));
			});
		})

		//安卓滚动到可视区域
		window.addEventListener("resize", function() {
			var u = navigator.userAgent;
			if (u.indexOf('Android') > -1 || u.indexOf('Adr') > -1) {
				if (document.activeElement.tagName == "INPUT" || document.activeElement.tagName == "TEXTAREA") {
					window.setTimeout(function() {
						document.activeElement.scrollIntoView(false); //scrollIntoViewIfNeeded()  
					}, 0);
				}
			} else {}

		})

		//左滑是卖出事件,
		document.getElementById("saleandcome").addEventListener("swipeleft", function() {
			//获得数字输入框的数量
			var sale = document.getElementById("saleout").value;
			//弹窗确认是否卖出
			mui.confirm('是否卖出' + sale + '商品？', '卖出确认', ['取消', '确认'], function(e) {
				if (e.index == 1) {
					//调用数据库操作,进行减法计算
					var stockVal = $("#stock").html();
					var saleVal = $("#sale").html();
					stockVal = parseInt(stockVal.trim());
					saleVal = parseInt(saleVal.trim());
					sale = parseInt(sale.trim());
					// 修改货品表数据；stock：之前-当日；sale：之前+当日
					var paramss = {};
					paramss.ID = id;
					paramss.stock = stockVal - sale;
					paramss.sale = saleVal + sale;
					console.log(JSON.stringify(paramss));
					stock.updatestockById(paramss, function(data) {
						//提示卖出成功信息
						mui.toast("😀恭喜您卖出" + sale + "商品😀");
						//获得当前窗口对象
						var ws = plus.webview.currentWebview();
						//刷新当前窗口
						ws.reload(true);
					}, function(errorinfo) {
						$('#layui-m-layer0').hide();
						mui.alert("请求失败!" + systemutil.parsestr(errorinfo));
					});
				} else {
					mui.toast("取消操作");
				}
			}, 'div');
		});
		//右滑是进货事件
		document.getElementById("saleandcome").addEventListener("swiperight", function() {
			console.log("你正在向右滑动");
			//获得数字输入框的数量
			var come = document.getElementById("come").value;
			//弹窗确认是否进货
			mui.confirm('是否进货' + come + '商品？', '进货确认', ['取消', '确认'], function(e) {
				if (e.index == 1) {
					//调用数据库操作,进行加法计算，come+
					var stockVal = $("#stock").html();
					var countVal = $("#count").html();
					stockVal = parseInt(stockVal.trim());
					countVal = parseInt(countVal.trim());
					come = parseInt(come.trim());
					// 修改货品表数据；stock：之前-当日；sale：之前+当日
					var paramss = {};
					paramss.ID = id;
					paramss.stock = stockVal + come;
					paramss.count = countVal + come;
					console.log(JSON.stringify(paramss));
					stock.updatestockById(paramss, function(data) {
						//提示卖出成功信息
						mui.toast("😀恭喜您进货" + come + "商品😀");
						//获得当前窗口对象
						var ws = plus.webview.currentWebview();
						//刷新当前窗口
						ws.reload(true);
					}, function(errorinfo) {
						$('#layui-m-layer0').hide();
						mui.alert("请求失败!" + systemutil.parsestr(errorinfo));
					});
				} else {
					mui.toast("取消操作");
				}
			}, 'div');

			//获得当前窗口对象
			var ws = plus.webview.currentWebview();
			//刷新当前窗口
			//ws.reload(true);
		});
		//监听左上角返回事件,当返回后,刷新stocklist.html页面数据
		document.getElementById("isa").addEventListener('tap', function() {
			var ws = plus.webview.getWebviewById("stock/stocklist.html");
			console.log(ws)
			ws.reload(true);
		});


		//监听返回键 返回之后刷新stocklist.html界面
		plus.key.addEventListener('backbutton', function() {
			//if (confirm('确认退出？')) {
				//true就是直接退出APP
				//plus.runtime.quit();
				var ws = plus.webview.getWebviewById("stock/stocklist.html");
				console.log(ws)
				ws.reload(true);
			//}
		});

		return updatestock;
	});
