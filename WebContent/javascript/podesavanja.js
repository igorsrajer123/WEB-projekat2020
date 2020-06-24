$(document).ready(function(){
	$('#pozdravPor').hide();

	$.ajax({
		type: 'GET',
		url: 'rest/apartman/getAktivneApartmane',
		complete: function(data) {
			let apartmani = data.responseJSON;

			let lista = $("#apartmaniTabela tbody");
			lista.empty();
			
			console.log(apartmani.length);
		
			   for(var i = 0; i < apartmani.length;i++){
				lista.append("<tr><td>" + i + "</td>"
				+ "<td>" + apartmani[i].brSoba + "</td> " + "<td>" 
				+ apartmani[i].brGostiju + "</td>" + "<td>" + apartmani[i].lokacija + "</td>"
				+ "<td>" + apartmani[i].domacin + "</td>" + "<td>" + apartmani[i].cenaPoNoci
				+ "</td>");
				$("#korisniciTabela").append(lista);
					
			}
		}
	});

	$.ajax({
		type: 'GET',
		url: 'rest/korisnik/getKorisnik',
		complete: function(data){
			odlogujSe();
			pozdravPoruka(data.responseJSON);
			sakrijDugmad(data.responseJSON);
			dodatneOpcije(data.responseJSON);
			prikazApartmana(data.responseJSON);
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

function pozdravPoruka(korisnik) {
	if (korisnik == undefined) {
		$('#pozdravPor').hide();
	} else {
		$('#pozdravPor').text("Pozdrav " + korisnik.korisnicko_ime + " " + korisnik.uloga);
		$('#pozdravPor').show();
	}
}

function prikazApartmana(korisnik) {
	if (korisnik == undefined) {
		$.ajax({
			type: 'GET',
			url: 'rest/apartman/getAktivneApartmane',
			complete: function(data) {
				let apartmani = data.responseJSON;

				let lista = $("#apartmaniTabela tbody");
				lista.empty();
				

				console.log(apartmani.length);
			
           		for(var i = 0; i < apartmani.length;i++){
					lista.append("<tr><td>" + i + "</td>"
					+ "<td>" + apartmani[i].brSoba + "</td> " + "<td>" 
					+ apartmani[i].brGostiju + "</td>" + "<td>" + apartmani[i].lokacija + "</td>"
					+ "<td>" + apartmani[i].domacin + "</td>" + "<td>" + apartmani[i].cenaPoNoci
					+ "</td>");
					$("#korisniciTabela").append(lista);
						
				}
			}
		});
	}	else if (korisnik.uloga == 'Gost') {
		$.ajax({
			type: 'GET',
			url: 'rest/apartman/getAktivneApartmane',
			complete: function(data) {
				let apartmani = data.responseJSON;

				let lista = $("#apartmaniTabela tbody");
				lista.empty();
				

				console.log(apartmani.length);
			
           		for(var i = 0; i < apartmani.length;i++){
					lista.append("<tr><td>" + i + "</td>"
					+ "<td>" + apartmani[i].brSoba + "</td> " + "<td>" 
					+ apartmani[i].brGostiju + "</td>" + "<td>" + apartmani[i].lokacija + "</td>"
					+ "<td>" + apartmani[i].domacin + "</td>" + "<td>" + apartmani[i].cenaPoNoci
					+ "</td>");
					$("#korisniciTabela").append(lista);
						
				}
			}
		});
	} else if (korisnik.uloga == 'Administrator') {
		$.ajax({
			type: 'GET',
			url: 'rest/apartman/getSveApartmane',
			complete: function(data) {
				let apartmani = data.responseJSON;

				let lista = $("#apartmaniTabela tbody");
				lista.empty();

				console.log(apartmani.length);
				
           		for(var i = 0; i < apartmani.length;i++){
					lista.append("<tr><td>" + i + "</td>"
					+ "<td>" + apartmani[i].brSoba + "</td> " + "<td>" 
					+ apartmani[i].brGostiju + "</td>" + "<td>" + apartmani[i].lokacija + "</td>"
					+ "<td>" + apartmani[i].domacin + "</td>" + "<td>" + apartmani[i].cenaPoNoci
					+ "</td>");
					$("#korisniciTabela").append(lista);
						
				}
			}
		});
	}

}


