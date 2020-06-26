$(document).ready(function(){

    document.getElementById("idPoruka").hidden = true;
    document.getElementById("nazivPoruka").hidden = true;

    $("#odustani").click(function(event){
		event.preventDefault();
		
        window.location.href = "index.html";
    })

    $.ajax({
        type: 'GET',
        url: 'rest/sadrzajApartmana/getSavSadrzaj',
        complete: function(data){

            let savSadrzaj = data.responseJSON;

            let lista = $("#sadrzajApartmana tbody");
            lista.empty();

            for(var i = 0; i < savSadrzaj.length; i++){
                lista.append("<tr><td>"+ savSadrzaj[i].id + "</td><td>"+ savSadrzaj[i].item + "</td><td>"+
                    "<button> Izmeni </button></td><td><button> Obriši </button></td></tr>");
                $("#sadrzajApartmana").append(lista);
            }
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
            alert("Sve je dobro!!!!");

            let podaci = { 
                "id": $("#IdStavke").val(),
                "item": $("#nazivStavke").val()
            }

            let s = JSON.stringify(podaci);
            alert(s);

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