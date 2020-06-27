$(document).ready(function(){

    var idStavke = getUrlVars()["id"];

    document.getElementById("idStavke").innerHTML = idStavke;

    $("#odustani").click(function(event){
        event.preventDefault();

        window.location.href = "dodajNoviSadrzaj.html";
    })

    $.ajax({
        type: 'GET',
        url: 'rest/sadrzajApartmana/getStavku/'+ idStavke,
        complete: function(data){

            let stavka = data.responseJSON;

            $("#nazivStavke:text").val(stavka.item);
        }
    })

    $("#prihvati").click(function(event){
        event.preventDefault();

        let podaci = {
            "id": idStavke,
            "item": $("#nazivStavke").val()
        }

        let d = JSON.stringify(podaci);

        $.ajax({
            type: 'PUT',
            url: 'rest/sadrzajApartmana/izmeniSadrzaj/'+ idStavke,
            data: d,
            contentType: 'application/json',
            dataType: 'json',
            complete: function(data){
                if (data["status"] == 200) {
                    alert("Izmene uspesne!");
                    window.location.href = "dodajNoviSadrzaj.html";
                } else {
                    alert("Doslo je do greske!");
                }
            }
        })
    })

    $.ajax({
		type: 'GET',
		url: 'rest/korisnik/getKorisnik',
		complete: function(data){
			pomocnaFunkcija(data.responseJSON);
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

function pomocnaFunkcija(korisnik){
    if(korisnik == undefined){
        alert("Nedostupan sadrzaj!");
        window.location.href = "index.html";

    }else if(korisnik.uloga == 'Gost'){
        alert("Nedostupan sadrzaj!");
        window.location.href = "index.html";
       
    }else if(korisnik.uloga == 'Domacin'){
        alert("Nedostupan sadrzaj!");
        window.location.href = "index.html";
    }
}