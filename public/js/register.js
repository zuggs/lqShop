//配置模块
require.config({
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
require(["jquery","cookie"],function($,cookie){
	$(".img3").click(()=>{//top按钮回顶部快捷键
		$("html").animate({"scrollTop":0},1000);
	});	
	if(cookie.get("number")){//购物车初始值
		$("#shopCart>div").html(cookie.get("number"));
	}
	//数字字母混合的4位验证码//字符编码48-57:0-9，65-90:A-Z，97-122: a-z
	function rand(){
		var arr='',arr2="";
		for(var i=48;i<=122;i++){
			arr+=String.fromCharCode(i);
			if(i==57) i=64;
			if(i==90) i=96;
		}
		for(var i=0;i<4;i++){
			arr2+=arr[ parseInt(Math.random()*arr.length) ];
		}
		return arr2;
	}
	$("#confirm").html(rand());
	function i1(){
		var v=$("#i1").val();
		if ( /(^\w+@\w+(\.\w+)+$|^1\d{10}$|^[a-zA-Z_]\w{5,14}$)/.test(v) ){
			//console.log($(this).siblings("i"));
			$("#i1").siblings("i").html("输入有效").removeClass().addClass("success");			
		}else{
			$("#i1").siblings("i").html("输入有误").removeClass().addClass("error");			
		}
	}
	function i2(){
		var v=$("#i2").val();
		if ( /\w{6,15}/.test(v) ){
			$("#i2").siblings("i").html("输入有效").removeClass().addClass("success");			
		}else{
			$("#i2").siblings("i").html("请输入大于6位的有效字符").removeClass().addClass("error");			
		}
	}
	function i3(){
		var v=$("#i3").val();
		
		if ( v==$("#i2").val() ){
			if(/\w{6,15}/.test(v)){
				$("#i3").siblings("i").html("输入正确").removeClass().addClass("success");															
			}else{
				$("#i3").siblings("i").html("密码未设置").removeClass().addClass("error");
			}					
		}else{
			$("#i3").siblings("i").html("密码不一致").removeClass().addClass("error");			
		}
	}
	function i4(){
		var v=$("#i4").val();	
		console.log(eval( "/^"+v+"$/i" ),$("#confirm").html(),v)
		if ( eval( "/^"+v+"$/i" ).test( $("#confirm").html() ) ){
			$("#i4").siblings("i").html("输入正确").removeClass().addClass("success");			
		}else{
			$("#i4").siblings("i").html("验证码错误").removeClass().addClass("error");
			$("#confirm").html(rand());
		}
	}
	$("#i1").blur(i1);
	$("#i2").blur(i2);
	$("#i3").blur(i3);
	$("#change").css("cursor","pointer").click(function(){
		$("#confirm").html(rand());
	});
	$("#i4").blur(i4);
	$("#btn").click(()=>{//注册按钮点击事件
		i1();i2();i3();i4();
		var flag=0;
		$("#register p i").map((ind,e)=>{
			 if( $(e).hasClass("success") ) flag++;
		});
		if( $("#p2 input").prop("checked")&&flag==4){
			var account=$("#i1").val(),
				password=$("#i2").val(),
				options={
					url:"/register/confirm",
					data:{
						username:account,
						pw:password
					},
					type:"post"
				};
			$.ajax(options).then(succ,err);
			function succ(r){
				switch(r){
					case "0": alert("数据库错误");break;
					case "1": alert("该账户已被注册");break;
					default:
						$("#btn").val("注册成功，我们将会跳转到登录页面");
						setTimeout(()=>{
							location.href="/login";
						},1000)
				}
			}
			function err(e){
				console.log(e);
			}			
		}else{
			alert("请输入完整信息");
		}
	});
});