window.onload = function(){
	var uname = document.getElementById("username");
	var pwd =document.getElementById("password");
	var qpwd=document.getElementById("pwd");
	var btn = document.getElementById("btn");

//给注册注册点击事件
btn.onclick =function(){
	var name = uname.value;
    var password = pwd.value;
	uname.value ="";
    pwd.value = "";
    console.log(name)
	//判断用户名和密码是否为空
	if(name && password){
        var date = new Date();
        var arr = [];
        var flag = true;
        var json = {
            name:name,
            password:password
        }
        var brr = getCookie("login_left");
        if( brr.length != 0 ){//第一次向数组中存对象时，cookie是没有数据的
            //当cookie中有数据时  才执行下面的操作
            arr = brr;
            //遍历数组arr  判断当前点击的商品是否在arr中存在，如果存在就将该商品的数量累加
            //判断依据 ：  当前点击的对象的id ==  arr[i].id
            for( var i = 0 ; i < arr.length ; i++ ){
                if( json.name == arr[i].name ){  
                    arr[i].count++;
                    flag = false;
                }
            }
        }
        if( flag ){
            //将json存入到数组中
            arr.push( json );
        }
        setCookie( "login_left",JSON.stringify( arr ) );
        // document.cookie = encodeURIComponent(name) + "=" +password+ ";expires="+date+";path=/";
					alert("注册成功。")
	}else{
					alert("请正确输入！")
		}
	}
}



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