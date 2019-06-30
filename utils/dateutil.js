/**
 * 作者：赵亮
 * 时间：20180925
 * 描述：用于检测版本更新
 */
define(['jquery', 'common','mui'], function($, common,mui) {　　　　
	var dateutil = {};
	dateutil.getNowStr = function(){
		
	}
	dateutil.formatSimpleDate = function(date_param){
		if (!date_param) {
			return "";
		}
		return date_param.substring(0,10);
	}
	
	dateutil.timestampToTime = function(timestamp) {
		var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
		Y = date.getFullYear() + '-';
		M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
		D = change(date.getDate()) + ' ';
		h = change(date.getHours()) + ':';
		m = change(date.getMinutes()) + ':';
		s = change(date.getSeconds());
		return Y + M + D + h + m + s;
	}
	function change(t) {
		if (t < 10) {
			return "0" + t;
		} else {
			return t;
		}

	}
	
	dateutil.getNewDate = function(){
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
	return dateutil;
});