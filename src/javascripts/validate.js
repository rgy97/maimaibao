define(function(){
	return{
		checkName : function(strName){
			var reg =/^[a-zA-Z0-9]{5,14}$/;
			if(reg.test(strName)){
				return true;
			}else{
				return false;
			}
		},
		checkPwd :function(strPwd){
			var reg = /^[a-zA-Z0-9]{6,14}$/;
			if(reg.test(strPwd)){
				return true;
			}else{
				return false;
			}
		},
		checkQpwd :function(oldPwd,newPwd){
			if(oldPwd === newPwd){
				return true;
			}else{
				return false;
			}
		}
	}
})