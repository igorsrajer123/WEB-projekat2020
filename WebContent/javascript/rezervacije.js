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

//fja za uzimanje parametra iz url-a koji smo prethodno poslali
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}