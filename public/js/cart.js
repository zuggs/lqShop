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
				li5=$("<li></li>"),
				li6=$("<li></li>"),
				li7=$("<li></li>"),
				add=$(" <input type='button' value='+'>"),
				minus=$(" <input type='button' value='-'>"),
				inp=$("<input type='text' value="+''+num+"> ");
			$("#goodsD").append(ul.addClass("arg clearfix").append(li1).append(li2).append(li3)
			.append(li4).append(li5).append(li6).append(li7));
			//console.log("<img src="+'../images/'+obj.src+"/>")
			li1.append("<img src="+'../images/'+obj.src+"/>")
			   .append("<p>"+obj.title+"</p>")
			   .children().css("float","left");
			li2.html("￥"+obj.price);
			li3.append(minus)
			   .append(inp)
			   .append(add);
			function change(){
				var cookieNumber=Number(cookie.get("number") )?cookie.get("number"):0;
				li4.html("￥"+( obj.price*num).toFixed(2) );
				li5.html((obj.price*num/100).toFixed(2));
				$(".li2>span:eq(0)").html(cookieNumber);
				$(".li2>i").html(w.toFixed(2)+"Kg");
				$(".li2>span:eq(1)").html("￥"+sum.toFixed(2));
				$(".li3 span:eq(0)").html(cookieNumber);
				$(".li3 span:eq(1)").html("￥"+sum.toFixed(2));
			}
			li4.html("￥"+( obj.price*num).toFixed(2) );
			li5.html((obj.price*num/100).toFixed(2));
			li6.css("cursor","pointer").html("清除");
			li7.html("满赠活动");	
			w+=parseFloat(obj.weight)*num;
			sum+=obj.price*num;
			li3.children("input[type='button']").click(function(){//按钮点击加减事件
				var vl=inp.val();
				var newvl=eval( vl+$(this).val()+1 ),
					cookieNumber=Number(cookie.get("number"));
					console.log(vl+$(this).val()+1,newvl,vl);
				if(newvl>0){
					//console.log(newvl)
					inp.val(newvl);
					num=newvl;
					sum+=(newvl-vl)*obj.price;
					w+=(newvl-vl)*parseFloat(obj.weight);
					console.log(cookieNumber);
					cookieNumber+=(newvl-vl);
					console.log(cookieNumber);
					cookie.set("number",cookieNumber,7);
					cookie.set("g"+obj.id,newvl,7);
					change();
				}				
			});
			var vl=inp.val();
			function blurEvent(newvl){
				var cookieNumber=Number(cookie.get("number"));
				num=newvl;
				sum+=(newvl-vl)*obj.price;
				w+=(newvl-vl)*parseFloat(obj.weight);
				cookieNumber+=(newvl-vl);
				cookie.set("number",cookieNumber,7);
				cookie.set("g"+obj.id,num,7);
				if(num==0) cookie.remove("g"+obj.id);
				change();
				vl=newvl;
			}
			inp.blur(()=>{//失焦事件触发cookie函数								
				var newvl=inp.val();
				/*if(newvl>0){					
					blurEvent();
				}else{
					inp.val(1);
					var newvl=1;
					blurEvent();
				}*/
				if(newvl<=0){
					inp.val(1);
					var newvl=1;
				}
				blurEvent(newvl);
			})
			li6.click(()=>{//点击清除事件(清除cookie及相关参数)
				ul.remove();
				var newvl=0;
				blurEvent(0);
			})
		}
		var cookieNumber=cookie.get("number") ? cookie.get("number") :0;
		$(".li2>span:eq(0)").html(cookieNumber);
		$(".li2>i").html(w.toFixed(2)+"Kg");
		$(".li2>span:eq(1)").html("￥"+sum.toFixed(2));
		$(".li3 span:eq(0)").html(cookieNumber);
		$(".li3 span:eq(1)").html("￥"+sum.toFixed(2));
	});
});


































});