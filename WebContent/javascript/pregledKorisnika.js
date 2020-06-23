$(document).ready(function(){

    $.ajax({
        type: 'GET',
        url: 'rest/korisnik/getSveKorisnike',
        complete: function(data){

            let korisnici = data.responseJSON;

            let lista = $("#korisniciTabela tbody");
            lista.empty();

            console.log(korisnici.length);

            for(var i = 0; i < korisnici.length;i++){
               lista.append("<tr><td>" + korisnici[i].korisnicko_ime + "</td>"
                   + "<td>" + korisnici[i].lozinka + "</td> " + "<td>" 
                   + korisnici[i].ime + "</td>" + "<td>" + korisnici[i].prezime + "</td>"
                   + "<td>" + korisnici[i].pol + "</td>" + "<td>" + korisnici[i].uloga 
                   + "</td>" + "<td><a id='" + korisnici[i].korisnicko_ime + "'> Izmeni podatke</a></td>" );
                $("#korisniciTabela").append(lista);
            }
        }

    })
});

function dodajKorisnika(korisnik){
    
    let tr = $("<tr></tr>");
    let korIme = $("<td>" + korisnik.korisnicko_ime + "</td>");
    let loz = $("<td>" + korisnik.lozinka + "</td>");
    let ime = $("<td>" + korisnik.ime + "</td>");
    let prz = $("<td>" + korisnik.prezima + "</td>");
    let pol = $("<td>" + korisnik.pol + "</td>");
    let uloga = $("<td>" + korisnik.uloga+ "</td>");
    let link = "<td><a id='" + korisnik.korisnicko_ime + "'> Izmeni podatke</a></td>";

    tr.append(korIme).append(loz).append(ime).append(prz).append(pol).append(uloga).append(link);
    console.log(tr);
    $("#korisniciTabela tbody").append(tr);
}