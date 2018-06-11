//配置模块
require.config({
	//baseUrl://改变基目录，一般不用，用相对路径即可
	paths:{//标准化的模块
		"jquery":"jquery-1.11.3"
	},
	shim:{//非标准化模块，即传统封装函数
		"cookie":{
			"exports":"cookie"//变量或函数名
		},
		"data":{
			"exports":"m"
		},
		"date":{
			"exports":"date"
		}
	}
});
require(["jquery","data","date","cookie"],function($,data,date,cookie){
//$(function(){
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
				case 13://回车键
					if(i==len-1){
						$("#form>form>ul").hide();
						i=-1;
					}else if(i<0){
						
					}else{
						$(this).val($("#form>form>ul>li").eq(i).html() );
						$("#form>form>ul").hide();
						i=-1;
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
		$("#form>form>input[type='button']").click(function(){//搜索框按钮点击事件
			var v=$("#form>form>input[type='text']").val();
			if(v=="手机"){
				location.href="list.html";//点击搜索按钮进入列表页
			}			
		});
		//$("#sums>ul")//二级菜单点击事件
		//var a=location.search;
		var a=cookie.get("now");//登录成功后转到的首页页面
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
	//});
	//$("#footer").load("../html/footer.html");
	var ul,ul1,list=data[0],goods=data[1][0],g=data[1][1],ul2,n=1,fn;
	$("#list>li").mouseenter(function(){//菜单栏移入移出事件
	//$("#list").append(ul).delegate("li","mouseenter",function(){
		$("#list>li").children("ul").remove();//ul.html("");//清空上一次ul的内容
		var i=$(this).index();
		ul=$("<ul></ul>");
		ul.addClass("menu");
		$(this).append(ul);		
		list[i].map(function(obj,ind){			
			var li=$("<li></li>"),
				h2=$("<h2></h2>"),
				p=$("<p></p>"),
				h3=$("<h3></h3>"),
				p2=$("<p></p>");
				span=$("<span>更多 &gt;</span>");
			ul.append(li);
			li.addClass("menu-t").append(h2).append(p).append(h3).append(p2);
			h2.css("background","url(../images/"+obj.img+") no-repeat bottom 0 left 13px")
			  .html(obj.name).append(span);
			if(obj.name=="手机"){
				span.click(function(){
					location.href="goods/list";//进入手机列表页
				});
			}
			obj.kind.map(function(goods,ind){
				//console.log(ind,goods);
				var span2=$("<span></span>")
				p.append(span2.append(goods));
			});
			h3.html("品牌");
			obj.bind.map(function(goods,ind){
				//console.log(ind,goods);
				var span3=$("<span></span>")
				p2.append(span3.append(goods));
			});
		});
		ul.stop().show();		
	}).mouseleave(function(){
		ul.stop().hide();
	});	
	$("#shift>div").eq(0).css({"background":"#fff","color":"#000"})//默认值
	$("#shift>div").map(function(ind,item){
		//console.log($(item),ind);
		$(item).click(function(){
			n=ind;
			fn();
		});
	});
	fn=()=>{//轮播函数
		if(n==8){
			$("#bannerImg>ul").stop().animate({"left":-n*740},1000,function(){
				$("#bannerImg>ul").css("left",0);	
			});
			n=0;
		}else{
			$("#bannerImg>ul").stop().animate({"left":-n*740},1000);			
		}
		$("#shift>div").css({"background":"","color":""})//清除所有圆点样式
		$("#shift>div").eq(n).css({"background":"#fff","color":"#000"});
		n++;
	}
	setInterval(fn,3000);//轮播图效果	
	ul1=$("#goodsList1");
	goods.forEach(function(obj,ind){//添加首页的商品
		var li=$("<li></li>"),
			img=$("<img src="+'/images/'+obj.src+">"),
			h2=$("<h2></h2>"),
			h3=$("<h3></h3>"),
			h4=$("<h4></h4>"),
			span=$("<span></span>"),
			t,d,timer;
		li.appendTo(ul1);
		//console.log("<img src='"+'../images/'+obj.src+"'>");
		li.append(img).append(h2).append(h3).append(h4);
		h2.html(obj.title);
		//img.src="../images/"+obj.src;
		h3.html("抢购价: <span>￥"+obj.price+'</span>');
		h4.html("<i class='iconfont icon-naozhong'><i>").append(span);
		timer=setInterval(()=>{
			d=new Date();
			t=date.showDate( parseInt( date.dateDiff(d,obj.time,"s") ) );//倒计时
			span.html(t);
			if(date.dateDiff(d,obj.time,"s")<=0 ){//判断是否小于0
				h4.css("color","#002").html("已过期");
				clearInterval(timer);
			} 
			
		},1000)		
	});
	//写floor列表，添加到$("#floor")中
	g.forEach((data,ind)=>{//data为一个数组，包含各个楼层的相关数据
		//console.log(data[0].src1);
		var div=$("<div></div>"),
			div1=$("<div></div>"),//left
			div2=$("<div></div>"),//center
			div3=$("<div></div>"),//right
			div4=$("<div></div>"),
			span1=$("<span></span>"),
			span2=$("<span></span>"),
			h2=$("<h2></h2>"),
			ul=$("<ul></ul>"),
			ul2=$("<ul></ul>"),
			l=data[0].title,
			img=$("<img src="+'../images/'+data[0].src1+">");
		$("#floor").append(div.addClass("clearfix").append(div1).append(div2).append(div3));
		div1.append(h2).append(ul.addClass("clearfix")).append(img).addClass("floorLeft");
		h2.css("background",l[2]).append(span1.html(l[0])).append(span2.html(l[1]));
		data[0].content.forEach((item,ind)=>{
			//console.log(item);
			var li=$("<li></li>");
			li.html(item);
			ul.append(li);
		});
		div2.append("<img src="+'../images/'+data[0].src2+">")//center	
		div3.append(ul2.addClass("clearfix")).append(div4);//right右上
		data[1].forEach((item,ind)=>{
			var li=$("<li></li>");
			ul2.append(li.html(item));
		})
		if(ind!=4){//右下
			var ul3=$("<ul></ul>"),
				h3=$("<h3></h3>"),
				img=$("<img src="+'../images/'+data[2].src+">");
			div3.addClass("floorR1");
			div4.addClass("clearfix").append(ul3.addClass("clearfix")).append(h3.append(img));
			data[2].goods.forEach((item,ind)=>{
				//console.log(item,ind);
				var li=$("<li></li>"),
					img=$("<img src="+'../images/'+item[2]+">"),
					h2=$("<h2></h2>"),
					h4=$("<h4></h4>"),
					span=$("<span>自营</span>");
				ul3.append(li.append(img).append(h2.html(item[0]))
				   .append(h4.html(item[1]).append(span) ) );
			});
		}else{
			div3.addClass("floorR2");
			var img1=$("<img src="+'../images/'+data[2].src1+">"),
				img2=$("<img src="+'../images/'+data[2].src2+">");
			div4.addClass("clearfix").append(img1).append(img2);
		}
	});
});
//});