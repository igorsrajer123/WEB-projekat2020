$(document).ready(function(){

    document.getElementById("idPoruka").hidden = true;
    document.getElementById("nazivPoruka").hidden = true;

    $("#odustani").click(function(event){
		event.preventDefault();
		
        window.location.href = "index.html";
    })

    $.ajax({
		type: 'GET',
		url: 'rest/korisnik/getKorisnik',
		complete: function(data){
			pomocnaFunkcija(data.responseJSON);
		}		
	})

    $("#dodajStavku").click(function(event){
        event.preventDefault();

        let idStavke = document.getElementById("IdStavke").value;
        let nazivStavke = document.getElementById("nazivStavke").value;

        let idDobar = false;
        let nazivDobar = false;

        if(idStavke == "" || idStavke == " "){
            document.getElementById("idPoruka").hidden = false;
            idDobar = false;
        }else {
            document.getElementById("idPoruka").hidden = true;
            idDobar = true;
        }

        if(nazivStavke == "" || nazivStavke == " "){
            document.getElementById("nazivPoruka").hidden = false;
            nazivDobar = false;
        }else {
            document.getElementById("nazivPoruka").hidden = true;
            nazivDobar = true;
        }

        if(nazivDobar == true && idDobar == true){

            let podaci = { 
                "id": $("#IdStavke").val(),
                "item": $("#nazivStavke").val()
            }

            let s = JSON.stringify(podaci);

            $.ajax({
                type: 'POST',
                url: 'rest/sadrzajApartmana/dodajSadrzaj',
                data: s,
                contentType: 'application/json',
                dataType: 'json',
                complete: function(data){
                    if(data["status"] == 200){
                        alert("Stavka uspesno dodata!");
                        window.location.href = "dodajNoviSadrzaj.html";
                    }else if(data["status"] == 500)
                        alert("Stavka sa tim ID-jem vec postoji!");
                    else
                        alert("Doslo je do greske!");
                }
            })
        }
    })
});

function funkcija(id){
    window.location.href = "izmenaStavkeSadrzaja.html?id="+ id;
}

function pomocnaFunkcija(korisnik){
   
    if(korisnik == undefined){
        alert("Nedostupan sadrzaj!");
        window.location.href = "index.html";

    }else if(korisnik.uloga == 'Gost'){
        alert("Nedostupan sadrzaj!");
        window.location.href = "index.html";

    }else if(korisnik.uloga == 'Administrator'){
        
        $.ajax({
            type: 'GET',
            url: 'rest/sadrzajApartmana/getSavSadrzaj',
            complete: function(data){
    
                let savSadrzaj = data.responseJSON;
    
                let lista = $("#sadrzajApartmana tbody");
                lista.empty();
                for(var i = 0; i < savSadrzaj.length; i++){
                    if(savSadrzaj[i].uklonjen == false){
    
                        lista.append("<tr><td>"+ savSadrzaj[i].id + "</td><td>"+ savSadrzaj[i].item + "</td><td>"+
                        "<button onclick='funkcija("+ savSadrzaj[i].id + "); return false;'> Izmeni </button></td><td><button id='" + savSadrzaj[i].id + "'> Obriši </button></td></tr>");
    
                        let id1 = savSadrzaj[i].id;
                        document.getElementById(savSadrzaj[i].id).onclick = function fun(){
                            $.ajax({
                                type: 'PUT',
                                url: 'rest/sadrzajApartmana/ukloniSadrzaj/'+ id1,
                                complete: function(data){
                                    
                                    if(data["status"] == 200){
                                        alert("Uspesno uklonjeno!");
                                        window.location.href = "dodajNoviSadrzaj.html";
                                    }else{
                                        alert("Doslo je do greske!")
                                    }
                                }
                            })
                        }
    
                        $("#sadrzajApartmana").append(lista);
                    }else if(savSadrzaj[i].uklonjen == true){
                        lista.append("<tr style='background-color:red'><td>"+ savSadrzaj[i].id + "</td><td>"+ savSadrzaj[i].item + "</td>"+
                        "<td>------</td><td> UKLONJENO </td></tr>");
                        $("#sadrzajApartmana").append(lista);
                    }
                }
            }
        })

    }else if(korisnik.uloga == 'Domacin'){
        alert("Nedostupan sadrzaj!");
        window.location.href = "index.html";
    }
}
