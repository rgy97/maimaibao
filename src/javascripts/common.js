var h = 140;
	      function $(id){
		return document.getElementById(id);
	}
	window.onscroll = function(){
		var sTop = document.body.scrollTop || document.documentElement.scrollTop;
		if( sTop > h ){
			$("lis").style.position = "fixed";
            $("lis").style.top = "0";
            $(".logo2").classList.display="block";
		
		}else{
			$("lis").style.position = "";
		}
	}