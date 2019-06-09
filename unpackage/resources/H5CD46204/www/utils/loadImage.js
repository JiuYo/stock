define(['jquery', 'common','mui'], function($, common,mui) {
	//全局变量
	var page=null;
	var selectImageName = "";
	
	var loadimage = {
  	};
		
	mui.plusReady(function() {
//		loadimage.isconfirme();
		 page={  
            imgUp:function(success){  
                var m=this;  
                plus.nativeUI.actionSheet({cancel:"取消",buttons:[  
                    {title:"拍照"},  
                    {title:"从相册中选择"}  
                ]}, function(e){//1 是拍照  2 从相册中选择  
                    switch(e.index){  
                        case 1:loadimage.appendByCamera(function(imagedata){
					            	success(imagedata);
					            });break;  
                        case 2:loadimage.appendByGallery(function(imagedata){
					            	success(imagedata);
					            });break;
                    }  
                });  
            }  
            //摄像头  
        } 
	});
	
	loadimage.isconfirme = function(success){
		page.imgUp(function(imagedata){
        	success(imagedata);
        });
	}
                    
              
    // 拍照添加文件
    loadimage.appendByCamera = function(success){
        plus.camera.getCamera().captureImage(function(e){
        	plus.gallery.save(e, function() {
	            console.log(e);
	            plus.io.resolveLocalFileSystemURL(e, function(entry) {
		            selectImageName = e.substr(e.lastIndexOf('/') + 1);
		            var path = entry.toLocalURL(); 
		            document.getElementById("headimg").src = path; 
		            loadimage.upload(function(imagedata){
		            	success(imagedata);
		            });
	            //就是这里www.bcty365.com 
	            }, function(e) { 
	                mui.toast("读取拍照文件错误：" + e.message); 
	            }); 
			});  
        });    
    }
    // 从相册添加文件
    loadimage.appendByGallery = function(success){
        plus.gallery.pick(function(path){
        	var name = path.substr(path.lastIndexOf('/') + 1);
			common.isImgType(name);
        	selectImageName = path.substr(path.lastIndexOf('/') + 1);
            document.getElementById("headimg").src = path;
            loadimage.upload(function(imagedata){
	            	success(imagedata);
	            });
        });
    }
            
              
    
    
    // 上传文件
    loadimage.upload = function(success){
    	//获取图片元素
    	var files = document.getElementById('headimg');
    	//获取token及上传调用的方法
    	var serverurl = common.getAllServerurl();
		var url = serverurl + "uploadImage/UploadImgByFinal";
		var token = plus.storage.getItem("token");
        files.src = decodeURI(files.src);
        console.log(files.src);
        var wt=plus.nativeUI.showWaiting();
        var task=plus.uploader.createUpload(url,
            {method:"POST"},
            function(t,status){ //上传完成
            	var returnData = JSON.parse(t.responseText);
                if(returnData.success){
                    mui.toast("上传成功，正在保存请稍后!");
                    var data =  returnData.obj;
                    wt.close(); //关闭等待提示按钮
                    if(success){
						success(data);
					}
                }else{
                    mui.toast("上传失败!");
                    console.log(status);
                    wt.close();//关闭等待提示按钮
                }
            }
        );
        task.setRequestHeader('X-AUTH-TOKEN',token);
        //添加其他参数
        task.addData("name",selectImageName);
        task.addFile( decodeURI(files.src),{key:"dddd"});
        task.start();
    }      
      
	
	return loadimage;
});