$(document).ready(function(){

    $.ajax({
        type: 'GET',
        url: 'rest/korisnik/getKorisnik',
        complete: function(data){

            let korisnik = data.responseJSON;
            
            let tabela = $("#nalogTabela");

            if(korisnik.uloga == "Administrator"){
                let korIme = "<tr> <td> <label id='lab'> Korisničko ime: </label></td><td><input id='korIme' type='text'"+
                " disabled='disabled' value=' " + korisnik.korisnicko_ime + "'/> </td>";     
                let lozinka = "<tr> <td> <label id='lab2'> Lozinka: </label></td><td><input id='staraLoz' type='password'"+
                "disabled='disabled' value=' " + korisnik.lozinka + "'/> </td><td><button id='izmeni'> Izmeni </button></td>";    
                let novaLoz = "<tr> <td> <label id='lab3'> Nova lozinka: </label></td><td><input id='novaLoz' type='password'/></td>";   
                let novaLoz2 = "<tr> <td> <label id='lab4'>Ponovi lozinku: </label></td><td><input id='novaLoz2' type='password'/></td>";   
                let ime = "<tr> <td> <label id='lab5'> Ime: </label></td><td><input id='ime' type='text'"+
                "value=' " + korisnik.ime + "'/> </td>";  
                let prezime = "<tr> <td> <label id='lab6'> Prezime: </label></td><td><input id='prz' type='text'"+
                "value=' " + korisnik.prezime + "'/> </td>";   
                let pol = "<tr> <td> <label id='lab7'> Pol: </label></td><td><select name='pol' id='pol'>"+
                "<option value='muski'> Muški</option> <option value='zenski'>Ženski</option></select></td>";				       
                $("#nalogTabela").append(korIme).append(lozinka).append(novaLoz).append(novaLoz2).append(ime).append(prezime).append(pol);
                document.getElementById("lab3").hidden = true;
                document.getElementById("novaLoz").hidden = true;
                document.getElementById("lab4").hidden = true;
                document.getElementById("novaLoz2").hidden = true;
            }else if(korisnik.uloga == "Domacin"){

            }else if(korisnik.uloga == "Gost"){

            }

            $("#izmeni").click(function(event){
                event.preventDefault();
            
                if($("#lab3").is(":visible")){
                    document.getElementById("lab3").hidden = true;
                    document.getElementById("novaLoz").hidden = true;
                    document.getElementById("lab4").hidden = true;
                    document.getElementById("novaLoz2").hidden = true;
                }else {
                    document.getElementById("lab3").hidden = false;
                    document.getElementById("novaLoz").hidden = false;
                    document.getElementById("lab4").hidden = false;
                    document.getElementById("novaLoz2").hidden = false;
                }
            })
        }
    })
});
