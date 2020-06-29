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
				lista.append("<tr><td>"+ stvarnoSad + "</td><td>" + mojeRezervacije[i].ukCena + "</td><td>" + "</td><td>" +  mojeRezervacije[i].status +"</td><td><button id='" + mojeRezervacije[i].idRezervacije + "'> Odustanak</button></td></tr>");
				
				var idR = mojeRezervacije[i].idRezervacije;
				var app = mojeRezervacije[i].apartman;
				document.getElementById(idR).onclick = function fun(){
					
					$.ajax({
						type: 'PUT',
						url: 'rest/rezervacija/odustanakOdRezervacije/'+ idR + '/' + app,
						complete: function(data){
							if(data["status"] == 200){
								alert("Izmena uspesna!");
							}else {
								alert("Izmena neuspesna!");
							}
						}
					})
				}
				
				$("#rezervacijeTabela").append(lista);
			}else if(mojeRezervacije[i].status == "Odustanak"){
				lista.append("<tr><td>"+ stvarnoSad + "</td><td>" + mojeRezervacije[i].ukCena + "</td><td>" + "</td><td>" +  mojeRezervacije[i].status +"</td></tr>");
				$("#rezervacijeTabela").append(lista);
			}
		}


	}else if(korisnik.uloga == "Domacin"){
		$("#naslov").text("Rezervacije nad mojim apartmanima");


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


