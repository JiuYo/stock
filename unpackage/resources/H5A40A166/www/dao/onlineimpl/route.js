define([], function () {　　　　
  var route = {};
  //接口地址
  route.tokens="tokens";//登录
  route.outTokens="tokens/";//销毁token
  /*获取应用*/
  route.getFuncByUserForApp="linkAndFunWebController/getFuncByUserForApp";
	/*上传文件*/
	//转BASE64 后上传
	route.uploadFile ="uploadImage/oneImageUploadForBase64"; 
	//放至from表单中
	route.UploadForFromData = "uploadImage/UploadForFromData"; 
  return route;
});
