$(document).ready(function(){

    document.getElementById("pretraga").hidden = true;

    $.ajax({
        type: 'GET',
        url: 'rest/korisnik/getSveKorisnike',
        complete: function(data){

            let korisnici = data.responseJSON;

            let lista = $("#korisniciTabela tbody");
            lista.empty();

            console.log(korisnici.length);

            for(var i = 0; i < korisnici.length;i++){
				if(korisnici[i].uloga == "Administrator"){
					 lista.append("<tr><td>" + korisnici[i].korisnicko_ime + "</td>"
                   + "<td>" + korisnici[i].lozinka + "</td> " + "<td>" 
                   + korisnici[i].ime + "</td>" + "<td>" + korisnici[i].prezime + "</td>"
                   + "<td>" + korisnici[i].pol + "</td>" + "<td>" + korisnici[i].uloga 
                   + "</td>" + "<td></td>" );
                $("#korisniciTabela").append(lista);
				}else {
				 	lista.append("<tr><td>" + korisnici[i].korisnicko_ime + "</td>"
                   + "<td>" + korisnici[i].lozinka + "</td> " + "<td>" 
                   + korisnici[i].ime + "</td>" + "<td>" + korisnici[i].prezime + "</td>"
                   + "<td>" + korisnici[i].pol + "</td>" + "<td>" + korisnici[i].uloga 
                   + "</td>" + "<td><a id='" + korisnici[i].korisnicko_ime + "' href='pregledKorisnika.html'> Ažuriraj ulogu</a></td>" );
                $("#korisniciTabela").append(lista);
				}
            }
        }

    })

    $("#prikazPretrage").click(function(event){
        event.preventDefault();

        if($("#pretraga").is(":visible"))
            document.getElementById("pretraga").hidden = true;
        else 
        document.getElementById("pretraga").hidden = false; 

    })

    //ukoliko je prazno polje
    let tag = document.createElement("p");
    tag.setAttribute("id", "prvi");
    let text = document.createTextNode("Prazno polje!");
    tag.append(text);	
    tag.style.color = 'red';
    let obojeniTekst = tag;
    document.getElementById("k").after(obojeniTekst);
    document.getElementById("prvi").hidden = true;

    //ukoliko ne postoji korisnik
    let tag2 = document.createElement("p");
    tag2.setAttribute("id", "drugi");
    let text2 = document.createTextNode("Korisnik ne postoji!");
    tag2.append(text2);	
    tag2.style.color = 'red';
    let obojeniTekst2 = tag2;
    document.getElementById("k").after(obojeniTekst2);
    document.getElementById("drugi").hidden = true;

    $("#pretrazi").click(function(event){
        event.preventDefault();

        let korIme = $("#korImePretraga").val();
        /*
        if(korIme == ""){
            document.getElementById("prvi").hidden = false;
        }else {
            document.getElementById("prvi").hidden = true;
        }*/

        $.ajax({
            type: 'GET',
            url: 'rest/korisnik/pretraga/'+korIme,
            complete: function(data){

                let korisnik = data.responseJSON;

                if(korisnik == null){
                    if(korIme == ""){
                        document.getElementById("prvi").hidden = false;
                        document.getElementById("drugi").hidden = true;
                    }else {
                        document.getElementById("drugi").hidden = false;
                        document.getElementById("prvi").hidden = true;
                    }
                }else {
                    document.getElementById("drugi").hidden = true;
                    document.getElementById("prvi").hidden = true;

                    let lista = $("#korisniciTabela tbody");
                    lista.empty();

                    if(korisnik.uloga == "Administrator"){
                        lista.append("<tr><td>" + korisnik.korisnicko_ime + "</td>"
                        + "<td>" + korisnik.lozinka + "</td> " + "<td>" 
                        + korisnik.ime + "</td>" + "<td>" + korisnik.prezime + "</td>"
                        + "<td>" + korisnik.pol + "</td>" + "<td>" + korisnik.uloga 
                        + "</td>" + "<td></td>" );
                        $("#korisniciTabela").append(lista);
                    }else {
                        lista.append("<tr><td>" + korisnik.korisnicko_ime + "</td>"
                        + "<td>" + korisnik.lozinka + "</td> " + "<td>" 
                        + korisnik.ime + "</td>" + "<td>" + korisnik.prezime + "</td>"
                        + "<td>" + korisnik.pol + "</td>" + "<td>" + korisnik.uloga 
                        + "</td>" + "<td><a id='" + korisnik.korisnicko_ime + "'href='pregledKorisnika.html'> Ažuriraj ulogu </a></td>" );
                        $("#korisniciTabela").append(lista);
                    }
                }
            }
        })        
    })
});