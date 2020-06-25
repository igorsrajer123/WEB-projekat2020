$(document).ready(function() {
    $('#PozPorApp').hide();

    $.ajax({
		type: 'GET',
		url: 'rest/korisnik/getKorisnik',
		complete: function(data){
			pozdravPorukaApp(data.responseJSON);
		}		
	})
});

function pozdravPoruka(korisnik) {
	if (korisnik == undefined) {
		$('#pozPorApp').hide();
	} else {
		$('#pozPorApp').text("Pozdrav " + korisnik.korisnicko_ime + " " + korisnik.uloga);
		$('#pozPorApp').show();
	}
}
