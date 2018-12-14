function setCookie(key,value,days){
	if( days ){
		var now = new Date();
		now.setTime(now.getTime() + days*24*60*60*1000 ) 
		document.cookie=key+"="+value + ";expires="+now;
	}else{
		document.cookie=key+"="+value;
	}
}
   
    $("#main").on("click","button",function(){
			var moveImg = $(this).parent().find("img");
			var startObj = $(this);
			var endObj = $(".bycar");
			$.fnInit(startObj,endObj).fnMove(moveImg);
			// fnFly(startObj,endObj,moveImg);
			
			var arr = [];//用于存放多个商品对象  [{},{},{},....]
			var flag = true;//假设值为true时 执行push()操作
			//用于存放当前点击的商品信息
			var json = {
				id : $(this).data("id"),
				src : $(this).data("src"),
				name : $(this).data("name"),
				price : $(this).data("price"),
				count : 1
			}
			//再次点击时，先将cookie中的数据取出来（是一个数组）
			//将取出来的数组 先存入到 arr中 
			var brr = getCookie("shoplist");
			if( brr.length != 0 ){//第一次向数组中存对象时，cookie是没有数据的
				//当cookie中有数据时  才执行下面的操作
				arr = brr;
				//遍历数组arr  判断当前点击的商品是否在arr中存在，如果存在就将该商品的数量累加
				//判断依据 ：  当前点击的对象的id ==  arr[i].id
				for( var i = 0 ; i < arr.length ; i++ ){
					if( json.id == arr[i].id ){  
						arr[i].count++;
						flag = false;
					}
				}
			}
		
			if( flag ){
				//将json存入到数组中
				arr.push( json );
			}
			
			//在数组存入到cookie中  
			//cookie中存储的一定是字符串
			setCookie( "shoplist",JSON.stringify( arr ) );
		})
    
        function setCookie(key,value,days){
	if( days ){
		var now = new Date();
		now.setTime(now.getTime() + days*24*60*60*1000 ) 
		document.cookie=key+"="+value + ";expires="+now;
	}else{
		document.cookie=key+"="+value;
	}
}
function getCookie(key){
	//如果cookie中有数据  才可以获取数据
	if(document.cookie){		
		var cookieInfo = document.cookie;
		//cookie中可能会包含一些 额外的数据，这些数据特点是由   分号和空格间隔的
		//所以 先将 分号和空格  替换掉   替换成  ;
		var arr = cookieInfo.replace(/;\s/g,';').split(";");	
		for(var i=0;i<arr.length;i++){
			item = arr[i].split("=");
			if(item[0] == key){
				brr = item[1];
				return JSON.parse(brr);//如果找到 我们想要的键，将值转成数组返回 
			}
		}
		//如果cookie中 没有我们想获取的键值，直接返回一个空数组
		return [];
	}
	//如果cookie中没有数据，直接返回一个空数组
	return [];
}

function removeCookie(key){
	setCookie(key,"",-1);
}





	//插件编写  抛物线
	$.extend({
		fnInit : function(startObj,endObj){ //设置坐标
			//起始点坐标
			this.startPoint = {
				"x":startObj.offset().left + startObj.width()/2,
				"y":startObj.offset().top
			}
			//结束点坐标
			this.endPoint = {
				"x":endObj.offset().left + endObj.width()/2,
				"y": endObj.offset().top
			}
			//最高点坐标
			this.topPoint = {
				"x": this.endPoint.x - 100 ,
				"y": this.endPoint.y - 80
			}
			//根据三点坐标 
			//根据三点坐标确定抛物线的系数

			this.a = ((this.startPoint.y - this.endPoint.y) * (this.startPoint.x - this.topPoint.x) - (this.startPoint.y - this.topPoint.y) * (this.startPoint.x - this.endPoint.x)) / ((this.startPoint.x * this.startPoint.x - this.endPoint.x * this.endPoint.x) * (this.startPoint.x - this.topPoint.x)-(this.startPoint.x * this.startPoint.x - this.topPoint.x * this.topPoint.x) * (this.startPoint.x - this.endPoint.x));  
					
			this.b = ((this.endPoint.y - this.startPoint.y) - this.a * (this.endPoint.x * this.endPoint.x - this.startPoint.x * this.startPoint.x)) / (this.endPoint.x - this.startPoint.x);  
					
			this.c = this.startPoint.y - this.a * this.startPoint.x * this.startPoint.x - this.b * this.startPoint.x;
			return this;
		},
		fnMove :function(moveImg){ //商品运动
			//抛物线方程 ： y = this.a*x*x + this.b*x + this.c
			//创建商品：
			//商品的起始点坐标
			var x = this.startPoint.x;
			
			var y = this.startPoint.y;
	
			var  good = $("<img>");
			good.attr("src",moveImg.attr("src"));
			good.css({
				width : 20,
				height : 20,
				position : "absolute",
				left : x,
				top : y
			})
			$("body").append(good);
			var timer = setInterval(function(){
				x = x + 10;
				y = this.a*x*x + this.b*x + this.c;
				if( x < this.endPoint.x ){
					good.css({
						left : x,
						top : y
					})
				}else{
					good.css("top",this.endPoint.y);
					clearInterval(timer);
					good.remove();
					$("#shopNum").html( Number( $("#shopNum").html() )+1 );
				}
			}.bind(this),30)
		}
	})