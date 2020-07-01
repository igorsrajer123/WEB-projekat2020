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
        alert("Nedostupan sadrzaj!");
        window.location.href = "index.html";

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

            for(var i = 0; i < sviKomentari.length; i++){
                var newDiv = document.createElement("div"); 
                newDiv.innerHTML = "<br/> Komentar postavio: <b>" + sviKomentari[i].gost + "</b><br/> Apartman: <a href='index.html'> Pogledaj apartman </a> <br/><br/>  " + sviKomentari[i].tekst + 
                    "<br/><br/> Ocena korisnika:<b> " + sviKomentari[i].ocena + "</b><br/><br/>"; 
                $("#formaKomentari").append(newDiv);
            }
        }
    })
}