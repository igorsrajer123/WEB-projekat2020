$(document).ready(function(){

    $.ajax({
        type: 'GET',
        url: 'rest/korisnik/getKorisnik',
        complete: function(data){
            pomocnaFunkcija(data.responseJSON);
        }
    })

    $("#povratak").click(function(event){
        event.preventDefault();

        window.location.href = "pregledKomentara.html";
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
    }else if(korisnik.uloga == "Domacin"){
        alert("Nedostupan sadrzaj!");
        window.location.href = "index.html";
    }else if(korisnik.uloga == "Gost"){
        alert("Nedostupan sadrzaj!");
        window.location.href = "index.html";
    }else if(korisnik.uloga == "Administrator"){
        var number = getUrlVars()["idApartmana"];
        prikaziApartman(number);
    }
}

function prikaziApartman(idAp){

    prikaziSadrzaj(idAp);

    $.ajax({
        type: 'GET',
        url: 'rest/apartman/getBiloKojiApartman/' + idAp,
        complete: function(data){

            let apartman = data.responseJSON;

            $("#status").text(apartman.status);
            $("#tip").text(apartman.tip);
            $("#domacin").text(apartman.domacin);
            $("#brSoba").text(apartman.brSoba);
            $("#brGostiju").text(apartman.brGostiju);
            $("#cenaPoNoci").text(apartman.cenaPoNoci);
            $("#ulicaIBroj").text(apartman.lokacija.adresa.ulicaIBroj);
            $("#naseljenoMesto").text(apartman.lokacija.adresa.naseljenoMesto);
            $("#postanskiBr").text(apartman.lokacija.adresa.postanskiBrMesta);
        }
    })
}


function prikaziSadrzaj(idAp){

    $.ajax({
        type: 'GET',
        url: 'rest/sadrzajApartmana/getSadrzajJednog/' + idAp,
        complete: function(data){

            var sadrzaj = data.responseJSON;

            for(var i = 0; i < sadrzaj.length; i++){
               $("#tabelaSadrzaj tbody").append("<tr><td> <label> <i>" + sadrzaj[i].item + "</i></label></td></tr>");
            }
        }
    })
}

