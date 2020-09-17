$(document).ready(function(){
    
    $.ajax({
        type: 'GET',
        url: 'rest/korisnik/getKorisnik',
        complete: function(data){

            var number = getUrlVars()["idApartmana"];

            pomocnaFunkcija(data.responseJSON);
        }
    })

    $("#postaviKomentar").click(function(event){
        event.preventDefault();

        $.ajax({
            type: 'GET',
            url: 'rest/korisnik/getKorisnik',
            complete: function(data){
    
                var korisnik = data.responseJSON;
                var number = getUrlVars()["idApartmana"];
               
                postaviKomentar(korisnik, number);
                window.location.href = "index.html";
            }
        })
    })

    $("#odustani").click(function(event){
        window.location.href = "index.html";
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

function pomocnaFunkcija(korisnik){

    if(korisnik == undefined){
        alert("Nedostupan sadrzaj!");
        window.location.href = "index.html";

    }else if(korisnik.uloga == "Administrator"){
        alert("Nedostupan sadrzaj!");
        window.location.href = "index.html";

    }else if(korisnik.uloga == "Domacin"){
        alert("Nedostupan sadrzaj!");
        window.location.href = "index.html";
    }
}

function postaviKomentar(korisnik, idAp){

  //  alert("Apartman: " + idAp);
  //  alert("Korisnik: " + korisnik.korisnicko_ime);
    let b =  $("#ocena").val();
    let a = $("#textKomentara").val();
   // alert("Ocena: " + b);
   // alert("Tekst: " + a);
    let podaci = {
        "gost": korisnik.korisnicko_ime,
        "apartman": idAp,
        "tekst": $("#textKomentara").val(),
        "ocena": $("#ocena").val(),
    }

    let s = JSON.stringify(podaci);

    $.ajax({
        type: 'POST',
        url: 'rest/komentar/dodajKomentar/'+ idAp,
        data: s,
        contentType: 'application/json',
        dataType: 'json',
        complete: function(data){
            if(data["status"] == 200){
                alert("Komentar uspesno dodat!");
            }else{
                alert("Doslo je do greske!");
            }
        }
    })
}