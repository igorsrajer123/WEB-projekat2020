$(document).ready(function(){
	
	$.ajax({
		type: 'GET',
		url: 'rest/korisnik/getKorisnik',
		complete: function(data){
			odlogujSe();
			sakrijDugmad(data.responseJSON);
			dodatneOpcije(data.responseJSON);
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

function dodatneOpcije(korisnik){
	
	if(korisnik == undefined)
		return;

	if(korisnik.uloga == "Administrator"){
		$("#acc_buttons").append("<button type='submit' id='korisnici_Btn' onclick=pregledKorisnika()>Pregled korisnika </button> <br/>");
	}else if(korisnik.uloga == "Gost"){
		
	}else if(korisnik.uloga == "Domacin"){

	}
}

function odlogujSe(){
	
	$("#odjava_btn").click(function(event){
		event.preventDefault();
		
		$.ajax({
			type: 'POST',
			url: 'rest/korisnik/logout',
			complete: function(data){
				window.location.href = "prijava.html";
			}
		})
	});
	
	$("#nalog_btn").click(function(event){
		event.preventDefault();
	
		window.location.href = "nalog.html";
	});
}

function pregledKorisnika(){
	window.location.href = "pregledKorisnika.html";
}
