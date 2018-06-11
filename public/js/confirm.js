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
//$(".write")
$.getJSON("../js/city.json",function(data){//省市区（县）三级联动，添加到下拉菜单中
	//console.log(data);
	data.forEach(function(obj,ind){
		var province=obj.name;//添加省
		var v=JSON.stringify(obj.city);//把市的相关信息存到省的value中
		$("#s1").append("<option value='"+v+"'>"+province+"</option>");
		//console.log($( "#s1").val())
		/*if($("#s1").val()==obj.name){
			obj.city.forEach((obj2,ind)=>{
				$("#s2").append("<option value>"+obj2.name+"</option>");			
			});
		}	*/			
	});
	function Province(e){//当省或市下拉菜单改变时触发的综合事件
		//this.value=JSON.parse( e.val());
		this.e=e;
		this.change=function(){			
			if(this.e==2){
				this.value=JSON.parse( $("#s2").val());
				$("#s3").html("");
				this.value.forEach(function(obj,ind){
					//console.log(obj)
					var v=obj;					
					$("#s3").append("<option value='"+v+"'>"+obj+"</option>");				
				},this);
			}else if(this.e==1){
				this.value=JSON.parse( $("#s1").val());
				$("#s2").html("");
				this.value.forEach(function(obj,ind){
					//console.log(obj)
					var v=JSON.stringify(obj.area);	
					//console.log(v)
					$("#s2").append("<option value='"+v+"'>"+obj.name+"</option>");				
				},this);
			}			
		}
		this.change();
	}	
	new Province(1);//市的初始值
	new Province(2);//省的初始值
	$("#s1").change(()=>{
		new Province(1);
		new Province(2);
	});
	$("#s2").change(()=>{
		new Province(2);
	});
});
//部分输入框的默认选中
$(".write input").prop("checked",true)
//复选框改变禁用解除事件
var a=$("#address>li input,#address>li select").not(".write input");
$(".write input").change(function(){
	if( $(this).is(":checked") ){		
		a.attr("disabled",false);	
		$(".c>span:eq(0)").html("保存地址");
	}else{
		a.attr("disabled",true);
		$(".c>span:eq(0)").html("修改地址");
	}
});
//保存地址事件
$(".c>span:eq(0)").click(()=>{
	//console.log($(".write input").prop("checked"));
	if($(".write input").prop("checked")){
		a.attr("disabled",true);
		$(".c>span:eq(0)").html("修改地址");
		$(".write input").prop("checked",false);
	}else{
		a.attr("disabled",false);	
		$(".c>span:eq(0)").html("保存地址");
		$(".write input").prop("checked",true);		
	}
	
});
//$(document).mousedown(()=>false);
$("#submit").css("cursor","pointer").click(()=>{
	location.href="payment.html";
});


























});