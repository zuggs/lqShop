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
require(["jquery","cookie","data"],function($,cookie,data){
	//$("#header").load("../html/header.html",function(){//载入网页头部和尾部文件
		$("#login>#message>h4").click(function(){//注册点击事件
			location.href="register.html";
		});
		$("#login>#message>h3").click(function(){//登录点击事件
			location.href="login.html";
		});
		if(cookie.get("number")){//购物车初始值
			$("#shopCart>div").html(cookie.get("number"));
		}
		var a=cookie.get("now");//登录成功后转到的页面
		if(a!=undefined){
			//var b=a.match(/account=(.+)/)[1];
			$("#insert").html(a);
			$("#login>#message>h4").html("");
			$("#login>#message>h3").css("color","#0770c1").html("退出").click(()=>{
				var url=location.href;
				cookie.remove("now");
				location.href=url;				
			});
		}	
		var i=-1;
		$("#form>form>input[type='text']").keyup(function(e){//搜索提示,下面网址是百度搜索接口
			//https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?cb=callback&wd=nihao
			var v=$(this).val(),
				url="https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?cb=callback&wd=";
			//console.log(e.keyCode);	
			var len=$("#form>form>ul>li").length;
			switch(e.keyCode){
				case 38://上										
					i--;
					if(i<0) i=len-1;
					$("#form>form>ul>li").css("background","");					
					$("#form>form>ul>li").eq(i).css("background","#ffdfc6");
					break;					
				case 40://下
					i++;
					if(i>=len) i=0;
					$("#form>form>ul>li").css("background","");					
					$("#form>form>ul>li").eq(i).css("background","#ffdfc6");
					break;
				case 13:
					if(i==len-1){
						$("#form>form>ul").hide();
						i=-1;
					}else if(i<0&&v!=""){
						search();
					}else{
						$(this).val($("#form>form>ul>li").eq(i).html() );
						i=-1;
						$("#form>form>ul").hide();						
					}					
					break;
				default:
					$("body>script").remove();//删除上次的script标签
					var script=$("<script></script>");
					$("body").append(script);
					script.attr("src",url+v)
			}
			
		});
		$("#form>form span").click(()=>{
			//console.log(1);
			$("#form>form ul").hide();
		});
		function search(){//搜索框按钮点击事件
			var v=$("#form>form>input[type='text']").val();
			if(v=="手机"){
				location.href="list.html";//点击搜索按钮进入列表页
			}
		}
		$("#form>form>input[type='button']").click(search);
		//$("#sums>ul")//二级菜单点击事件
		/* var a=location.search;//登录成功后转到的首页页面	
		if(a!=""){
			var b=a.match(/account=(.+)/)[1];
			$("#insert").html(b);
			$("#login>#message>h4").html("");
			$("#login>#message>h3").css("color","#0770c1").html("退出").click(()=>{
				location.href="index.html";				
			});
		}	 */	
	//});
	//$("#footer").load("../html/footer.html");
	$("#gdKind>li").click(function(){//左侧列表的手风琴效果
		$("#gdKind>li").removeClass("minus");//所有的li去减号
		if($(this).children("ul").is(":hidden")){//只能判断显隐情况，因为class在前面统一清楚了，或在前面判断class
			$(this).addClass("minus");
		}else{
			$(this).removeClass("minus");
		}
		$("#gdKind>li>ul").stop().slideUp();//所有li下的ul隐藏
		$(this).children("ul").stop().slideToggle()//该li下的ul显示或隐藏		
	});
	//var p=data[2];
	var options={
		url:"goods/list",
		type:"get",
		datatype:"json"
	};
	$.ajax(options).then((r)=>{
		//console.log(r.list);
		var p=r.list;
		p.forEach((g,i)=>{
			var li=$("<li></li>"),
				img=$("<img src="+'../images/'+g.src+">"),
				h2=$("<h2></h2>"),
				h3=$("<h3></h3>"),
				h4=$("<h4></h4>"),
				span=$("<span></span>");
			$("#gdList").append(li.append(img.css("cursor","pointer"))
						.append(h2.css("cursor","pointer")).append(h3).append(h4));
			h2.html(g.title);
			h3.html("商城价：￥<i>"+g.price+" &nbsp;</i>").append( span.html("加入购物车")  );					
			span.click(()=>{//购物车点击事件
				var img2=img.clone();//复制后也是jq对象
				var top=$("#shopCart").offset().top,
					left=$("#shopCart").offset().left;
				li.append(img2.addClass("img2"));
				console.log(left,top);
				img2.css({"left":img.offset().left,"top":img.offset().top});
				img2.animate({"left":left,"top":top,"width":32,"height":32},1000,function(){
					img2.remove();
					var v= cookie.get("number") ? cookie.get("number") :0;
					cookie.set("number",++v,7);
					$("#shopCart>div").html(v);
					if( !cookie.get("g"+g.id) ){
						num=0;
					}else{
						var num=Number( cookie.get("g"+g.id) );					
					}
					num++;
					cookie.set("g"+g.id,num,7);
				})
				//console.log(img2.offset().top,$("#shopCart").offset().left)			
			});
			h4.html("利群商城自营");
			img.click(detail);
			h2.click(detail);
			function detail(){//点击之后通过ajax往详情页传参并跳转
				location.href="detail.html?g="+g.id;
			}
		});
	});
});
