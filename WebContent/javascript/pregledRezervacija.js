
var idRez = new Array();
var idAp = new Array();

$(document).ready(function(){
	
	$.ajax({
		type: 'GET',
		url: 'rest/korisnik/getKorisnik',
		complete: function(data){
			
			proveriKorisnika(data.responseJSON);
		}
	})
	
});


function proveriKorisnika(korisnik){

	if(korisnik == undefined){
		alert("Nedostupan sadrzaj!");
		window.location.href = "index.html";

	}else if(korisnik.uloga == "Gost"){
		$("#naslov").text("Moje rezervacije");

		let mojeRezervacije = korisnik.rezervacije;
		
		let lista = $("#rezervacijeTabela tbody");
		lista.empty();

		let datumPocetka = "<td> <b> Datum početka rezervacije </b> </td>";
		let ukupnaCena = "<td> <b> Ukupna cena </b> </td>";
		let domacin = "<td> <b> Domaćin </b> </td>";
		let status = "<td> <b> Status rezervacije </b> </td>";

		$("#rezervacijeTabela thead tr").append(datumPocetka).append(ukupnaCena).append(domacin).append(status);

		for(var i = 0; i < mojeRezervacije.length; i++){
			let pocetni = new Date(mojeRezervacije[i].pocetniDatum);
			let stvarnoSad = (JSON.stringify(pocetni)).substr(1,10);
			if(mojeRezervacije[i].status == "Kreirana" || mojeRezervacije[i].status == "Prihvacena"){
				lista.append("<tr><td>"+ stvarnoSad + "</td><td>" + mojeRezervacije[i].ukCena + "</td><td>" + "</td><td>" +  mojeRezervacije[i].status +"</td><td><button id='" + mojeRezervacije[i].idRezervacije + "' onclick=odustanakRezervacija('" + mojeRezervacije[i].idRezervacije + "','" + mojeRezervacije[i].apartman + "')> Odustanak </button></td></tr>");

				$("#rezervacijeTabela").append(lista);
			}else if(mojeRezervacije[i].status == "Odustanak"){
				lista.append("<tr><td>"+ stvarnoSad + "</td><td>" + mojeRezervacije[i].ukCena + "</td><td>" + "</td><td>" +  mojeRezervacije[i].status +"</td></tr>");
				$("#rezervacijeTabela").append(lista);
			}else if(mojeRezervacije[i].status == "Odbijena" || mojeRezervacije[i].status == "Zavrsena"){
				lista.append("<tr><td>"+ stvarnoSad + "</td><td>" + mojeRezervacije[i].ukCena + "</td><td>" + "</td><td>" +  mojeRezervacije[i].status +"</td></tr>");
				$("#rezervacijeTabela").append(lista);
			}
		}


	}else if(korisnik.uloga == "Domacin"){

		$("#naslov").text("Rezervacije nad mojim apartmanima");

		let lista = $("#rezervacijeTabela tbody");
		lista.empty();

		let gost = "<td> <b> Rezervaciju izvršio </b></td>";
		let datumPocetka = "<td><b> Datum početka rezervacije </b></td>";
		let ukupnaCena = "<td><b> Ukupna cena <b></td>";
		let status = "<td> <b> Status rezervacije <b> </td>";
		$("#rezervacijeTabela thead tr").append(gost).append(datumPocetka).append(ukupnaCena).append(status);

		$.ajax({
			type: 'GET',
			url: 'rest/rezervacija/getRezervacijeDomacina',
			complete: function(data){

				let mojeRezervacije = data.responseJSON;
				
				for(var i = 0; i < mojeRezervacije.length; i++){
					
					if(mojeRezervacije[i].status == "Kreirana"){
						
						let pocetni = new Date(mojeRezervacije[i].pocetniDatum);
						let stvarnoSad = (JSON.stringify(pocetni)).substr(1,10);
						lista.append("<tr><td>" + mojeRezervacije[i].gost + "</td><td>"+ stvarnoSad + "</td><td>" + mojeRezervacije[i].ukCena +  "</td><td>"+ mojeRezervacije[i].status +"</td><td>" +
							 		"<button onclick=prihvatiRezervaciju('" + mojeRezervacije[i].idRezervacije + "','" + mojeRezervacije[i].apartman + "')> Prihvati </button></td><td><button onclick=odbijRezervaciju('"  + mojeRezervacije[i].idRezervacije + "','" + mojeRezervacije[i].apartman + "')> Odbij </button></td></tr>");				
						$("#rezervacijeTabela").append(lista);


					}else if(mojeRezervacije[i].status == "Prihvacena"){ //Prihvacena
						
						let pocetni = new Date(mojeRezervacije[i].pocetniDatum);
						let stvarnoSad = (JSON.stringify(pocetni)).substr(1,10);
						lista.append("<tr><td>" + mojeRezervacije[i].gost + "</td><td>"+ stvarnoSad + "</td><td>" + mojeRezervacije[i].ukCena +  "</td><td>"+ mojeRezervacije[i].status +"</td>"+
											"<td><button onclick=zavrsenaRezervacija('" + mojeRezervacije[i].idRezervacije + "','" + mojeRezervacije[i].apartman + "')> Završi </button></td><td><button onclick=odbijRezervaciju('"  + mojeRezervacije[i].idRezervacije + "','" + mojeRezervacije[i].apartman + "')> Odbij </button></td></tr>");
						$("#rezervacijeTabela").append(lista);

					}else if(mojeRezervacije[i].status == "Odustanak" || mojeRezervacije[i].status == "Odbijena" || mojeRezervacije[i].status == "Zavrsena"){

						let pocetni = new Date(mojeRezervacije[i].pocetniDatum);
						let stvarnoSad = (JSON.stringify(pocetni)).substr(1,10);
						lista.append("<tr><td>" + mojeRezervacije[i].gost + "</td><td>"+ stvarnoSad + "</td><td>" + mojeRezervacije[i].ukCena +  "</td><td>"+ mojeRezervacije[i].status +"</td><tr>");
						$("#rezervacijeTabela").append(lista);
					}
				}
			}
		})

	}else if(korisnik.uloga == "Administrator"){

		$("#naslov").text("Pregled svih rezervacija u sistemu");

		let lista = $("#rezervacijeTabela tbody");
		lista.empty();

		let gost = "<td> <b> Rezervaciju izvršio </b></td>";
		let domacin = "<td> <b> Domaćin <b> </td>";
		let datumPocetka = "<td><b> Datum početka rezervacije </b></td>";
		let ukupnaCena = "<td><b> Ukupna cena <b></td>";
		let status = "<td> <b> Status rezervacije <b> </td>";
		$("#rezervacijeTabela thead tr").append(gost).append(domacin).append(datumPocetka).append(ukupnaCena).append(status);

		$.ajax({
			type: 'GET',
			url: 'rest/rezervacija/getSveRezervacije',
			complete: function(data){

				let sveRezervacije = data.responseJSON;

				for(var i = 0; i < sveRezervacije.length; i++){
					let pocetni = new Date(sveRezervacije[i].pocetniDatum);
					let stvarnoSad = (JSON.stringify(pocetni)).substr(1,10);
					lista.append("<tr><td>" + sveRezervacije[i].gost + "</td><td>" + "</td><td>"+ stvarnoSad + "</td><td>" + sveRezervacije[i].ukCena +  "</td><td>"+ sveRezervacije[i].status +"</td></tr>");
					$("#rezervacijeTabela").append(lista);
				}
			}
		})
	}
}


