define(['jquery',"mui","common","service/framecore/contact","model/UserModel","muiindexedlist"], function ($,mui,common,contactService,umodel,muiindexedlist) {　　　　
  var lxrList = {};
  lxrList.init = function (page) {
	mui.init();
	mui.currentWebview.addEventListener("show",function () {
		mui.ready(function() {
			var list = document.getElementById('list');
			//calc hieght
			list.style.height = document.body.offsetHeight + 'px';
			console.log(document.body.offsetHeight);
			//create
			window.indexedList = new mui.IndexedList(list);
		});
	})
	
}
  


  
  return lxrList;
});
