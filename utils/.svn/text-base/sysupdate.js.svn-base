/**
 * 作者：赵亮
 * 时间：20180925
 * 描述：用于检测版本更新
 */
define(['jquery', 'common','mui'], function($, common,mui) {　　　　
	var sysUpdate = {};

	//正式上线了请更改app更新地址
	var server = "http://www.dcloud.io/helloh5/update.json", //获取升级描述文件服务器地址
	localDir = "update",
	localFile = "update.json", //本地保存升级描述目录和文件名
	keyUpdate = "updateCheck", //取消升级键名
	keyAbort = "updateAbort", //忽略版本键名
	checkInterval = 0, //升级检查间隔，单位为ms,1小时为60*60*1000=3600000, 如果每次启动需要检查设置值为0
	dir = null;

	var btn = ["确定升级", "取消"];
	var btn1 = ["立即升级"];
	//获取app系统更新[是否手动点击获取更新]
	sysUpdate.appUpdate = function(ismanual) {
		console.log('appUpdate');
		mui.plusReady(function() {
			plus.runtime.getProperty(plus.runtime.appid, function(inf) {
				ver = inf.version; //当前使用的版本
				console.log('ver:' + ver);
				mui.ajax({
					url: server,
					async: true,
					dataType: 'json',
					crossDomain: true, //强制使用5+跨域
					type: 'post',
					headers: {
						'Content-Type': 'application/json'
					},
					timeout: 10000,
					success: function(data) {
						if(sysUpdate.getPhoneType() == "android") {
							sysUpdate.androidUpdate(data.Android, ismanual, ver);
						} else {
							sysUpdate.iosUpdate(data.iOS, ismanual, ver);
						}
					},
					error: function(xhr, type, errorThrown) {
						if(ismanual) {
							mui.toast('网络异常,请稍候再试');
						}
					}
				});
			});
		});
	}

	/**
	 * android 更新
	 * @param {Object} data
	 * @param {Boolean} ismanual 是否手动更新，true表示手动更新，需要弹出来多提示
	 * @param {String} oversion 当前正在使有的版本
	 */
	sysUpdate.androidUpdate=function(data,ismanual,oversion){
		var nversion = data.version;
		if(sysUpdate.compareVersion(oversion, nversion)) {
			//有新版本，需要更新
			var _msg = "发现新版本:V" + nversion + ".R";
			mui.confirm(_msg, '升级确认', data.state ? btn1 : btn, function(e) {
				if(e.index == 0) { //执行升级操作
					document.location.href = data.url; //上新APPStore下载地址
				}
			});
		} else if(ismanual) {
			mui.toast('当前已是最新版本!');
		}
	}

	/**
	 * ios 更新
	 * @param {Object} data
	 * @param {Boolean} ismanual 是否手动更新，true表示手动更新，需要弹出来多提示
	 */
	sysUpdate.iosUpdate = function(data, ismanual, oversion) {
		var nversion = data.version;
		if(sysUpdate.compareVersion(oversion, nversion)) {
			//有新版本，需要更新
			var _msg = "发现新版本:V" + nversion + ".R";
			mui.confirm(_msg, '升级确认', data.state ? btn1 : btn, function(e) {
				if(e.index == 0) { //执行升级操作
					plus.nativeUI.toast("正在准备环境，请稍后！");
					sysUpdate.downloadinstallapk(data.url);
				}
			});
		} else if(ismanual) {
			mui.toast('当前已是最新版本!');
		}
	}

	/**
	 * 获取手机类型  android / ios
	 */
	sysUpdate.getPhoneType = function() {
		var ua = navigator.userAgent.toLowerCase();
		if(/iphone|ipad|ipod/.test(ua)) {
			//苹果手机
			return "ios";
		} else {
			return "android";
		}
	}
	/**
	 * 下载并开始安装apk文件
	 * @param {Object} url
	 */
	sysUpdate.downloadinstallapk = function(url) {
		var dtask = plus.downloader.createDownload(url, {}, function(d, status) {
			if(status == 200) {
				var path = d.filename; //下载apk
				plus.runtime.install(path); // 自动安装apk文件
			} else {
				plus.nativeUI.alert('版本更新失败:' + status);
			}
		});
		dtask.start();
	}

	/**
	 * 比较版本大小，如果新版本nv大于旧版本ov则返回true，否则返回false
	 * @param {String} ov
	 * @param {String} nv
	 * @return {Boolean}
	 */
	sysUpdate.compareVersion = function(ov, nv) {
		if(!ov || !nv || ov == "" || nv == "") {
			return false;
		}
		var b = false,
			ova = ov.split(".", 4),
			nva = nv.split(".", 4);
		for(var i = 0; i < ova.length && i < nva.length; i++) {
			var so = ova[i],
				no = parseInt(so),
				sn = nva[i],
				nn = parseInt(sn);
			if(nn > no || sn.length > so.length) {
				return true;
			} else if(nn < no) {
				return false;
			}
		}
		if(nva.length > ova.length && 0 == nv.indexOf(ov)) {
			return true;
		}
	}
	
	return sysUpdate;
});




/**
 * 返回参数
	{
	    "appid":"HelloH5",
	    "iOS":{
	    	"state": "yes",//是:强制更新  否:提示用户,由用户选择更新   
	    	"version":"1.6.0",
	    	"title":"Hello H5+(1.6.0)版本更新",
	    	"note":"适配支持iOS9.x及3D Touch功能；\n优化界面操作用户体验效果；\n新增微信支付、QQ分享等功能。\n",
	    	"url":"itms-apps://itunes.apple.com/cn/app/hello-h5+/id682211190?l=zh&mt=8"
	    },
	    "Android":{
	    	"state": "yes",//是:强制更新  否:提示用户,由用户选择更新 
	    	"version":"1.6.5",
	    	"title":"Hello H5+(1.6.5)版本更新",
	    	"note":"优化界面操作用户体验效果；\n修正关于页面的联系方式；\n修复一些其它已知的bug。\n",
	    	"url":"http://download.dcloud.net.cn/HelloH5.apk"
	    }
	}
 */