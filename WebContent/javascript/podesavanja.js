$(document).ready(function(){
	$('#pozdravPor').hide();



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
		$("#acc_buttons").append("<button type='submit' id='sadrzaj_Btn' onclick=pregledSadrzajaApartmana()> Pregled sadržaja apartmana </button><br/>");
		$("#acc_buttons").append("<button type='submit' id='rezervacije_Btn' onclick=pregledRezervacija()> Pregled svih rezervacija </button><br/>");
	}else if(korisnik.uloga == "Gost"){
		$("#acc_buttons").append("<button type='submit' id='rezervacije' onclick=pregledRezervacija()> Moje rezervacije </button> <br/>");
		$("#acc_buttons").append("<button type='submit' id='rezervacije_Btn' onclick=pregledRezervacija()> Pregled mojih rezervacija </button><br/>");
	}else if(korisnik.uloga == "Domacin"){
		$("#acc_buttons").append("<button type='submit' id='dodajApp_Btn' onclick=dodajApartman()>Dodaj Apartman </button> <br/>");
		$("#acc_buttons").append("<button type='submit' id='rezervacije_Btn' onclick=pregledRezervacija()> Pregled mojih rezervacija </button><br/>");
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

function pregledRezervacija(){
	window.location.href = "pregledRezervacija.html";
}

function pregledKorisnika(){
	window.location.href = "pregledKorisnika.html";
}

function dodajApartman() {
	window.location.href = "dodajApartman.html";
}


function pregledSadrzajaApartmana(){
	window.location.href = "dodajNoviSadrzaj.html";
}

function pregledRezervacija(){
	window.location.href = "pregledRezervacija.html";
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
					if(apartmani[i].lokacija != null){
						lista.append("<tr><td>" + i + "</td>"
						+ "<td>" + apartmani[i].brSoba + "</td> " + "<td>" 
						+ apartmani[i].brGostiju + "</td>" + "<td>" + apartmani[i].lokacija.adresa.naseljenoMesto + "</td>"
						+ "<td>" + apartmani[i].domacin + "</td>" + "<td>" + apartmani[i].cenaPoNoci
						+ "</td></tr>");
						$("#apartmaniTabela").append(lista);	
					}else {
						lista.append("<tr><td>" + i + "</td>"
						+ "<td>" + apartmani[i].brSoba + "</td> " + "<td>" 
						+ apartmani[i].brGostiju + "</td>" + "<td>" + apartmani[i].lokacija + "</td>"
						+ "<td>" + apartmani[i].domacin + "</td>" + "<td>" + apartmani[i].cenaPoNoci
						+ "</td></tr>");
						$("#apartmaniTabela").append(lista);	
					}	
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

				let red = "<td> </td>";
				$("#apartmaniTabela thead tr").append(red);
			
           		for(var i = 0; i < apartmani.length;i++){
					if(apartmani[i].lokacija != null){
						lista.append("<tr id='" + apartmani[i].idApartmana + "' onclick=window.location.href='novaRezervacija.html?idApartmana=" +apartmani[i].idApartmana + "'><td>" + i + "</td>"
						+ "<td>" + apartmani[i].brSoba + "</td> " + "<td>" 
						+ apartmani[i].brGostiju + "</td>" + "<td>" + apartmani[i].lokacija.adresa.naseljenoMesto + "</td>"
						+ "<td>" + apartmani[i].domacin + "</td>" + "<td>" + apartmani[i].cenaPoNoci
						+ "</td>" + "<td> <button id='" + apartmani[i].idApartmana + "'> Rezerviši </button></td> </tr>");
						$("#apartmaniTabela").append(lista);
					}else{
						lista.append("<tr id='" + apartmani[i].idApartmana + "' onclick=window.location.href='novaRezervacija.html?idApartmana=" +apartmani[i].idApartmana + "'><td>" + i + "</td>"
						+ "<td>" + apartmani[i].brSoba + "</td> " + "<td>" 
						+ apartmani[i].brGostiju + "</td>" + "<td>" + apartmani[i].lokacija + "</td>"
						+ "<td>" + apartmani[i].domacin + "</td>" + "<td>" + apartmani[i].cenaPoNoci
						+ "</td>" + "<td> <button id='" + apartmani[i].idApartmana + "'> Rezerviši </button></td> </tr>");
						$("#apartmaniTabela").append(lista);
					}
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

				//============================================================
				let tip = "<td> Tip </td>";
				let izmena = "<td></td>";
				let brisanje = "<td></td>";
				$("#apartmaniTabela thead tr").append(tip).append(izmena).append(brisanje);
				//==============================================================
           		for(var i = 0; i < apartmani.length;i++){
					   if(apartmani[i].uklonjen == false){
							if(apartmani[i].lokacija != null){
								lista.append("<tr><td>" + i + "</td>"
								+ "<td>" + apartmani[i].brSoba + "</td> " + "<td>" 
								+ apartmani[i].brGostiju + "</td>" + "<td>" + apartmani[i].lokacija.adresa.naseljenoMesto + "</td>"
								+ "<td>" + apartmani[i].domacin + "</td>" + "<td>" + apartmani[i].cenaPoNoci
								+ "</td>" + "<td>" + apartmani[i].tip + "</td>" + "<td> <button onClick=window.location.href='podaciApartman.html?idApartmana="+ apartmani[i].idApartmana+ "'> Izmeni </button></td>" +
								"<td> <button id='" + apartmani[i].idApartmana + "'> Obriši </button> </td> </tr>");

								let id = apartmani[i].idApartmana;

								document.getElementById(apartmani[i].idApartmana).onclick =function fun(){
									$.ajax({
										type: 'PUT',
										url: 'rest/apartman/ukloniApartman/'+ id,
										complete: function(data){

											if(data["status"] == 200){
												window.location.href = "index.html";
											}else if(data["status"] == 500){
												alert("Nece da moze!");
											}
										}		
									})
								}

							$("#apartmaniTabela").append(lista);
							}else {
								lista.append("<tr><td>" + i + "</td>"
								+ "<td>" + apartmani[i].brSoba + "</td> " + "<td>" 
								+ apartmani[i].brGostiju + "</td>" + "<td>" + apartmani[i].lokacija + "</td>"
								+ "<td>" + apartmani[i].domacin + "</td>" + "<td>" + apartmani[i].cenaPoNoci
								+ "</td>" + "<td>" + apartmani[i].tip + "</td>" + "<td> <button onClick=window.location.href='podaciApartman.html?idApartmana="+ apartmani[i].idApartmana+ "'> Izmeni </button></td>" +
								"<td> <button id='" + apartmani[i].idApartmana + "'> Obriši </button> </td> </tr>");
	
								let id = apartmani[i].idApartmana;
	
								document.getElementById(apartmani[i].idApartmana).onclick =function fun(){
									$.ajax({
										type: 'PUT',
										url: 'rest/apartman/ukloniApartman/'+ id,
										complete: function(data){
	
											if(data["status"] == 200){
												window.location.href = "index.html";
											}else if(data["status"] == 500){
												alert("Nece da moze!");
											}
										}		
									})
								}
	
								$("#apartmaniTabela").append(lista);
							}
					   }else {
							lista.append("<tr style='background-color:red'><td>" + i + "</td>"
							+ "<td>" + apartmani[i].brSoba + "</td> " + "<td>" 
							+ apartmani[i].brGostiju + "</td>" + "<td>" + apartmani[i].lokacija + "</td>"
							+ "<td>" + apartmani[i].domacin + "</td>" + "<td>" + apartmani[i].cenaPoNoci
							+ "</td>" + "<td>" + apartmani[i].tip + "</td>" + "<td> ------ </td>" +
							"<td> UKLONJEN </td> </tr>");

							$("#apartmaniTabela").append(lista);	
					   }

				}
			}
		});
	} else if (korisnik.uloga == 'Domacin') {
		$.ajax({
			type: 'GET',
			url: 'rest/apartman/getApartmaneDomacina',
			complete: function(data) {
				let apartmani = data.responseJSON;

				let lista = $("#apartmaniTabela tbody");
				lista.empty();
				
				console.log(apartmani.length);

				let red = "<td> </td>";
				$("#apartmaniTabela thead tr").append(red);
			
           		for(var i = 0; i < apartmani.length;i++){
					let x = apartmani[i].uklonjen;   
					if(!x){
						if(apartmani[i].lokacija != null){
							lista.append("<tr><td>" + i + "</td>"
							+ "<td>" + apartmani[i].brSoba + "</td> " + "<td>" 
							+ apartmani[i].brGostiju + "</td>" + "<td>" + apartmani[i].lokacija.adresa.naseljenoMesto + "</td>"
							+ "<td>" + apartmani[i].domacin + "</td>" + "<td>" + apartmani[i].cenaPoNoci
							+ "</td>"  + "<td> <button id='" + apartmani[i].idApartmana + "'> Izmeni </button></td> </tr>");
							
							let id = apartmani[i].idApartmana;

							document.getElementById(apartmani[i].idApartmana).onclick =function fun(){
								alert(id);
								window.location.href = "podaciApartman.html?idApartmana="+ id;
							}

							$("#apartmaniTabela").append(lista);
						}else {
							lista.append("<tr><td>" + i + "</td>"
							+ "<td>" + apartmani[i].brSoba + "</td> " + "<td>" 
							+ apartmani[i].brGostiju + "</td>" + "<td>" + apartmani[i].lokacija + "</td>"
							+ "<td>" + apartmani[i].domacin + "</td>" + "<td>" + apartmani[i].cenaPoNoci
							+ "</td>"  + "<td> <button id='" + apartmani[i].idApartmana + "'> Izmeni </button></td> </tr>");
							
							let id = apartmani[i].idApartmana;

							document.getElementById(apartmani[i].idApartmana).onclick =function fun(){
								alert(id);
								window.location.href = "podaciApartman.html?idApartmana="+ id;
							}

							$("#apartmaniTabela").append(lista);
						}
					}
					   
				}
			}
		});
	}

}

