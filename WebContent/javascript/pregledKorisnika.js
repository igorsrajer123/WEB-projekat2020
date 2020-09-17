$(document).ready(function(){

    document.getElementById("pretraga").hidden = true;

    $.ajax({
		type: 'GET',
		url: 'rest/korisnik/getKorisnik',
		complete: function(data){
			odrediKorisnika(data.responseJSON);
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
        let polKor = $("#pol option:selected" ).text();
        let uloga = $("#uloga option:selected").text();
       // alert(polKor + " " + uloga);

        $.ajax({
            type: 'GET',
            url: 'rest/korisnik/pretrazi/'+ korIme + '/' + uloga + '/' + polKor,
            complete: function(data){

                let korisnik = data.responseJSON;
              //  alert(korisnik);

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

                    if(korisnik[0].uloga == "Administrator"){
                        lista.append("<tr><td>" + korisnik[0].korisnicko_ime + "</td>"
                        + "<td>" + korisnik[0].lozinka + "</td> " + "<td>" 
                        + korisnik[0].ime + "</td>" + "<td>" + korisnik[0].prezime + "</td>"
                        + "<td>" + korisnik[0].pol + "</td>" + "<td>" + korisnik[0].uloga 
                        + "</td>" + "<td></td>" );
                        $("#korisniciTabela").append(lista);
                    }else if(korisnik[0].uloga == "Domacin"){
                        lista.append("<tr><td>" + korisnik[0].korisnicko_ime + "</td>"
                        + "<td>" + korisnik[0].lozinka + "</td> " + "<td>" 
                        + korisnik[0].ime + "</td>" + "<td>" + korisnik[0].prezime + "</td>"
                        + "<td>" + korisnik[0].pol + "</td>" + "<td>" + korisnik[0].uloga 
                        + "</td>" + "<td></td>" );
                        $("#korisniciTabela").append(lista);
                    }else {
                        lista.append("<tr><td>" + korisnik[0].korisnicko_ime + "</td>"
                        + "<td>" + korisnik[0].lozinka + "</td> " + "<td>" 
                        + korisnik[0].ime + "</td>" + "<td>" + korisnik[0].prezime + "</td>"
                        + "<td>" + korisnik[0].pol + "</td>" + "<td>" + korisnik[0].uloga 
                        + "</td>" + "<td><button id='" + korisnik[0].korisnicko_ime + "'> Ažuriraj ulogu </button></td>" );
                        
                        let korisnicko = korisnik[0].korisnicko_ime;

                        document.getElementById(korisnik[0].korisnicko_ime).onclick = function fun(){
                            $.ajax({
                                type: 'PUT',
                                url: 'rest/korisnik/azurirajUlogu/'+ korisnicko,
                                complete: function(data){

                                    if(data["status"] == 200){
                                        window.location.href = "pregledKorisnika.html";
                                    }else if(data["status"] == 500){
                                        alert("Doslo je do greske!");
                                    }
                                }
                            })
                        }
                        $("#korisniciTabela").append(lista); 
                    }
                }
            }
        })        
    })

    $("#ponisti").click(function(event){
        event.preventDefault();
        
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
                    }else if(korisnici[i].uloga == "Domacin"){
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
                        + "</td>" + "<td><button id='"+ korisnici[i].korisnicko_ime + "'> Ažuriraj ulogu</button></td>");
                        
                        let korisnicko = korisnici[i].korisnicko_ime;
    
                        document.getElementById(korisnici[i].korisnicko_ime).onclick = function fun(){
                            $.ajax({
                                type: 'PUT',
                                url: 'rest/korisnik/azurirajUlogu/'+ korisnicko,
                                complete: function(data){
    
                                    if(data["status"] == 200){
                                        window.location.href = "pregledKorisnika.html";
                                    }else if(data["status"] == 500){
                                        alert("Doslo je do greske!");
                                    }
                                }
                            })
                        }
    
                        $("#korisniciTabela").append(lista);
                    }
                }
            }
        })

    })
});

function odrediKorisnika(korisnik){

    if(korisnik == undefined){
        alert("Nedostupan sadrzaj!");
        window.location.href = "index.html";

    }else if(korisnik.uloga == 'Gost'){
        alert("Nedostupan sadrzaj!");
        window.location.href = "index.html";

    }else if(korisnik.uloga == 'Administrator'){
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
                    }else if(korisnici[i].uloga == "Domacin"){
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
                        + "</td>" + "<td><button id='"+ korisnici[i].korisnicko_ime + "'> Ažuriraj ulogu</button></td>");
                        
                        let korisnicko = korisnici[i].korisnicko_ime;
    
                        document.getElementById(korisnici[i].korisnicko_ime).onclick = function fun(){
                            $.ajax({
                                type: 'PUT',
                                url: 'rest/korisnik/azurirajUlogu/'+ korisnicko,
                                complete: function(data){
    
                                    if(data["status"] == 200){
                                        window.location.href = "pregledKorisnika.html";
                                    }else if(data["status"] == 500){
                                        alert("Doslo je do greske!");
                                    }
                                }
                            })
                        }
    
                        $("#korisniciTabela").append(lista);
                    }
                }
            }
        })

    }else if(korisnik.uloga == 'Domacin'){
        alert("Nedostupan sadrzaj!");
        window.location.href = "index.html";
    }
}
