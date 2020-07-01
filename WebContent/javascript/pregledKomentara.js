$(document).ready(function(){

    $.ajax({
        type: 'GET',
        url: 'rest/korisnik/getKorisnik',
        complete: function(data){
            pomocnaFunkcija(data.responseJSON);
        }
    })
});

function pomocnaFunkcija(korisnik){
    if(korisnik == undefined){
        alert("Nedostupan sadrzaj!");
        window.location.href = "index.html";

    }else if(korisnik.uloga == 'Gost'){
        var number = getUrlVars()["idApartmana"];
        prikazKomentaraGost(number);

    }else if(korisnik.uloga == 'Administrator'){
        prikazKomentaraAdmin();
    }
}

function prikazKomentaraAdmin(){

    $.ajax({
        type: 'GET',
        url: 'rest/komentar/getSveKomentare',
        complete: function(data){

            let sviKomentari = data.responseJSON;

           // $("#formaKomentari").empty();
           document.getElementById("formaKomentari").reset();

            for(var i = 0; i < sviKomentari.length; i++){
                var newDiv = document.createElement("div"); 
                newDiv.innerHTML = "<br/> Komentar postavio: <b>" + sviKomentari[i].gost + "</b><br/> Apartman: <a href='index.html'> Pogledaj apartman </a> <br/><br/>  " + sviKomentari[i].tekst + 
                    "<br/><br/> Ocena korisnika:<b> " + sviKomentari[i].ocena + "</b><br/><br/>"; 
                $("#formaKomentari").append(newDiv);
            }
        }
    })
}

function prikazKomentaraGost(idAp){

    $.ajax({
        type: 'GET',
        url: 'rest/komentar/getKomentareApartmana/'+ idAp,
        complete: function(data){

            let sviKomentari = data.responseJSON;

            document.getElementById("formaKomentari").reset();

            for(var i = 0; i < sviKomentari.length; i++){
                var newDiv = document.createElement("div"); 
                newDiv.innerHTML = "<br/> Komentar postavio: <b>" + sviKomentari[i].gost + "</b><br/> Apartman: <a href='index.html'> Pogledaj apartman </a> <br/><br/>  " + sviKomentari[i].tekst + 
                    "<br/><br/> Ocena korisnika:<b> " + sviKomentari[i].ocena + "</b><br/><br/>"; 
                $("#formaKomentari").append(newDiv);
            }
        }
    })
}


//fja za uzimanje parametra iz url-a koji smo prethodno poslali
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}