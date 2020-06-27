var cekiraniSadrzaj = new Array();
var podaciSadrzaj = [];

$(document).ready(function() {

    $('#PozPorApp').hide();

    ucitajSadrzajApartmana();

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
    alert($('#datumZaIzdOD').val());
    alert($('#datumZaIzdDO').val());
    var datumOD = new Date($('#datumZaIzdOD').val());
    var datumDO = new Date($('#datumZaIzdDO').val());

    postavljanjeSadrzaja();
    
    var datumiZaIzdavanjeList = getDates(datumOD, datumDO);
    alert(datumiZaIzdavanjeList);
    let podaci  = {
        "brSoba": $('#brSoba').val(),
        "brGostiju": $('#brGostiju').val(),
        "tip": $('#tip option:selected').text(),
        "cenaPoNoci": $('#cena').val(),
        "slika": $('#blah').val(),
        "domacin": korisnik.korisnicko_ime,
        "datumiZaIzdavanje": datumiZaIzdavanjeList,
        "dostupnostPoDatumima": datumiZaIzdavanjeList,
        "sadrzajAp": podaciSadrzaj
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

//iskorisceno u metodi ispod(ucitajSadrzajApartmana())
function ucitajCekiranSadrzaj(id){

    if(document.getElementById(id).checked){
        cekiraniSadrzaj.push(id);
    }if(!document.getElementById(id).checked){
        var index = $.inArray(id,cekiraniSadrzaj);
        if(index != -1){
            cekiraniSadrzaj.splice(index, 1);
            alert(cekiraniSadrzaj);
        }
    }
}

//prilikom klika dodavanja
function postavljanjeSadrzaja(){

    $.ajax({
        type: 'GET',
        url: 'rest/sadrzajApartmana/getSavSadrzaj',
        complete: function(data){

            let savSadrzaj = data.responseJSON;

            for(var i = 0; i < savSadrzaj.length; i++){
                for(var j = 0; j < cekiraniSadrzaj.length; j++){
                    if(cekiraniSadrzaj[j] == savSadrzaj[i].id){
                        alert(cekiraniSadrzaj[j] + "PRONADJEN!");
                        jednaStavka  = { 
                                        "id": savSadrzaj[i].id,
                                        "item": savSadrzaj[i].item,
                                         "uklonjen": false
                                        }
                        podaciSadrzaj.push(jednaStavka);
                    }
                }
            }
        }
    })
}

//prilikom ucitavanja stranice
function ucitajSadrzajApartmana(){

    $.ajax({
        type: 'GET',
        url: 'rest/sadrzajApartmana/getSavSadrzaj',
        complete: function(data){

            let savSadrzaj = data.responseJSON;

            let lista = $("#tabelaSadrzaj tbody");
            lista.empty();

            for(var i = 0; i < savSadrzaj.length; i++){
                lista.append("<tr><td><input type='checkbox' onclick=ucitajCekiranSadrzaj('"+ savSadrzaj[i].id + "') id='" + savSadrzaj[i].id +"'>" + 
                                     "<label for='"+ savSadrzaj[i].id + "'>"+ savSadrzaj[i].item + "</label></td></tr>");
                $("#tabelaSadrzaj").append(lista);
            }
        }
    })
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

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

function getDates(startDate, stopDate) {
    var dateArray = new Array();
    var currentDate = startDate;
    while (currentDate <= stopDate) {
        dateArray.push(new Date (currentDate));
        currentDate = currentDate.addDays(1);
    }
    return dateArray;
}
