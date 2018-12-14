//配置模块文件并重命名
requirejs.config({
	paths:{
		"jquery":"jquery-1.11.1",
		"vd" : "validate"
	}
})

//调用模块功能
requirejs(["jquery","vd"],function($,vd){
	//$("body").css("background","teal");
	//具体验证功能  操作页面元素 调用底层具体功能
	$("form").submit(function(){
		if( flagName && flagPwd && flagQpwd ){
			return true;
		}else{
			return false;
		}
	})
	
	//为每一个验证元素添加失去焦点事件
	//验证用户名
	var flagName = null;
	$("#username").blur(function(){
		var strName = $(this).val();
		if( vd.checkName( strName ) ){
			$(".user").html( "" );
			flagName = true;
		}else{
			$(".user").html("请输入5-14位字母和数字");
			$(".user").css({"color":"red"});
			$("#uname").css({"border-color":"red"});
			flagName = false;
		}
	})
	
	var flagPwd = null;
	$("#password").blur(function(){
	 strPwd = $(this).val();
		if( vd.checkPwd( strPwd ) ){
			$(".mm").html( "" );
			flagPwd = true;
		}else{
			$(".mm").html("请输入6-14位字母和数字");
			$(".mm").css({"color":"red"});
			$("#password").css({"border-color":"red"});
			flagPwd = false;
		}
	})
	var flagQpwd = null;
	$("#pwd").blur(function(){
		var strQpwd = $(this).val();
		if( vd.checkQpwd( strPwd,strQpwd ) ){
			$(".mm2").html( "" );
			flagQpwd = true;
		}else{
			$(".mm2").html("两次密码输入不一致，请重新输入");
			$(".mm2").css({"color":"red"});
			$("#pwd").css({"border-color":"red"});
			flagQpwd = false;
		}
	})
})
 