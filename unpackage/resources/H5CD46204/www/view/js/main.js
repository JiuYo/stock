require.config({
	urlArgs: "ver=1.0_" + (new Date).getTime(),
    map: {
        '*': {
            'css': '../../libs/require/css'
        }
    },
    paths: {
    	mui: '../../libs/mui/mui.min',
    	//mui: '../../libs/mui/feedback',
    	muipicker: '../../libs/mui/mui.picker.min',
    	muipoppicker: '../../libs/mui/mui.poppicker',
    	muiindexedlist: '../../libs/mui/mui.indexedlist',
    	muiview: '../../libs/mui/mui.view',
    	muidtpicker:'../../libs/mui/mui.dtpicker',
    	muizoom:'../../libs/mui/mui.zoom',
    	muipreviewimage:'../../libs/mui/mui.previewimage',
        libs: '../../',
        dao:'../../dao',
        service:'../../service',
        utils:'../../utils',
        model:'../../model',
        jquery: "../../libs/easymob-webim-sdk/jquery-1.11.1",
        muiupdate: '../../libs/mui/mui.update',
        layer:'../../libs/layer',
        vue: "../../libs/easymob-webim-sdk/vue.min"
    },
    shim: {
        mui: {
            deps: [
                //'css!../../libs/mui/mui.min'
            ]
        },
        muipicker:{
			  deps:['mui'],
			  exports: 'muipicker'
		},
        muipoppicker:{
			  deps:['mui'],
			  exports: 'muipoppicker'
		},
		muiindexedlist:{
			  deps:['mui'],
			  exports: 'muiindexedlist'
		},
		muiview:{
			  deps:['mui'],
			  exports: 'muiview'
		},
		muidtpicker:{
			deps:['mui'],
			exports: 'muidtpicker'
		},
		muizoom:{
			deps:['mui'],
			exports: 'muizoom'
		},
		muipreviewimage:{
			deps:['mui'],
			exports: 'muipreviewimage'
		}
    }
});
/**
 * 页面级全局变量
 */
var page;
require(["jquery"], function ($) {
  require(["common"], function (common) {
    var currentPage = $("#current-page").attr("current-page");
    var targetModule = $("#current-page").attr("target-module");
    if (targetModule) {
      // 页面加载完毕后再执行相关业务代码比较稳妥
      $(function () {
        require([targetModule], function (targetModule) {
        	page = targetModule;
          // 不要在这里写业务代码
          //全部统一调用init方法
          //也就是每个模块都暴露一个init方法用于事件监听，页面内容加载等
          targetModule.init(currentPage);
        });
      });
      return;
    }
  });
});
