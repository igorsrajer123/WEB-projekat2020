$(document).ready(function(){
	
	$.ajax({
		type: 'GET',
		url: 'rest/korisnik/getKorisnik',
		complete: function(data){
			odlogujSe();
			sakrijDugmad(data.responseJSON);
		}		
	})
	
});


function sakrijDugmad(korisnik){
	
	if(korisnik == undefined){
		$("#login_buttons").show();
		$("#acc_buttons").hide();
	}else {
		$("#login_buttons").hide();
		$("#acc_buttons").show();
	}	
}

function odlogujSe(){
	
	$("#odjava_btn").click(function(event){
		event.preventDefault();
		
		$.ajax({
			type: 'POST',
			url: 'rest/korisnik/logout',
			complete: function(data){
				window.location.href = "index.html";
			}
		})		
	});
	
	$("#nalog_btn").click(function(event){
		event.preventDefault();
	
		window.location.href = "nalog.html";
	});
}
