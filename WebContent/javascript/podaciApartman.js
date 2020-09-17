var cekiraniSadrzaj = new Array();
var podaciSadrzaj = [];

var podaciAdresa = {};
var podaciLokacija = {};

var pomocna = [];

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
    document.getElementById("greskaUlica").hidden = true;
    document.getElementById("greskaMesto").hidden = true;
    document.getElementById("greskaPostanskiBroj").hidden = true;

    let brSobaIspravan = false;
    let brGostijuIspravan = false;
    let cenaIspravna = false;

    let ulicaIspravna = false;
    let mestoIspravno = false;
    let postanskiBrIspravan = false;

	$.ajax({
		type: 'GET',
		url: 'rest/apartman/getBiloKojiApartman/'+ number,
		complete: function(data){
			
            let apartman = data.responseJSON;
            var domacinApp = apartman.domacin;
            
            let tip = "<td> <b> <i>" + apartman.tip + "</i></b></td>";
            $("#k").append(tip);

            $("#brSoba:text").val(apartman.brSoba);
            $("#brGostiju:text").val(apartman.brGostiju);
            $("#cena:text").val(apartman.cenaPoNoci);
            //$("#komentar:text").val(apartman.komentar);
            document.getElementById("statusLabela").innerHTML = "<b>" + apartman.status + "</b>";
            $("#ulica:text").val(apartman.lokacija.adresa.ulicaIBroj);
            $("#mesto:text").val(apartman.lokacija.adresa.naseljenoMesto);
            $("#postanskiBroj").val(apartman.lokacija.adresa.postanskiBrMesta);
            document.getElementById("geoSirina").innerHTML = "<b>" + apartman.lokacija.geoSirina + "</b>";
            document.getElementById("geoDuzina").innerHTML = "<b>" + apartman.lokacija.geoDuzina + "</b>";

            let statusApp = document.getElementById("statusLabela").textContent;

            $("#promeniStatusBtn").click(function(event){
                event.preventDefault();
        
                if( document.getElementById("statusLabela").textContent == "Aktivno"){
                    document.getElementById("statusLabela").innerHTML = "<b>Neaktivno</b>";
                }
                else if(document.getElementById("statusLabela").textContent == "Neaktivno"){
                    document.getElementById("statusLabela").innerHTML = "<b>Aktivno</b>";
                }
            })
            $("#izmeniApp").click(function(event){
                event.preventDefault();

                izmeniApartman(data.responseJSON, number);
            });
        }
    });

    $("#odustani").click(function(event){
        event.preventDefault();

        window.location.href = "index.html";
    });

});

function izmeniApartman(apartman, number) {
    formirajAdresu();

    let geoSirina = document.getElementById("geoSirina").textContent;
    let geoDuzina = document.getElementById("geoDuzina").textContent;

    podaciLokacija = {
        "geoSirina" : geoSirina,
        "geoDuzina" : geoDuzina,
        "adresa" : podaciAdresa
    }    
   let ulicaBroj =  document.getElementById("ulica").value;

    if(ulicaBroj == "" || ulicaBroj == " "){
        document.getElementById("greskaUlica").hidden = false;
        ulicaIspravna = false;
    }else {
        document.getElementById("greskaUlica").hidden = true;
        ulicaIspravna = true;
    }

    let mesto = document.getElementById("mesto").value;

    if(mesto == "" || mesto == " "){
        document.getElementById("greskaMesto").hidden = false;
        mestoIspravno = false;
    }else {
        document.getElementById("greskaMesto").hidden = true;
        mestoIspravno = true;
    }

    let postBr = document.getElementById("postanskiBroj").value;

    if(postBr == "" || postBr == " "){
        document.getElementById("greskaPostanskiBroj").hidden = false;
        postanskiBrIspravan = false;
    }else {
        document.getElementById("greskaPostanskiBroj").hidden = true;
        postanskiBrIspravan = true;
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
   // alert(podaciSadrzaj + "------ ovo su podaci izvan funkcije!");
   // alert(apartman.domacin + "Ovog domacina saljem");

    if(brGostijuIspravan == true && brSobaIspravan == true && cenaIspravna == true && ulicaIspravna == true && mestoIspravno == true && postanskiBrIspravan == true){

    podaciZaSlanje = { 
            "tip": apartman.tip,
            "datumiZaIzdavanje": apartman.datumiZaIzdavanje,
            "dostupnostPoDatumima": apartman.dostupnostPoDatumima,
            "rezervacije": apartman.rezervacije,
            "idApartmana": number,
            "domacin": apartman.domacin,
            "status": statusApartmana,
            "brSoba": brSobaApartmana,
            "brGostiju": brGostijuApartmana,
            "cenaPoNoci": cenaApartmana,
            "lokacija": podaciLokacija,
            "sadrzajAp": podaciSadrzaj
        }

        var d = JSON.stringify(podaciZaSlanje);
      //  alert(d);

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
        });
    }   
}



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
     //   alert(id);
    }if(!document.getElementById(id).checked){
        var index = $.inArray(id,cekiraniSadrzaj);
        if(index != -1){
            cekiraniSadrzaj.splice(index, 1);
         //   alert(cekiraniSadrzaj);
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
                      //  alert(cekiraniSadrzaj[j] + "PRONADJEN!");
                        jednaStavka  = { 
                                        "id": savSadrzaj[i].id,
                                        "item": savSadrzaj[i].item,
                                         "uklonjen": false
                                        }
                     //   alert("Trenutno postavljen sadrzaj u funkciji: " + podaciSadrzaj);
                        podaciSadrzaj.push(jednaStavka);
                      //  alert("Trenutno postavljen sadrzaj u funkciji: " + podaciSadrzaj);
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

