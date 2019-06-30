/**
 * 前端校验工具类
 * @author lijing
 * @date 2018-11-19
 * 
 * datatype 填写要求
 * * 任意字符
 * s 字符串
 * n 数字
 * d 日期 eg.2018-01-01
 * t 时间 eg.2018-01-01 12:00:00
 * *1~100 代表最小为1，100为最大值
 * n~100为仅限制
 * 填写示例 s1~100{/^(\d{4})-(\d{2})-(\d{2})$/} 对字符串进行正则校验， s1:100 允许填写1~100位字符串
 * 注意：最大最小值最好不要与正则同时使用，若同时使用则必须将"范围"写在正则之前
 *
 *
 */
define(['jquery', 'common','mui','utils/systemutil','layer/layer'], function($, common,mui,systemutil,layer) {　　　　
	var validate_util = {};
	var number_reg = /^[0-9]+([.]{1}[0-9]+){0,1}$/;//数值正则
	var int_reg = /^[0-9]+([.]{1}[0-9]+){0,1}$/;//正整数正则
	var date_data_reg = /^(\d{4})-(\d{2})-(\d{2})$/;//日期正则
	var datetime_data_reg = /^(\d+)-(\d{1,2})-(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;//时间戳正则
	var float_reg = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;//两位小数正则
	//获取当前页面需校验的元素
	validate_util.getValifateColums = function(parent_classname){
		return $("."+parent_classname).find("[datatype]");
	}

	//校验方法
	validate_util.validate = function(parent_classname){
        var result = true;//返回结果
        var result_msg = "";//结果</br>信息
        var columns = validate_util.getValifateColums(parent_classname); //获取需校验的元素
        // var columns = $("[datatype]"); //获取需校验的元素
        $.each(columns, function(index, item){
            var vali_result = true;
            var vali_msg = "校验成功！";
            var label = $(this).attr("label");//当前input的名称
            var dataerrmsg =$.trim($(this).attr("dataerrmsg"));//当前输入框的提示
            var datatype = $(this).attr("datatype");//当前元素的datatype值
            var type = datatype.substring(0,1); //获取数据类型
            var tag_name = $(this).prop("tagName").toLowerCase();//当前元素名称
            var value = "";//获取当前数据
            var min = datatype.substring(1, datatype.indexOf("~"));//最小值
            var max = datatype.substring(datatype.indexOf("~")+1, (datatype.indexOf("{")>0?datatype.indexOf("{"):datatype.length));//最大值
            var reg_str = datatype.substring(datatype.indexOf("{")+1, datatype.lastIndexOf("}"));

            if (tag_name == "input") {
                value = $(this).val();
            }
            if (tag_name == "button") {
                value = $(this).attr("data-selected");
            }
            if (tag_name == "textarea" || tag_name == "span") {
                value = $(this).text();
            }
            
            
            if (datatype && !value ) {
                vali_result = false;
                vali_msg = "["+label+"]不能为空！";
                result_msg += "["+label+"]不能为空！</br>";
                result = false;
                $(this).addClass("error-info");
                return true;
            }


			 if (type == "f" && !float_reg.test(value)) {
                vali_msg = "["+label+"]只允许输入两位小数！";
                result_msg += "["+label+"]只允许输入两位小数！</br>";
                result = false;
                $(this).addClass("error-info");
                return true;
            }
			

            if (type == "n" && !number_reg.test(value)) {
                vali_msg = "["+label+"]只允许输入数字！";
                result_msg += "["+label+"]只允许输入数字！</br>";
                result = false;
                $(this).addClass("error-info");
                return true;
            }
            
            if (type == "i" && !int_reg.test(value)) {
                vali_msg = "["+label+"]只允许输入正整数！";
                result_msg += "["+label+"]只允许输入正整数！</br>";
                result = false;
                $(this).addClass("error-info");
                return true;
            }
            
            if (type == "d" && !date_data_reg.test(value)) {
                vali_msg = "["+label+"]请入日期格式！";
                result_msg += "["+label+"]请入日期格式！</br>";
                result = false;
                $(this).addClass("error-info");
                return true;
            }
            if (type == "t" && !datetime_data_reg.test(value)) {
                vali_result = false;
                vali_msg = "["+label+"]请入时间格式！";
                result_msg += "["+label+"]请入时间格式！</br>";
                result = false;
                $(this).addClass("error-info");
                return true;
            }
            if (type == "n" || type == "i") {
                value = parseFloat(value);
                min = min ? parseFloat(min) : "";
                max = max ? parseFloat(max) : "";
            }
            if(parseInt(min)>0) {
                if ((type=="n" || type=="d" || type=="t") && value<min) {
                    vali_result = false;
                    vali_msg = "["+label+"]最小值允许填写"+min+"!";
                    result_msg += "["+label+"]最小值允许填写"+min+"!</br>";
                    result = false;
                    $(this).addClass("error-info");
                    return true;
                }

                if ((type=="*" || type=="s") && value.length<min) {
                    vali_result = false;
                    vali_msg = "["+label+"]最少允许填写"+min+"个字符!";
                    result_msg += "["+label+"]最少允许填写"+min+"个字符!</br>";
                    result = false;
                    $(this).addClass("error-info");
                    return true;
                }
            }

            if(parseInt(max)>0) {
                if ((type=="n" || type=="d" || type=="t") && value>max) {
                    vali_result = false;
                    vali_msg = "["+label+"]最大允许填写"+max+"!";
                    result_msg += "["+label+"]最大允许填写"+max+"!</br>";
                    result = false;
                    $(this).addClass("error-info");
                    return true;
                }
                if ((type=="*" || type=="s") && value.length>max) {
                    vali_result = false;
                    vali_msg = "["+label+"]最多允许填写"+max+"个字符!";
                    result_msg += "["+label+"]最多允许填写"+max+"个字符!</br>";
                    result = false;
                    $(this).addClass("error-info");
                    return true;
                }
            }
            if (reg_str) {
                var data_reg = new RegExp(reg_str);
                if (!data_reg.test(value)) {
                    vali_result = false;
                    if(systemutil.isNotBlank(dataerrmsg)){                   	
                    	vali_msg = dataerrmsg;
                    	result_msg += dataerrmsg+"!</br>";
                    }else{
                    	 vali_msg = "["+label+"]格式不正确！";
                    	 result_msg += "["+label+"]格式不正确！</br>";
                    }
                    result = false;
                    $(this).addClass("error-info");
                    return true;
                }
            }
            $(this).removeClass("error-info");
        });
        var error_info = {};
        error_info.result = result;
        error_info.result_msg = result_msg;
        return error_info;
	}
	
	
	//页面的必填校验
	validate_util.validateData = function(className){
		var resultDatatype = validate_util.validate(className);
		if(!resultDatatype.result) {
			resultDatatype = JSON.stringify(resultDatatype.result_msg);
			resultDatatype = resultDatatype.substring(1, resultDatatype.length - 1);
			layer.open({
				content: resultDatatype,
				skin: 'msg',
				time: 2
			})
			return false;
		}else{
			return true;
		}
	}
            
            
  
            
    return validate_util;
});