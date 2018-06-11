//	1，求是否为闰年          isLeap( year )   year为年份，如果是闰年，该函数返回true；闰年的条件，能被4整除且不能被100整除，或 能被100整除且能被400整除。

function isLeap( year ){
	return  ( (year%4==0 && year%100!=0) || (year%400==0) ) ? true : false;	
}




//	2，求当前月份的有多少天           howDays( year, month, type )   type为分类，设置1返回当月总天数；2返回当月工作日总数（周一至周五）；3返回当月休息日总数（周六周日）；注无需考虑其他法定假日。

// 这一年的这一月总共有多少天
function howDay( year, month ){
	if ( [1,3,5,7,8,10,12].indexOf(month) > -1 ){	
		return 31;
	}else if( [4,6,9,11].indexOf(month) > -1 ){
		return 30;
	}else if( 2==month ){
		return isLeap( year ) ? 29 : 28;
	}	
}

// 求这一年的这一月共有多少天，休息日有多少天，工作日有多少天
function monthLoop( year, month ){
	var rest=0, work=0;
	// 对当前月份的每一天循环
	var len = howDay( year, month );
	for( var i=1; i<=len; i++ ){
		var date = new Date(year+"-"+month+"-"+i);
		//console.log( date.toLocaleString() );
		if( [0,6].indexOf( date.getDay() ) > -1 ){
			rest++;
		}else{
			work++;
		}
	}
	return [len, work, rest];
}

// 根据type求当前月份的这种类型的天数
function howDays( year, month, type ){
	var arr = monthLoop( year, month );
	return arr[type-1];
}



//	3，求两个时间间隔      dateDiff( d1, d2, unit )    d1和d2为两个日期；unit为两个日期间隔的单位，可设置 Y M D h m s，分别对应年月日时分秒。默认为秒

function dateDiff( d1, d2, unit ){
	if( typeof(d1)=="string" ){
		d1 = new Date(d1);
	}
	if( d1.toString()=="Invalid Date" ){
		return "错误：请输入有效的日期"
	}
	if( typeof(d2)=="string" ){
		d2 = new Date(d2);
	}
	if( d2.toString()=="Invalid Date" ){
		//throw( new Error("错误：请输入有效的日期") )	// 在控制台上抛一个错误出来
		return "错误：请输入有效的日期"
	}
	
	var dist = d2.getTime() - d1.getTime();	// 时间间隔(单位是毫秒)
	
	switch(unit){
		case "Y":
			return d2.getFullYear()-d1.getFullYear();
		case "M":
			return (d2.getFullYear()-d1.getFullYear())*12+(d2.getMonth()-d1.getMonth());
		case "D":
			return dist/1000/60/60/24;
		case "h":
			return dist/1000/60/60;
		case "m":
			return dist/1000/60;
		case "s":
			return dist/1000;
		case "ms":
			return dist;
	}
	
}







//	4，求年积日，输入一个日期，是这一年的第多少天      dayOfYear( date )


function dayOfYear( date ){
	if( typeof(date)=="string" ) date = new Date(date);
	
	var Y = date.getFullYear();
	var M = date.getMonth()+1;
	var D = date.getDate();
	var sum = 0;
	
	for( var i=1; i<M; i++ ){
		//console.log( i, howDay( Y, i ) );
		sum += howDay( Y, i );
	}
	sum += D;
	return sum;
}















//	5，输入一个秒数，这个秒数能够转为几天几时几分几秒      showDate( second ) 


function showDate( second ){
	var s = second;
	
	var d = parseInt( s / (60*60*24) );
	s = s%(60*60*24);
	
	var h = parseInt( s / (60*60) );
	s = s%(60*60);
	
	var m = parseInt( s / 60 );
	s = s % 60;
	
	return d+"天"+h+"时"+m+"分"+s+"秒";
}





//	6，格式化显示日期        formatDate( date, str )    date为日期；str为显示格式，可设关键字含 Y M D h m s或MM DD hh mm ss（只有个位时，前面用0补齐），例如： formatDate( ‘2012/1/2 12:4:27’ , ‘Y-MM-D h时mm分ss秒w’) 返回 ‘2012-01-2 12时04分27秒’


function formatDate( date, str ){
	if( typeof(date)=="string" ){
		date = new Date(date);
	}
	
	var Y = date.getFullYear();
	var M = date.getMonth()+1;
	var MM = (M<10) ? "0"+M : M;
	var D = date.getDate();
	var DD = (D<10) ? "0"+D : D;
	var h = date.getHours();
	var hh = (h<10) ? "0"+h : h;
	var m = date.getMinutes();
	var mm = (m<10) ? "0"+m : m;
	var s = date.getSeconds();
	var ss = (s<10) ? "0"+s : s;
	
	var w = "星期"+"日一二三四五六"[date.getDay()];
	
	str = str.replace("Y", Y);
	str = str.replace("MM", MM);
	str = str.replace("M", M);	
	str = str.replace("DD", DD);
	str = str.replace("D", D);
	str = str.replace("hh", hh);
	str = str.replace("h", h);
	str = str.replace("mm", mm);
	str = str.replace("m", m);
	str = str.replace("ss", ss);
	str = str.replace("s", s);
	str = str.replace("w", w);
	return str;
	
	
}
//把所有函数打包在一起
var date={
	"isLeap":isLeap,//求是否为闰年
	"howDay":howDay,//求当前月份的有多少天 howDays( year, month, type ) type为分类，设置1返回当月总天数；2返回当月工作日总数（周一至周五）；3返回当月休息日总数（周六周日）；注无需考虑其他法定假日。
	"dateDiff":dateDiff,//求两个时间间隔      dateDiff( d1, d2, unit )    d1和d2为两个日期；unit为两个日期间隔的单位，可设置 Y M D h m s，分别对应年月日时分秒。
	"dayOfYear":dayOfYear,//求年积日，输入一个日期，是这一年的第多少天
	"showDate":showDate,//输入一个秒数，这个秒数能够转为几天几时几分几秒
	"formatDate":formatDate	//格式化显示日期        formatDate( date, str )    date为日期；str为显示格式，可设关键字含 Y M D h m s或MM DD hh mm ss（只有个位时，前面用0补齐），例如： formatDate( ‘2012/1/2 12:4:27’ , ‘Y-MM-D h时mm分ss秒w’) 返回 ‘2012-01-2 12时04分27秒’
}




















