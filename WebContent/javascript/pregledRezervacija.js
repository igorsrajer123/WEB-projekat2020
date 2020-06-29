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
			lista.append("<tr><td>"+ mojeRezervacije[i].pocetniDatum + "</td><td>" + mojeRezervacije[i].ukupnaCena + "</td><td>" + "</td><td>" +  mojeRezervacije[i].status +"</td><td><button> Odustanak</button></td></tr>");
			$("#rezervacijeTabela").append(lista);
		}


	}else if(korisnik.uloga == "Domacin"){
		$("#naslov").text("Rezervacije nad mojim apartmanima");


	}else if(korisnik.uloga == "Administrator"){

		$("#naslov").text("Pregled svih rezervacija u sistemu");

		let lista = $("#rezervacijeTabela tbody");
		lista.empty();

		let gost = "<td> <b> Rezervaciju izvršio </b></td>";
		let domacin = "<td> <b> Domaćin <b> </td>";
		let status = "<td> <b> Status rezervacije <b> </td>";
		$("#rezervacijeTabela thead tr").append(gost).append(domacin).append(status);

		$.ajax({
			type: 'GET',
			url: 'rest/rezervacija/getSveRezervacije',
			complete: function(data){

				let sveRezervacije = data.responseJSON;

				for(var i = 0; i < sveRezervacije.length; i++){
					lista.append("<tr><td>" + sveRezervacije[i].gost + "</td><td>" + "</td><td>"+ sveRezervacije[i].status +"</td></tr>");
					$("#rezervacijeTabela").append(lista);
				}
			}
		})
	}
}


