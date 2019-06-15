define(['jquery', "mui", "common", "service/login", "model/UserModel", 'utils/systemutil'], function($, mui, common,
	slogin, umodel, systemutil) {
	var enrol = {};
	enrol.init = function(page) {
		mui.init();

		mui.plusReady(function() {
			enrol.indexpreload();
			mui.back = function() {
				mui.toast('退回到登录页');
				mui.openWindow({
					url: "login.html",
					id: 'login.html',
					show: {
						autoShow: true //页面loaded事件发生后自动显示，默认为true
					}
				})
				plus.webview.currentWebview().close();
			}

			// 注册的方法
			$("#reg").on('tap', function() {
				var username = document.getElementById("username");
				var password = document.getElementById("password");
				var nickname = document.getElementById("nickname");
				if (username.value.length == 0) {
					plus.ui.toast("用户名不能为空");
					return;
				}
				if (password.value.length == 0) {
					plus.ui.toast("密码不能为空");
					return;
				}
				if (nickname.value.length == 0) {
					plus.ui.toast("昵称不能为空");
					return;
				}
				// 调用注册方法
				enrol.enrolLogin();
			})
		})

		enrol.enrolLogin = function() {
			$('#layui-m-layer0').show();
			var username = $("#username").val();
			var password = $("#password").val();
			var nickname = $("#nickname").val();
			var umodel = {};
			umodel.username = username;
			umodel.password = password;
			umodel.realname = nickname;
			slogin.enrolLogin(umodel, function() {
				//成功处理
				$('#layui-m-layer0').hide();
				mui.toast('注册成功！')
				//跳转到主页面
				enrol.toIndex();
				plus.webview.currentWebview().close();
			}, function(errorinfo) {
				$('#layui-m-layer0').hide();
				mui.alert("登录失败!" + systemutil.parsestr(errorinfo));
			});
			// }else{
			// 	$('#layui-m-layer0').hide();
			// 	mui.toast("请阅读安全协议!");
			// }
		};

	var indepage;
	  var index_loaded_flag = false;//最开始是false
	  enrol.indexpreload = function()
	  {
		indepage = mui.preload({
				"id": 'index',
				"url": 'index.html'
			});

			indepage.addEventListener("loaded",function () {
				index_loaded_flag = true;
			});
	  }
		enrol.toIndex = function() {
			//使用定时器的原因：
			//可能执行太快，main页面loaded事件尚未触发就执行自定义事件，此时必然会失败
			var id = setInterval(function () {
				if(index_loaded_flag){
					clearInterval(id);
					mui.fire(indepage, 'show', null);
					indepage.show("pop-in");
				}
			},20);
		};
	};
	return enrol;
});
