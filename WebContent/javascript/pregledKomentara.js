$(document).ready(function(){

    $.ajax({
        type: 'GET',
        url: 'rest/korisnik/getKorisnik',
        complete: function(data){

            var number = getUrlVars()["idApartmana"];

            pomocnaFunkcija(data.responseJSON);
            ucitajCekiraniStatus(number);
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
    
    }else if(korisnik.uloga == 'Domacin'){
        var number = getUrlVars()["idApartmana"];
        prikazKomentaraDomacin(number);
    }
}

function prikazKomentaraAdmin(){

    $.ajax({
        type: 'GET',
        url: 'rest/komentar/getSveKomentare',
        complete: function(data){

            let sviKomentari = data.responseJSON;

           document.getElementById("formaKomentari").reset();

            for(var i = 0; i < sviKomentari.length; i++){
                var newDiv = document.createElement("div"); 
                newDiv.innerHTML = "<br/> Komentar postavio: <b>" + sviKomentari[i].gost + "</b><br/> Apartman: <a href='pregledPodatakaApartman.html?idApartmana=" + sviKomentari[i].apartman + "'> Pogledaj apartman </a> <br/><br/>  " + sviKomentari[i].tekst + 
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
                if(sviKomentari[i].komentarVidljiv == true){
                    var newDiv = document.createElement("div"); 
                    newDiv.innerHTML = "<br/> Komentar postavio: <b>" + sviKomentari[i].gost + "</b><br/> " + sviKomentari[i].tekst + 
                        "<br/><br/> Ocena korisnika:<b> " + sviKomentari[i].ocena + "</b><br/><br/>"; 
                    $("#formaKomentari").append(newDiv);
                }
            }
        }
    })
}

function prikazKomentaraDomacin(idAp){
    
    $.ajax({
        type: 'GET',
        url: 'rest/komentar/getKomentareMogApartmana/'+ idAp,
        complete: function(data){

            let sviKomentari = data.responseJSON;

            document.getElementById("formaKomentari").reset();
            
            for(var i = 0; i < sviKomentari.length; i++){
                var newDiv = document.createElement("div"); 
                newDiv.innerHTML = "Komentar postavio: <b>" + sviKomentari[i].gost + "</b><br/><br/>  " + sviKomentari[i].tekst + 
                    "<br/><br/> Ocena korisnika:<b> " + sviKomentari[i].ocena + "</b><br/><br/> <label for='" + sviKomentari[i].idKomentara + "'>Vidljiv komentar</label><input type='checkbox' styleId='" + sviKomentari[i].tekst + "' id='"+ sviKomentari[i].idKomentara +"' onclick=sakrijKomentar('" + sviKomentari[i].idKomentara + "')><br/>"; 
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

function sakrijKomentar(idKom){
    
    $.ajax({
        type: 'PUT',
        url: 'rest/komentar/setVidljivost/' + idKom,
        complete: function(data){
            if(data["status"] == 200){
                alert("Vidljivost uspesno postavljena!");
            }else {
                alert("Neuspesno postavljanje vidljivosti!");
            }
        }
    })
}

function ucitajCekiraniStatus(idAp){

    $.ajax({
        type: 'GET',
        url: 'rest/komentar/getKomentareApartmana/'+ idAp,
        complete: function(data){

            let komentariApartmana = data.responseJSON;

            for(var i = 0; i < komentariApartmana.length; i++){
                if(komentariApartmana[i].komentarVidljiv == true){
                    //alert(komentariApartmana[i].idKomentara);
                    let a = document.getElementById(komentariApartmana[i].idKomentara);//.checked = true;
                    a.checked = true;
                   // $("checkbox[name=" + komentariApartmana[i].idKomentara + "]").prop('checked', true);
                }else if(komentariApartmana[i].komentarVidljiv == false){
                    let a = document.getElementById(komentariApartmana[i].idKomentara);//.checked = false;
                    a.checked = false;
                 //$("checkbox[name=" + komentariApartmana[i].idKomentara + "]").prop('checked', false);
                }
            }
        }
    })
}