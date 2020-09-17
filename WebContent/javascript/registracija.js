$(document).ready(function(){

	$('#greskaKorImePor').hide();
	$('#greskaLozPor').hide();
	$('#greskaPonLozPor').hide();
	$('#greskaImePor').hide();
	$('#greskaPrzPor').hide();

	var greskaKorIme = false;
	var greskaLoz = false;
	var greskaPonLoz = false;
	var greskaIme = false;
	var greskaPrz = false;

	$('#korIme').focusout(function() {
		proveriKorIme();
	});

	$('#loz').focusout(function() {
		proveriLozinku();		
	});

	$('#ponLoz').focusout(function() {
		proveriPonLozinku();
	});

	$('#imeKorisnika').focusout(function() {
		proveriIme();
	});

	$('#przKorisnika').focusout(function() {
		proveriPrezime();
	});

	function proveriKorIme() {
		var korImeDuz = $('#korIme').val().length;

		if (korImeDuz < 5 || korImeDuz > 20) {
			$('#greskaKorImePor').html("Korisničko ime mora imati 5-20 karaktera");
			$('#greskaKorImePor').show();
			greskaKorIme = true;
		} else {		
			$('#greskaKorImePor').hide();
		}
	}

	function proveriLozinku() {
		var lozinkaDuz = $('#loz').val().length;

		if (lozinkaDuz < 5) {
			$('#greskaLozPor').html("Lozinka mora imati najmanje 5 karaktera");
			$('#greskaLozPor').show();
			greskaLoz = true;
		} else {
			$('#greskaLozPor').hide();
		}

	}

	function proveriPonLozinku() {
		var lozinka = $('#loz').val();
		var ponLozinka = $('#ponLoz').val();

		if (lozinka != ponLozinka) {
			$('#greskaPonLozPor').html("Lozinke se ne poklapaju");
			$('#greskaPonLozPor').show();
			greskaPonLoz = true;
		} else {
			$('#greskaPonLozPor').hide();
		}

	}

	function proveriIme() {
		var ime = $('#imeKorisnika').val();
		
		if (ime == "") {
			$('#greskaImePor').html("Unesite ime");
			$('#greskaImePor').show();
			greskaIme = true;
		} else {
			$('#greskaImePor').hide();
		}

	}

	function proveriPrezime() {
		var prz = $('#przKorisnika').val();
		
		if (prz == "") {
			$('#greskaPrzPor').html("Unesite prezime");
			$('#greskaPrzPor').show();
			greskaPrz = true;
		} else {
			$('#greskaPrzPor').hide();
		}

	}

	$('#registruj').click(function(event) {
		event.preventDefault();

		greskaKorIme = false;
		greskaLoz = false;
		greskaPonLoz = false;
		greskaIme = false;
		greskaPrz = false;

		proveriKorIme();
		proveriLozinku();
		proveriPonLozinku();
		proveriIme();
		proveriPrezime();
		

		if (greskaKorIme == false && greskaLoz == false && greskaPonLoz == false && greskaIme == false && greskaPrz == false) {
			
			
			let podaci = {
				"korisnicko_ime": $('#korIme').val(),
				"lozinka": $('#loz').val(),
				"ime": $('#imeKorisnika').val(),
				"prezime": $('#przKorisnika').val(),
				"pol": $('#pol option:selected').text()
			};
			
			var s = JSON.stringify(podaci);
			
		//	alert(s);

			$.ajax ({
				url: 'rest/korisnik/registruj',
				type: 'POST',
				data: s,
				contentType: 'application/json',
				dataType: 'json',
				complete: function(data) {
					if (data["status"] == 200) {
						alert("Korisnik uspesno registrovan i ulogovan!");
						window.location.href = "index.html";
					} else if(data["status"] == 500){
						alert("Postoji korisnik sa istim korisnickim imenom!");
					} else {
						alert("Neuspesna registracija!");
					}
				}
			});
		} else {
			alert("Niste isparavno popunili sva polja!");
		}
				
});
	//odustaje se od registracije i vraca se na pocetnu stranicu
	$("#odustani").click(function(event){
		event.preventDefault();
		window.location.href = "index.html";
	})
});