$(document).ready(function() {
    $('#PozPorApp').hide();

    $.ajax({
		type: 'GET',
		url: 'rest/korisnik/getKorisnik',
		complete: function(data){
            pozdravPorukaApp(data.responseJSON);
            $('#dodajApp').click(function(event) {
                event.preventDefault();
                dodajApartman(data.responseJSON);
            });
        }	
	});
});

function pozdravPorukaApp(korisnik) {
	if (korisnik == undefined) {
		$('#pozPorApp').hide();
	} else {
		$('#pozPorApp').text("Pozdrav " + korisnik.korisnicko_ime + " " + korisnik.uloga);
		$('#pozPorApp').show();
	}
}

function dodajApartman(korisnik) {
    let podaci  = {
        "brSoba": $('#brSoba').val(),
        "brGostiju": $('#brGostiju').val(),
        "tip": $('#tip option:selected').text(),
        "cenaPoNoci": $('#cena').val()
    }

    let korIme = korisnik.korisnicko_ime;

    let s = JSON.stringify(podaci);
    alert(s);
    alert(korIme);

    $.ajax ({
        url: 'rest/apartman/dodajApartman/',
        type: 'POST',
        data: s,
        contentType: 'application/json',
        dataType: 'json',
        complete: function(data) {
            if (data["status"] == 200) {
                alert("uspesno dodat apartman");
                window.location.href = "index.html";
            } else {
                alert("Neuspesno");
            }
        }
    });
} 
