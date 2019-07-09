
define(['jquery', 'common','mui'], function($, common,mui) {　　　　
	var systemutil = {};
	//判断字段串是否为空
	systemutil.isBlank = function(str){
		
		if (str==null || str==undefined || $.trim(str).length==0 || str=="null" || str=="undefined") {
			return true;
		} 
		return false;
	}
	
	systemutil.isNotBlank = function(str){
		
		if (str==null || str==undefined || $.trim(str).length==0 || str=="null" || str=="undefined") {
			
			return false;
		} 
		return true;
	}
	systemutil.parsestr = function(str){
		if (str==null || str==undefined || $.trim(str).length==0 || str=="null" || str=="undefined") {
			return "";
		} 
		return str;
	}
	
	systemutil.parseZero = function(str){
		if (str==null || str==undefined || $.trim(str).length==0 || str=="null" || str=="undefined") {
			return 0;
		} 
		return str;
	}
	return systemutil;
});