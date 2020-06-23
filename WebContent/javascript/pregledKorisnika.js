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
               lista.append("<tr><td>" + korisnici[i].korisnicko_ime + "</td>"
                   + "<td>" + korisnici[i].lozinka + "</td> " + "<td>" 
                   + korisnici[i].ime + "</td>" + "<td>" + korisnici[i].prezime + "</td>"
                   + "<td>" + korisnici[i].pol + "</td>" + "<td>" + korisnici[i].uloga 
                   + "</td>" + "<td><a id='" + korisnici[i].korisnicko_ime + "'> Ukloni korisnika </a></td>" );
                $("#korisniciTabela").append(lista);
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

    //pomocni tekst za validaciju
    let tag = document.createElement("p");
    tag.setAttribute("id", "prvi");
    let text = document.createTextNode("Prazno polje!");
    tag.append(text);	
    tag.style.color = 'red';
    let obojeniTekst = tag;
    document.getElementById("k").after(obojeniTekst);
    document.getElementById("prvi").hidden = true;

    $("#pretrazi").click(function(event){
        event.preventDefault();

        let korIme = $("#korImePretraga").val();
    
        if(korIme == ""){
            document.getElementById("prvi").hidden = false;
        }else {
            document.getElementById("prvi").hidden = true;
        }

        $.ajax({
            type: 'GET',
            url: 'rest/korisnik/pretraga/'+korIme,
            complete: function(data){

                if(data == null){
                    document.getElementById("prvi").hidden = false;
                }else {
                let korisnik = data.responseJSON;

                let lista = $("#korisniciTabela tbody");
                lista.empty();

                lista.append("<tr><td>" + korisnik.korisnicko_ime + "</td>"
                   + "<td>" + korisnik.lozinka + "</td> " + "<td>" 
                   + korisnik.ime + "</td>" + "<td>" + korisnik.prezime + "</td>"
                   + "<td>" + korisnik.pol + "</td>" + "<td>" + korisnik.uloga 
                   + "</td>" + "<td><a id='" + korisnik.korisnicko_ime + "'> Ukloni korisnika </a></td>" );
                $("#korisniciTabela").append(lista);
                }

            }
        })        
    })

});
