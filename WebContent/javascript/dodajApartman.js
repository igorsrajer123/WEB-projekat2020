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

                let sobe = $('#brSoba').val();
                let osobe = $('#brGostiju').val();
                let cena =  $('#cena').val();
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
        "cenaPoNoci": $('#cena').val(),
        "slika": $('#blah').val()
    }
    alert("Lokacija: " + lokacija);

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

function readURL(input){
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#blah')
                .attr('src', e.target.result)
                .width(200)
                .height(200);
        };

        reader.readAsDataURL(input.files[0]);
    }
}
