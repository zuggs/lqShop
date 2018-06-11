require.config({//配置模块
	//baseUrl://改变基目录，一般不用，用相对路径即可
	paths:{//标准化的模块
		"jquery":"jquery-1.11.3"
	},
	shim:{//非标准化模块，即传统封装函数
		"cookie":{
			"exports":"cookie"//变量或函数名
		}
	}
});
require(["jquery","cookie"],function($,cookie){//使用模块
	//$("#header").load("../html/header.html",function(){//载入网页头部和尾部文件
		$("#message>h4").click(function(){//注册点击事件
			location.href="/register";
		});
		$("#frame>h2>i").css("cursor","pointer").click(function(){//注册点击事件
			location.href="/register";
		});
		if(cookie.get("number")){//购物车初始值
			$("#shopCart>div").html(cookie.get("number"));
		}
	//});
	//$("#footer").load("../html/footer.html");
	$("#btn").click(function(){
		var a=$("#frame input[type='text']").val(),
			b=$("#frame input[type='password']").val(),
			options={
				url:"login/confirm",
				data:{
					username:a,
					pw:b,
					tocken:$("#tocken").is(":checked") ? true :false
				},
				type:"post",	
				dataType:"json"			
			};
		$.ajax(options).then(succ);
		function succ(r){
			switch(r){
				case "0":alert("我们的服务器真的崩了！！")
				case "1":alert("该账户未被注册！！")
				case "2":alert("密码错误，你不会是盗号的！！")
				default:
					$("#btn>input").val("登录成功，我们稍后将转到首页！！");
					setTimeout(()=>{
						location.href="/";
					},2000);
			}	
		}		
	});
});

