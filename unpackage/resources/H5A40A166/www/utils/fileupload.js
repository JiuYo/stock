/**
 * 作者：赵亮
 * 时间：20180925
 * 描述：用于检测版本更新
 */
define(['jquery', 'common','mui'], function($, common,mui) {　　　　
	var fileupload = {};
	/**
	 * 用于上传图片,通过流传输图片
	 * @param {Object} files,上传文件的地址如 [{path:'xxx'},{path:'xxxx'}]
	 * @param {Object} success
	 * UploadImgByFinal  上传到写死的路径 
	 * UploadForFromData   上传到Tomcat下的路径
	 */
	fileupload.upload = function(files,success){
		var serverurl = common.getAllServerurl();
		var url = serverurl + "uploadImage/UploadImgByFinal";
		var token = plus.storage.getItem("token");
//      "http://192.168.0.25:18099/rest/uploadImage/UploadForFromData"
		uploader = plus.uploader.createUpload(url, {
			method: 'POST'
		}, function(upload, status) {
			//plus.nativeUI.closeWaiting()
			console.log("upload cb:"+upload.responseText);//打印的返回的图片路径
			var returnData = JSON.parse(upload.responseText);
			console.log("upload status:"+status);
			if(status==200){	
				$('#defaultSubmit').hide();
				$('#layui-m-layer0').hide();
				var data =  returnData.obj;
				if(success)
				{
					success(data);
				}
			}else{
				$('#defaultSubmit').hide();
				$('#layui-m-layer0').hide();
				alert("上传失败");
				console.log("upload fail");
			}
		});
		uploader.setRequestHeader('X-AUTH-TOKEN',token);
		//添加上传文件
		mui.each(files, function(index, element) {
			var f = files[index];
			uploader.addFile(f.path, {
				key: f.name
			});
		});
		
		
		//开始上传任务
		uploader.start();
		
	}
	
	return fileupload;
});