function odustanakRezervacija(idR, idA){
	$.ajax({
		type: 'PUT',
		url: 'rest/rezervacija/odustanakOdRezervacije/'+ idR + '/' + idA,
		complete: function(data){
			if(data["status"] == 200){
				alert("Izmena uspesna!");
			}else {
				alert("Izmena neuspesna!");
			}
		}
	})
	//alert("Kraj funkcije!");
}

function prihvatiRezervaciju(idR, idA) {
	$.ajax({
		type: 'PUT',
		url: 'rest/rezervacija/prihvatiRezervaciju/'+ idR + '/' + idA,
		complete: function(data){
			if(data["status"] == 200){
				alert("Izmena uspesna!");
			}else {
				alert("Izmena neuspesna!");
			}
		}
	})
}

function zavrsenaRezervacija(idR, idA){
	$.ajax({
		type: 'PUT',
		url: 'rest/rezervacija/zavrsiRezervaciju/' + idR + '/' + idA,
		complete: function(data){
			if(data["status"] == 200){
				alert("Izmena uspesna!");
			}else {
				alert("Izmena neuspesna!");
			}
		}
	})
	//alert("This is the end!");
}

function odbijRezervaciju(idR, idA){

	$.ajax({
		type: 'PUT',
		url: 'rest/rezervacija/odbijRezervaciju/' + idR + '/' + idA,
		complete: function(data){
			if(data["status"] == 200){
				alert("Izmena uspesna!");
			}else {
				alert("Izmena neuspesna!");
			}
		}
	})
	alert("This is the end!");
}