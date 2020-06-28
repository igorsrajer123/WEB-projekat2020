var cekiraniSadrzaj = new Array();
var podaciSadrzaj = [];

var podaciAdresa = {};
var podaciLokacija = {};

$(document).ready(function(){

    var number = getUrlVars()["idApartmana"];

    $.ajax({
		type: 'GET',
		url: 'rest/korisnik/getKorisnik',
		complete: function(data){
			pomocnaFunkcija(data.responseJSON);
		}		
	})

    ucitajSadrzajApartmana();

    document.getElementById("greskaBrSobaPor").hidden = true;
    document.getElementById("greskaBrGostijuPor").hidden = true;
    document.getElementById("greskaCenaPor").hidden = true;

    let brSobaIspravan = false;
    let brGostijuIspravan = false;
    let cenaIspravna = false;

	$.ajax({
		type: 'GET',
		url: 'rest/apartman/getBiloKojiApartman/'+ number,
		complete: function(data){
			
            let apartman = data.responseJSON;
            
            let tip = "<td> <b> <i>" + apartman.tip + "</i></b></td>";
            $("#k").append(tip);

            $("#brSoba:text").val(apartman.brSoba);
            $("#brGostiju:text").val(apartman.brGostiju);
            $("#lokacija:text").val(apartman.lokacija);
            $("#cena:text").val(apartman.cenaPoNoci);
            $("#komentar:text").val(apartman.komentar);
            document.getElementById("statusLabela").innerHTML = apartman.status;

            let statusApp = document.getElementById("statusLabela").textContent;

            $("#promeniStatusBtn").click(function(event){
                event.preventDefault();
        
                if( document.getElementById("statusLabela").textContent == "Aktivno"){
                    document.getElementById("statusLabela").innerHTML = "Neaktivno";
                }
                else if(document.getElementById("statusLabela").textContent == "Neaktivno"){
                    document.getElementById("statusLabela").innerHTML = "Aktivno";
                }
            })
		}
    })

    $("#izmeniApp").click(function(event){
        event.preventDefault();

        formirajAdresu();

        let geoSirina = document.getElementById("geoSirina").textContent;
        let geoDuzina = document.getElementById("geoDuzina").textContent;

        podaciLokacija = {
            "geoSirina" : geoSirina,
            "geoDuzina" : geoDuzina,
            "adresa" : podaciAdresa
        }

        let statusApartmana = document.getElementById("statusLabela").textContent;
        let brSobaApartmana = document.getElementById("brSoba").value;
        let brGostijuApartmana = document.getElementById("brGostiju").value;
        let cenaApartmana = document.getElementById("cena").value;

        if(brSobaApartmana == "" || brSobaApartmana == " "){
            document.getElementById("greskaBrSobaPor").hidden = false;
            brSobaIspravan = false;
        }else {
            document.getElementById("greskaBrSobaPor").hidden = true;
            brSobaIspravan = true;
        }

        if(brGostijuApartmana == "" || brGostijuApartmana == " "){
            document.getElementById("greskaBrGostijuPor").hidden = false;
            brGostijuIspravan = false;
        }else {
            document.getElementById("greskaBrGostijuPor").hidden = true;
            brGostijuIspravan = true;
        }

        if(cenaApartmana == "" || cenaApartmana == " "){
            document.getElementById("greskaCenaPor").hidden = false;
            cenaIspravna = false;
        }else {
            document.getElementById("greskaCenaPor").hidden = true;
            cenaIspravna = true;
        }

        postavljanjeSadrzaja();
        alert(podaciSadrzaj);

        if(brGostijuIspravan == true && brSobaIspravan == true && cenaIspravna == true){

            podaciZaSlanje = { 
				"status": statusApartmana,
                "brSoba": brSobaApartmana,
                "brGostiju": brGostijuApartmana,
                "cenaPoNoci": cenaApartmana,
                "lokacija": podaciLokacija,
                "sadrzajAp": podaciSadrzaj
            }

            var d = JSON.stringify(podaciZaSlanje);
            alert(d);

            $.ajax({
                type: 'PUT',
                url: 'rest/apartman/izmeniApartman/'+number,
                data: d,
                contentType: 'application/json',
                dataType: 'json',
                complete: function(data){

                    if(data["status"] == 200){
                        window.location.href = "index.html";
                    }else {
                        alert("Apartman neuspesno izmenjen!");
                    }
                }
            })
        }

    })
});

//fja za uzimanje parametra iz url-a koji smo prethodno poslali
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

//ucitavanje slike
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

function ucitajSadrzajApartmana(){

    $.ajax({
        type: 'GET',
        url: 'rest/sadrzajApartmana/getSavSadrzaj',
        complete: function(data){

            let savSadrzaj = data.responseJSON;

            let lista = $("#tabelaSadrzaj tbody");
            lista.empty();

            for(var i = 0; i < savSadrzaj.length; i++){
                if(savSadrzaj[i].uklonjen == false){
                    lista.append("<tr><td><input type='checkbox' onclick=ucitajCekiranSadrzaj('"+ savSadrzaj[i].id + "') id='" + savSadrzaj[i].id +"'>" + 
                                        "<label for='"+ savSadrzaj[i].id + "'>"+ savSadrzaj[i].item + "</label></td></tr>");
                    $("#tabelaSadrzaj").append(lista);
                }
            }
        }
    })
}

function ucitajCekiranSadrzaj(id){

    if(document.getElementById(id).checked){
        cekiraniSadrzaj.push(id);
        alert(id);
    }if(!document.getElementById(id).checked){
        var index = $.inArray(id,cekiraniSadrzaj);
        if(index != -1){
            cekiraniSadrzaj.splice(index, 1);
            alert(cekiraniSadrzaj);
        }
    }
}

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

function pomocnaFunkcija(korisnik){
    if(korisnik == undefined){
        alert("Nedostupan sadrzaj!");
        window.location.href = "index.html";

    }else if(korisnik.uloga == 'Gost'){
        alert("Nedostupan sadrzaj!");
        window.location.href = "index.html";

    }
}

function formirajAdresu(){

    let ulicaBroj = $("#ulica").val();
    let mesto = $("#mesto").val();
    let postanskiBroj = $("#postanskiBroj").val();

    podaciAdresa = {
            "ulicaIBroj": ulicaBroj,
            "naseljenoMesto": mesto,
            "postanskiBrMesta": postanskiBroj
        }
}

function sirinaDuzinaFunkcija(){

    var precision1 = 1000000; // 2 decimals
    var randomnum1 = Math.floor(Math.random() * (100 * precision1 - 1 * precision1) + 1 * precision1) / (1*precision1);

    var precision2 = 1000000; // 2 decimals
    var randomnum2 = Math.floor(Math.random() * (100 * precision2 - 1 * precision2) + 1 * precision2) / (1*precision2);

    document.getElementById('geoSirina').innerHTML =  "<b>"+ randomnum1 + "</b>";
    document.getElementById('geoDuzina').innerHTML = "<b>"+ randomnum2 + "</b>";
}

