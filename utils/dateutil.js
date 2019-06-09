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
	return dateutil;
});