$(document).ready(function(){
	
	//odustajanje od prijave korisnika
	$("#odustani").click(function(event){
		event.preventDefault();
		window.location.href = "index.html";
	})
	
	$("#prijavi").off();
	$("#prijavi").click(function(event){
		event.preventDefault();
		
		var kor_ime = $("#korIme").val();
		var loz = $("#loz").val();
		
		$.ajax({
			type: 'POST',
			url: 'rest/korisnik/login/'+kor_ime+'/'+loz,
			complete: function(data){
				
				if(data["status"] == 200){
					window.location.href = "index.html";
				}else {
					console.log("Prijava neuspesna!");
					$("#lab").text("NEMOZE").css('color','red');
				}
			}
		})
		
	})
	
});