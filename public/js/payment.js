require.config({//配置模块
	"paths":{//标准化模块
		"jquery":"jquery-1.11.3"
	},
	"shim":{//非标准化模块
		"cookie":{
			"exports":"cookie"
		},
		"data":{
			"exports":"m"
		}
	}
});
require(["jquery","cookie","data"],function($,cookie,data){//使用模块
$("#top1>h5").click(function(){//注册点击事件
		location.href="register.html";
	});
	$("#top1>h4>span").click(function(){//登录点击事件
		location.href="login.html";
	});
var a=cookie.get("now");//登录成功后显示的页面
if(a!=undefined){
	//var b=a.match(/account=(.+)/)[1];
	$("#top1>h4>span").html(a);
	$("#top1>h5").html("退出").click(()=>{
		var url=location.href;
		cookie.remove("now");
		location.href=url;				
	});
}
$(".img3").click(()=>{//top按钮回顶部快捷键
	$("html").animate({"scrollTop":0},1000);
})
//购物车商品陈列
var phone=data[2],g=cookie.getAll(/^g\d+$/),sum=0,w=0;
//console.log(g);
phone.forEach((obj,ind)=>{
	g.forEach((obj1,i)=>{
		//console.log(obj1.cookieName,obj.id)
		var v=obj1.cookieName.slice(1),
			num=Number( obj1.cookieValue );
		if(v==obj.id){
			var ul=$("<ul></ul>"),
				li1=$("<li></li>"),
				li2=$("<li></li>"),
				li3=$("<li></li>"),
				li4=$("<li></li>"),
				li5=$("<li></li>");
			$("#gd>div").append(ul.addClass("gdpr clearfix").append(li1).append(li2).append(li3)
			.append(li4).append(li5));
			//console.log(obj.id.toString().length)
			if(obj.id.toString().length==1){
				li1.html("0000000"+obj.id);
			}else{
				li1.html("000000"+obj.id);				
			}			
			li2.html(obj.title);
			li3.html(obj.price);
			li4.html(num);
			li5.html(( obj.price*num).toFixed(2) );			
			w+=parseFloat(obj.weight)*num;
			sum+=obj.price*num;
		}
		
	});
});
$("#gd .r>span").html( sum.toFixed(2) );//总价
$("#gd .r>i").html( w.toFixed(2) );
$(".my1").html("￥"+sum.toFixed(2));
$(document).mousedown(()=>false);//拒绝默认事件
$("#menuc>ul>li").map((ind,elem)=>{//付款的选项卡效果
	$(elem).click(()=>{
		$("#menuc>ul>li").removeClass("selected");//所有的去掉class
		$(elem).addClass("selected");
	})
})
$("#way>img").map((ind,elem)=>{//点击改变图片边框
	$(elem).click(()=>{
		$("#way>img").css("border-color","")//所有的border颜色清空
		$(elem).css("border-color","#ff0000");
	})
})
$("#way>h4").click(()=>{//付款按钮事件
	alert("付款成功");
	cookie.remove("number");//清除数量cookie
	var g=cookie.getAll(/^g\d{1,2}$/);//清除商品cookie
	g.forEach((obj,ind)=>{
		cookie.remove(obj.cookieName);
	})
	//console.log(cookie.getAll(/^g\d{1,2}$/))
	location.href="index.html";
})


});