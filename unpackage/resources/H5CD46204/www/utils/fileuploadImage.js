define(['jquery', 'common','mui'], function($, common,mui) {
	var addPic = {
		imageList: document.getElementById('image-list')
  	};
	
	var index = 1;
	var size = null;
	var imageIndexIdNum = 0;
	var starIndex = 0;
	var imgUploadShaow = '<div style="display: none;" id="defaultImg" class="layui-m-layer layui-m-layer2" index="0"><div class="layui-m-layershade"></div><div class="layui-m-layermain"><div class="layui-m-layersection"><div class="layui-m-layerchild  layui-m-anim-scale"><div class="layui-m-layercont"><i></i><i class="layui-m-layerload"></i><i></i><p>正在处理...</p></div></div></div></div></div>';
	var page=null;
	var selectImageName = "";
	
	addPic.files = [];
	addPic.uploader = null;  
	addPic.deviceInfo = null; 
	
	mui.plusReady(function() {
		//设备信息，无需修改
		addPic.deviceInfo = {
			appid: plus.runtime.appid, 
			imei: plus.device.imei, //设备标识
			images: addPic.files, //图片文件
			p: mui.os.android ? 'a' : 'i', //平台类型，i表示iOS平台，a表示Android平台。
			md: plus.device.model, //设备型号
			app_version: plus.runtime.version,
			plus_version: plus.runtime.innerVersion, //基座版本号
			os:  mui.os.version,
			net: ''+plus.networkinfo.getCurrentType()
		}
		$('body').append(imgUploadShaow);
		
		page={  
            imgUp:function(success){  
                var m=this;  
                plus.nativeUI.actionSheet({cancel:"取消",buttons:[  
                    {title:"拍照"},  
                    {title:"从相册中选择"}  
                ]}, function(e){//1 是拍照  2 从相册中选择  
                    switch(e.index){  
                        case 1:addPic.appendByCamera(function(imagedata){
					            		success(imagedata);
					            });break;  
                        case 2:addPic.appendByGallery(function(imagedata){
					            		success(imagedata);
					            });break;
                    }  
                });  
            }  
            //摄像头  
        } 
		
	});
	/**
	 *提交成功之后，恢复表单项 
	 */
	addPic.getFileInputArray = function() {
		return [].slice.call(addPic.imageList.querySelectorAll('.file'));
	};
	addPic.addFile = function(path) {
		addPic.files = [];
		addPic.files.push({name:"images"+index,path:path});
		index++;
	};
	/**
	 * 初始化图片域占位
	 */
	addPic.newPlaceholder = function() {
		var fileInputArray = addPic.getFileInputArray();
		if (fileInputArray &&
			fileInputArray.length > 0 &&
			fileInputArray[fileInputArray.length - 1].parentNode.classList.contains('space')) {
			return;
		};
		imageIndexIdNum++;
		var placeholder = document.createElement('div');
		placeholder.setAttribute('class', 'image-item space');
		//删除图片
		var closeButton = document.createElement('div');
		closeButton.setAttribute('class', 'image-close');
		closeButton.innerHTML = 'X';
		
		//小X的点击事件
		closeButton.addEventListener('tap', function(event) {
			setTimeout(function() {
				addPic.imageList.removeChild(placeholder);
			}, 0);
			return false;
		}, false);
		
		//
		var fileInput = document.createElement('div');
		fileInput.setAttribute('class', 'file');
		fileInput.setAttribute('id', 'image-' + imageIndexIdNum);
		fileInput.addEventListener('tap', function(event) {
			var self = this;
			var index = (this.id).substr(-1);
			var ds = false;
			var bgImgUrl  = common.getServerurl();
			//从这从开始改变，弹出提示框拍照或者相册。。。。
			page.imgUp(function(imagedata){
				placeholder.classList.remove('space');
	        	console.log(imagedata);
	        	placeholder.setAttribute("data_img",imagedata);
	        	addPic.newPlaceholder();
	        	placeholder.style.backgroundImage = 'url(' + bgImgUrl +imagedata + ')';
	       });
		}, false);
		
		placeholder.appendChild(closeButton);
		placeholder.appendChild(fileInput);
		addPic.imageList.appendChild(placeholder);
	};
	addPic.newPlaceholder();
	
	// 拍照添加文件
    addPic.appendByCamera = function(success){
        plus.camera.getCamera().captureImage(function(e){
            plus.gallery.save(e, function() { //保存到相册,加上这句代码拍的照片会保存至本地，不加则不保存
	            plus.io.resolveLocalFileSystemURL(e, function(entry) {
		            selectImageName = e.substr(e.lastIndexOf('/') + 1);
		            var path = entry.toLocalURL(); 
		            addPic.addFile(e);
		            addPic.upload(addPic.files,function(imagedata){
		            	success(imagedata);
		            });
	            }, function(e) { 
	                mui.toast("读取拍照文件错误：" + e.message); 
	            }); 
			}); 
        });    
    }
    
    // 从相册添加文件
    addPic.appendByGallery = function(success){
        plus.gallery.pick(function(path){
        	var name = path.substr(path.lastIndexOf('/') + 1);
			common.isImgType(name);
        	selectImageName = path.substr(path.lastIndexOf('/') + 1);
        		addPic.addFile(path);
            addPic.upload(addPic.files,function(imagedata){
	            	success(imagedata);
	        });
        });
    }
            
     /**
		 * 用于上传图片,通过流传输图片
		 * @param {Object} files,上传文件的地址如 [{path:'xxx'},{path:'xxxx'}]
		 * @param {Object} success
		 * UploadImgByFinal  上传到写死的路径 
		 * UploadForFromData   上传到Tomcat下的路径
		 */
		addPic.upload = function(files,success){
			var serverurl = common.getAllServerurl();
			var url = serverurl + "uploadImage/UploadImgByFinal";
			var token = plus.storage.getItem("token");
			$('#defaultImg').show();
			if(common.networkState())
			uploader = plus.uploader.createUpload(url, {
				method: 'POST'
			}, function(upload, status) {
				//plus.nativeUI.closeWaiting()
				console.log("upload cb:"+upload.responseText);//打印的返回的图片路径
				var returnData = JSON.parse(upload.responseText);
				console.log("upload status:"+status);
					if(returnData.success){	
						$('#defaultImg').hide();
						var data =  returnData.obj;
						if(success)
						{
							success(data);
						}
					}else{
						$('#defaultImg').hide();
						alert("上传失败");
						console.log("upload fail");
					}
			});
			uploader.setRequestHeader('X-AUTH-TOKEN',token);
			//添加上传文件
			mui.each(files, function(index, element) {
				var f = files[index];
				uploader.addFile(decodeURI(f.path), {
					key: f.name
				});
			});
			//开始上传任务
			uploader.start();
		}         
    
	// 图片回显 
	addPic.lastAttachedFileOnload = function(lastAttachedFile){
		if(lastAttachedFile[0] == ","){
  			lastAttachedFile = lastAttachedFile.substring(1,lastAttachedFile.length);
  		}
  		if(null !== lastAttachedFile && "" !== lastAttachedFile && undefined !== lastAttachedFile){
  			var serverPath = common.getServerurl();
  			if(lastAttachedFile.indexOf(",") == -1){
  					var lastImgPath = serverPath + lastAttachedFile;
  					addPic.imgOnLoad(lastAttachedFile,lastImgPath);
  			}else{
  				arrlastAttachedFile = lastAttachedFile.split(",");
					for(var i=arrlastAttachedFile.length-1;i>=0;i--){
						if(null !== arrlastAttachedFile[i] && "null" !== arrlastAttachedFile[i] && "" !== arrlastAttachedFile[i]){
							var lastImgPath = serverPath + arrlastAttachedFile[i];
							//处理图片回显
							addPic.imgOnLoad(arrlastAttachedFile[i],lastImgPath);
						}
					}
  			}
	}
}
  		
	addPic.imgOnLoad = function(saveImgUrl,AllImgUrl){
		imageIndexIdNum++;
		var placeholder = document.createElement('div');
		placeholder.setAttribute('class', 'image-item space');
		var closeButton = document.createElement('div');
		closeButton.setAttribute('class', 'image-close');
		closeButton.innerHTML = 'X';
		
		//小X的点击事件
		closeButton.addEventListener('tap', function(event) {
			setTimeout(function() {
				addPic.imageList.removeChild(placeholder);
			}, 0);
			return false;
		}, false);
		placeholder.classList.remove('space')
		placeholder.style.backgroundImage = 'url(' + AllImgUrl + ')';
		placeholder.setAttribute("data_img",saveImgUrl);
		placeholder.appendChild(closeButton);
		$(addPic.imageList).prepend(placeholder);
  }
	//提交 调方法
	addPic.getPicRUrl = function(){
			//获取图片的信息
		var imgParams = [];
  		var imgLis = $('.image-list').find(".image-item");
		for(var i=0;i<imgLis.length;i++){
			var img_url = imgLis.eq(i).attr("data_img");
			imgParams.push(img_url);
		}
		var data = imgParams.join(',');
		if(data[0] == ","){
			data = data.substring(1,data.length);
		}
		if(data[data.length] == ","){
			data = data.substring(0,data.length-1);
		}
		return data;
	}
	
	//正常图片展示
	addPic.showImg = function(className,lastAttachedFile){
		if(lastAttachedFile[0] == ","){
			lastAttachedFile = lastAttachedFile.substring(1,lastAttachedFile.length);
		}
		if(null !== lastAttachedFile && "" !== lastAttachedFile && undefined !== lastAttachedFile){
			var serverPath = common.getServerurl(); //获取图片端路径
			var html = '';
			if(lastAttachedFile.indexOf(",") == -1){
					var lastImgPath = serverPath + lastAttachedFile;
					console.log(lastImgPath);
					var html = '<img src="'+lastImgPath+'" data-preview-src />'
					$('.mui-content-padded').append(html);
			}else{
				arrlastAttachedFile = lastAttachedFile.split(",");
				$('.'+className).html("");
				for(var i=0;i<arrlastAttachedFile.length;i++){
					if(null !== arrlastAttachedFile[i] && "null" !== arrlastAttachedFile[i] && "" !== arrlastAttachedFile[i]){
						var lastImgPath = serverPath + arrlastAttachedFile[i];
						console.log(lastImgPath);
						//处理图片回显
						var html = '<img src="'+lastImgPath+'" data-preview-src data-preview-group="1" />'
						$('.'+className).append(html);
					}
				}
			}
		}
	}
	return addPic;
});