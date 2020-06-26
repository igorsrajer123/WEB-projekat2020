$(document).ready(function(){

    var number = getUrlVars()["idApartmana"];

    ucitajSadrzajApartmana();

    document.getElementById("greskaBrSobaPor").hidden = true;
    document.getElementById("greskaBrGostijuPor").hidden = true;
    document.getElementById("greskaCenaPor").hidden = true;

    let brSobaIspravan = false;
    let brGostijuIspravan = false;
    let cenaIspravna = false;

	$.ajax({
		type: 'GET',
		url: 'rest/apartman/getBiloKojiApartman/'+ number,
		complete: function(data){
			
            let apartman = data.responseJSON;
            
            let tip = "<td> <b> <i>" + apartman.tip + "</i></b></td>";
            $("#k").append(tip);

            $("#brSoba:text").val(apartman.brSoba);
            $("#brGostiju:text").val(apartman.brGostiju);
            $("#lokacija:text").val(apartman.lokacija);
            $("#cena:text").val(apartman.cenaPoNoci);
            $("#komentar:text").val(apartman.komentar);
            document.getElementById("statusLabela").innerHTML = apartman.status;

            let statusApp = document.getElementById("statusLabela").textContent;

            $("#promeniStatusBtn").click(function(event){
                event.preventDefault();
        
                if( document.getElementById("statusLabela").textContent == "Aktivno"){
                    document.getElementById("statusLabela").innerHTML = "Neaktivno";
                }
                else if(document.getElementById("statusLabela").textContent == "Neaktivno"){
                    document.getElementById("statusLabela").innerHTML = "Aktivno";
                }
            })
		}
    })

    $("#izmeniApp").click(function(event){
        event.preventDefault();

        let statusApartmana = document.getElementById("statusLabela").textContent;
        let brSobaApartmana = document.getElementById("brSoba").value;
        let brGostijuApartmana = document.getElementById("brGostiju").value;
        let cenaApartmana = document.getElementById("cena").value;

        if(brSobaApartmana == "" || brSobaApartmana == " "){
            document.getElementById("greskaBrSobaPor").hidden = false;
            brSobaIspravan = false;
        }else {
            document.getElementById("greskaBrSobaPor").hidden = true;
            brSobaIspravan = true;
        }

        if(brGostijuApartmana == "" || brGostijuApartmana == " "){
            document.getElementById("greskaBrGostijuPor").hidden = false;
            brGostijuIspravan = false;
        }else {
            document.getElementById("greskaBrGostijuPor").hidden = true;
            brGostijuIspravan = true;
        }

        if(cenaApartmana == "" || cenaApartmana == " "){
            document.getElementById("greskaCenaPor").hidden = false;
            cenaIspravna = false;
        }else {
            document.getElementById("greskaCenaPor").hidden = true;
            cenaIspravna = true;
        }

        if(brGostijuIspravan == true && brSobaIspravan == true && cenaIspravna == true){
            alert("Sve isprano!");

            $.ajax({
                type: 'PUT',
                url: 'rest/apartman/izmeniApartman/'+number+'/'+statusApartmana+'/'+brSobaApartmana+'/'+brGostijuApartmana+'/'+cenaApartmana,
                complete: function(data){

                    if(data["status"] == 200){
                        window.location.href = "index.html";
                    }else {
                        alert("Apartman neuspesno izmenjen!");
                    }
                }
            })
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

//ucitavanje slike
function readURL(input){
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#blah')
                .attr('src', e.target.result)
                .width(200)
                .height(200);
        };

        reader.readAsDataURL(input.files[0]);
    }
}

function ucitajSadrzajApartmana(){

    $.ajax({
        type: 'GET',
        url: 'rest/sadrzajApartmana/getSavSadrzaj',
        complete: function(data){

            let savSadrzaj = data.responseJSON;

            let lista = $("#tabelaSadrzaj tbody");
            lista.empty();

            for(var i = 0; i < savSadrzaj.length; i++){
                lista.append("<tr><td><input type='checkbox' id='" + savSadrzaj[i].id +"'>" + 
                                     "<label for='"+ savSadrzaj[i].id + "'>"+ savSadrzaj[i].item + "</label></td></tr>");
                $("#tabelaSadrzaj").append(lista);
            }
        }
    })
}

