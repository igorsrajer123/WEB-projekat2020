$(document).ready(function(){

    $("#odustani").click(function(event){
        event.preventDefault();

        window.location.href = "index.html";
    })

    $.ajax({
		type: 'GET',
		url: 'rest/korisnik/getKorisnik',
		complete: function(data){
			nabaviApartman(data.responseJSON);
		}		
	})
});

function nabaviApartman(korisnik){

    if(korisnik == undefined){
        alert("Nedostupan sadrzaj!");
        window.location.href = "index.html";

    }else if(korisnik.uloga == 'Gost'){

        var number = getUrlVars()["idApartmana"];

        $.ajax({
            type: 'GET',
            url: 'rest/apartman/getApartman/'+ number,
            complete: function(data){
                
                let apartman = data.responseJSON;
                document.getElementById("domacin").innerHTML = "<b>" + apartman.domacin + "</b>";
                $('#dostupniDatumi').text(apartman.dostupnostPoDatumima);
                $('#potvrdi').click(function(event){
                    event.preventDefault();
                    posaljiRezervaciju(data.responseJSON);
                })
                
                
            }
        })


    }else if(korisnik.uloga == 'Administrator'){
        alert("Nedostupan sadrzaj!");
        window.location.href = "index.html";

    }else if(korisnik.uloga == 'Domacin'){
        alert("Nedostupan sadrzaj!");
        window.location.href = "index.html";
    }
}

function posaljiRezervaciju(apartman) {   
    var datumPocetkaRez = new Date($('#datumRezervacije').val());
    let brNocenja = $('#brNocenja').val();
    let datumKrajaRez = datumPocetkaRez.addDays(parseInt(brNocenja, 10));
    alert(datumPocetkaRez);
    let datumPocetkaRezString = (JSON.stringify(datumPocetkaRez)).substr(1,10);
    alert(datumPocetkaRezString)
    alert(brNocenja);
    alert(datumKrajaRez);
    let listaRezervisanih = getDates(datumPocetkaRez, datumKrajaRez);
    alert(listaRezervisanih);
    let listaRezervisanihString = JSON.stringify(listaRezervisanih);
    alert(listaRezervisanihString);
    let novalista = [];
     for(var i = 0; i < listaRezervisanih.length; i++){
        novalista[i] = (JSON.stringify(listaRezervisanih[i])).substr(1,10);
        alert(novalista[i]);
    } 
    
    var n = true;

    alert(novalista);


    for(var i = 0; i < novalista.length; i++){
        if (!(apartman.dostupnostPoDatumima).includes(novalista[i])) {
            n = false;
            break;
        }
    } 

    alert(n);

    if (n) {
        let podaci = {
            "apartman": apartman,
            "pocetniDatum": datumPocetkaRez,
            "brNocenja": brNocenja,
            "listaRezervisanihDatuma": listaRezervisanih,
        }
    
        let s = JSON.stringify(podaci);
        alert(s);
    
        $.ajax ({
            url: 'rest/rezervacija/dodajRezervaciju/',
            type: 'POST',
            data: s,
            contentType: 'application/json',
            dataType: 'json',
            complete: function(data) {
                if (data["status"] == 200) {
                    alert("uspesno dodata rezervacija");
                    window.location.href = "index.html";
                } else {
                    alert("neuspesno dodata rezervacija");
                }
            }
        });
    } else {
        alert("Datumi rezervacije nisu slobodni");
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



