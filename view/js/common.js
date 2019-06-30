define(['jquery', 'model/UserModel', 'utils/systemutil'], function($, usermodel, systemutil) {　　　　
	var common = {};
	//   服务端地址,打包时需要修改
	var serverurl ="http://127.0.0.1:18099/rest/";
	var imgBasePath = "http://127.0.0.1:18099/";


	var timeout = 0; //全局连接超时时长
	//禁止侧滑返回上一页
	mui.plusReady(function(){
		var wv = plus.webview.currentWebview();
		wv.setStyle({
			'popGesture':'none'
		})
	});
	
	//版本号
	common.getVersion = function() {
		return "V1.0.0.R"
	}
	
	//版本号
	common.Time = function() {
		return 100
	}
	
	/**
	 * 返回pageSize
	 * @param {Object} usermodel
	 */
	common.getPageSize = function() {
		return 20;
	}
	
	common.getAllServerurl = function() {
		return serverurl;
	}

	common.getServerurl = function() {
		return imgBasePath;
	}
	common.getHttpServerUrl = function() {
		//	return "http://"+serverurl.split(/\//)[2] +"/";
		return serverurl.substring(0, serverurl.length - 5);
	}

	common.getDao = function(daoname) {
		return "dao/unlineimpl/"+daoname;
		//获取当前在线还是离线,可以是数据库或者是localstory内
		if(!(plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE)) {
			return "dao/onlineimpl/" + daoname;
		} else {
			// 创建数据库或者打开数据库
			// common.openDatabase();
			return "dao/unlineimpl/"+daoname;
		}
	}

	/**
	 * 保存用户信息
	 * @param {Object} usermodel
	 */
	common.setUserInfo = function(usermodel) {
		//用户名
		if(systemutil.isNotBlank(usermodel.userName)){
			plus.storage.setItem("userName", usermodel.userName);
		}else{
			plus.storage.setItem("userName", usermodel.username);
		}
		//用户密码
		if(systemutil.isNotBlank(usermodel.userPwd)){
			plus.storage.setItem("userPwd", usermodel.userPwd);
		}else{
			plus.storage.setItem("userPwd", usermodel.password);
		}
		//是否在线  true为在线模式，false为离线模式
		plus.storage.setItem("isOnLine", usermodel.isOnLine);

		//是否启用记住密码 true记住密码   false 不记住密码
		plus.storage.setItem("remember", usermodel.remember);

		//是否自动登录  true自动登录  false不自动登录
		plus.storage.setItem("isAutoLogin", usermodel.isAutoLogin);
		plus.storage.setItem("rememberXy", usermodel.rememberXy);
		plus.storage.setItem("token", usermodel.token);
		plus.storage.setItem("uuid", usermodel.uuid);
		plus.storage.setItem("pageSize", usermodel.pageSize);
		plus.storage.setItem("roles", usermodel.roles);
	}

	/**
	 * 获取用户信息
	 * @param {Object} usermodel
	 */
	common.getUserInfo = function() {
		usermodel.userName = plus.storage.getItem("userName");
		usermodel.userPwd = plus.storage.getItem("userPwd");
		usermodel.isOnLine = plus.storage.getItem("isOnLine");
		usermodel.remember = plus.storage.getItem("remember");
		usermodel.isAutoLogin = plus.storage.getItem("isAutoLogin");
		usermodel.token = plus.storage.getItem("token");
		usermodel.uuid = plus.storage.getItem("uuid");
		usermodel.pageSize = plus.storage.getItem("pageSize");
		usermodel.roles = plus.storage.getItem("roles");
		usermodel.rememberXy = plus.storage.getItem("rememberXy");
		usermodel.operationalRoles = plus.storage.getItem("operationalRoles");
		return usermodel;
	}

	/**
	 * 对参数加密后请求服务器
	 * @param {Object} url
	 * @param {Object} data
	 * @param {Object} success
	 * @param {Object} error
	 */
	common.encryptAjax = function(url, data, success, error) {
		if(common.networkState()) {
			try {
				var userModel = common.getUserInfo();
				if(Object.prototype.toString.call(userModel.token) != "[object Undefined]") {
					$.ajax({
						url: serverurl + "/" + url,
						headers: {
							'X-AUTH-TOKEN': userModel.token
						},
						data: data,
						async: true,
						dataType: 'json',
						crossDomain: true, //强制使用5+跨域
						type: 'post',
						timeout: timeout,
						success:function(data) {
							success(data);
						},
						error: function(xhr, type, errorThrown) {
							console.log('error');
							if(!common.getLoginState(xhr, type, errorThrown)) {
								error(systemutil.parsestr(xhr), systemutil.parsestr(type), systemutil.parsestr(errorThrown));
							} else {
								return false;
							}
						}
					});
				}
			} catch(err) {
				mui.toast("网络错误!");
			}
		}
	}

	/**
	 * 请求delete方法
	 * @param {Object} url
	 * @param {Object} data
	 * @param {Object} success
	 * @param {Object} error
	 */
	common.deleteAjax = function(url, data, success, error) {
		if(common.networkState()){
			try{
			var userModel = common.getUserInfo();
			var url = serverurl + url;
			mui.ajax({
				type: "delete",
				url: url,
				async: true,
				headers: {
					'X-AUTH-TOKEN': userModel.token
				},
				dataType: 'json',
				data: data,
				crossDomain: true, //强制使用5+跨域
				timeout: timeout,
				success: function(data) {
					success(data);
				},
				error: function(xhr, type, errorThrown) {
					if(!common.getLoginState(xhr, type, errorThrown)) {
						error(systemutil.parsestr(xhr), systemutil.parsestr(type), systemutil.parsestr(errorThrown));
					} else {
						return false;
					}
				}
			});
			}catch(err){
				mui.toast('网络错误');
			}
		}
	}

	/**
	 * 直接ajax请求服务器,不需要token信息
	 * @param {Object} url
	 * @param {Object} data
	 * @param {Object} success
	 * @param {Object} error
	 */
	common.ajax = function(url, data, success, error) {
		try{
			if(common.networkState()){
				mui.ajax({
					url: serverurl + url,
					data: data,
					//url:serverurl + url+"?"+params,
					async: true,
					dataType: 'text',
					crossDomain: true, //强制使用5+跨域
					type: 'post',
					headers: {
						'X-AUTH-TOKEN': ''
					},
					timeout: timeout,
					success: function(data) {
						success(data);
					},
					error: function(xhr, type, errorThrown) {
						if(!common.getLoginState(xhr, type, errorThrown)) {
							error(systemutil.parsestr(xhr), systemutil.parsestr(type), systemutil.parsestr(errorThrown));
						} else {
							return false;
						}
					}
				});
			}
		}catch(err){
			mui.toast('网络错误');
		}
		
			
	}

	/**
	 * 登录的ajax延迟三秒
	 * @param {Object} url
	 * @param {Object} data
	 * @param {Object} success
	 * @param {Object} error
	 */
	common.loginAjax = function(url, data, success, error) {
			if(common.networkState()){
				mui.ajax({
					url: serverurl + url,
					data: data,
					//url:serverurl + url+"?"+params,
					async: true,
					dataType: 'text',
					crossDomain: true, //强制使用5+跨域
					type: 'post',
					headers: {
						'X-AUTH-TOKEN': ''
					},
					timeout: 5000,
					success: function(data) {
						//		    		console.log("success"+data);
						success(data);
					},
					error: function(xhr, type, errorThrown) {
							error(systemutil.parsestr(xhr), systemutil.parsestr(type), systemutil.parsestr(errorThrown));
							return false;
					}
				});
			}
	}

	//url截取
	common.getQueryString = function(url, name) {
		var param_str = url.substring(url.lastIndexOf("?") + 1, url.length);
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = param_str.match(reg);
		if(r != null) return decodeURI(unescape(escape(r[2])));
		return null;
	}
	common.getRoute = function(url) {
		return url.substring(0, url.lastIndexOf("?"));
	}
	

	//获取当前日期
	common.getNowFormatDate = function() {
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
	/**
	 * 清空用户信息
	 * @param {Object} usermodel
	 */
	common.clearUserInfo = function() {
		plus.storage.setItem("uuid", "");
		plus.storage.setItem("roles", "");
		plus.storage.setItem("token", "");
	}

	/**
	 * 判断网络状态
	 * @param {Object} usermodel
	 */
	common.networkState = function(networkStateError) {
		if(plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) {
			var message = "网络异常，请检查网络设置！";
			//					networkStateError(message);
			mui.toast(message);
			$('#layui-m-layer0').hide();
			return false;
		} else {
			return true;
		}

	}

	

	/**
	 * 判断用户登录状态
	 * @param {Object} usermodel
	 */
	common.getLoginState = function(xhr, type, errorThrown) {
		if(systemutil.isNotBlank(errorThrown)) {
			if(errorThrown.indexOf("token") != -1) {
				common.clearUserInfo();
				mui.toast("登录失效,请重新登录!");
				common.getLoginView();
				throw SyntaxError();
				return false;
			} else  {
				common.clearUserInfo();
				mui.toast("登录失效,请重新登录!");
				common.getLoginView();
				throw SyntaxError();
				return false;
			}
		}

	}

	/**
	 * 跳回登录页面
	 * @param {Object} usermodel
	 */
	common.getLoginView = function() {
		var curr = plus.webview.currentWebview();
		var wvs = plus.webview.all();
		if(mui.os.ios) {
			common.clearUserInfo();
			for(var i = 0, len = wvs.length; i < len; i++) {
				if(wvs[i].getURL().indexOf("/launch.html") != -1) {
					console.log('363'+ wvs[i].getURL());
					plus.webview.open(wvs[i].getURL(), wvs[i].getURL());
					wvs[i].close();
					continue;
				}
				if(null !== wvs[i].getURL() && wvs[i] == curr) {
					continue;
				}
				plus.webview.close(wvs[i]);
			}
		} else {
			for(var i = 0, len = wvs.length; i < len; i++) {
				if(null !== wvs[i].getURL() && wvs[i].getURL().indexOf("/launch.html") != -1) {
					wvs[i].show();
					continue;
				}
				if(null !== wvs[i].getURL() && wvs[i] == curr) {
					continue;
				}
				plus.webview.close(wvs[i]);
			}
		}

		curr.close();
	}
	//将日期转换为字符串
	common.fomateDate2Str = function(oriDate) {
		var year = oriDate.getFullYear();
		var mon = common.formatFunc(oriDate.getMonth() + 1);
		var day = common.formatFunc(oriDate.getDate());
		var hour = common.formatFunc(oriDate.getHours());
		var min = common.formatFunc(oriDate.getMinutes());
		var second = common.formatFunc(oriDate.getSeconds());
		var dateStr = year + '-' + mon + '-' + day + ' ' + hour + ':' + min + ":" + second;
		return dateStr;
	}
	//为单字符日期左补零占位
	common.formatFunc = function(str) { //格式化显示
		return str > 9 ? str : '0' + str
	}
	//将solr转换为当前所需日期
	common.formatSolrTime = function(solrTimeStr) {
		if(systemutil.parsestr(solrTimeStr) != "") {
			solrTimeStr = solrTimeStr.replace(/-/g, '/');
			var solrDateTime = new Date(solrTimeStr);
			var solrStr = common.fomateDate2Str(solrDateTime);
			var solrDate = solrStr.substring(0, 10);
			var solrTime = solrStr.substring(11, 16);
			var nowStr = common.fomateDate2Str(new Date());
			var nowDate = nowStr.substring(0, 10);
			if(solrDate == nowDate) {
				return solrTime;
			} else {
				return solrDate;
			}
		} else {
			return "";
		}

	}

	common.getListImgPath = function(responsibleParty) {
//		return "../images/listImg/" + responsibleParty + ".png";
		if(systemutil.isNotBlank(responsibleParty)){
			return common.getHttpServerUrl()+"images/msg-img/"+responsibleParty+".png";
		}else{
			return common.getHttpServerUrl()+"images/msg-img/moren.png";
		}
	}
	//textarea表情过滤及自适应高度
	//textarea 自适应高度
	$(function() {
		$.fn.autoHeight = function() {
			function autoHeight(elem) {
				elem.style.height = 'auto';
				elem.scrollTop = 0; //防抖动
				elem.style.height = elem.scrollHeight + 'px';
			}
			this.each(function() {
				autoHeight(this);
				$(this).on('keyup', function() {
					this.value = this.value.replace(/[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig, '');
					autoHeight(this);
				});
			});
		}
		$('textarea[autoHeight]').autoHeight();
	})
	common.isImgType = function(name) {
		var arr = name.split(".");
		var typeImg = "";
		var suffix = "jpg,jpeg,png,JPG,JPEG,PNG";
		for(var i = arr.length, len = 0; i > len; i--) {
			if(systemutil.isNotBlank(arr[i])) {
				typeImg = arr[i];
				break;
			}
		}
		if(suffix.indexOf(typeImg) == -1) {
			mui.toast("暂不支持上传此格式的图片!");
			throw SyntaxError();
			return false;
		} else {
			return true;
		}

	}

	//获取日期
	common.getNewDate = function(msgdatetime) {
		var date = new Date();
		this.year = date.getFullYear();
		this.month = date.getMonth() + 1;
		this.date = date.getDate();
		this.day = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六")[date.getDay()];
		this.hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
		this.minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
		this.second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
		//			var currentTime = "现在是:" + this.year + "年" + this.month + "月" + this.date + "日 " + this.hour + ":" + this.minute + ":" + this.second + " " + this.day;    	
		if(systemutil.isBlank(msgdatetime)) {
			return this.hour + ":" + this.minute;
		} else {
			var newDateTime = common.fomateDate2Str(new Date());
			var msgdate = msgdatetime.substring(0, 10);
			newDateTime = newDateTime.substring(0, 10);
			var msgTime = msgdatetime.substring(11, 16);
			if(msgdate == newDateTime) {
				return msgTime;
			} else {
				return msgdatetime;
			}
		}

	}
	//特殊字符过滤
	common.htmlEscape = function(str) {
		return String(str)
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/ /g, '&nbsp;')
			.replace(/,/g, '&#44;')
			.replace(/\?/g, '&#161;')
			.replace(/\//g, '&frasl;')
			.replace(/\\/g, '&#092;')
			.replace(/[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig, '');

	}
	common.scape = function(str) {
		return String(str)
			.replace(/&#44;/g, ',')
			.replace(/&#161;/g, '?')
			.replace(/&frasl;/g, '/')
			.replace(/&#092;/g, '\\');
	}
	
	
	
	common.iosHeight = function(height){
		var aaaa = (parseInt(height)/2 + 20) + 'px';
		return aaaa;
	}
	
	// sqllite数据库
	common.openDatabase = function(){
		plus.sqlite.openDatabase({
			name: 'stock',
			path: '_doc/stock.db',
			success: function(e){
				console.log('openDatabase success!');
			},
			fail: function(e){
				console.log('openDatabase failed: '+JSON.stringify(e));
			}
		});
	}
	return common;
});