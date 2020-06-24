$(document).ready(function(){

    //nova sifra skriveno
    document.getElementById("lab3").hidden = true;
    document.getElementById("novaLoz").hidden = true;
    document.getElementById("lab4").hidden = true;
    document.getElementById("novaLoz2").hidden = true;

    document.getElementById("imeP").hidden = true;
    document.getElementById("przP").hidden = true;
    document.getElementById("novaP").hidden = true;
    document.getElementById("ponoviP").hidden = true;

    let imeIspravno = false;
    let przIspravno = false;
    let prvaLozIspravna = false;
    let drugaLozIspravna = false;

    $.ajax({
        type: 'GET',
        url: 'rest/korisnik/getKorisnik',
        complete: function(data){

            let korisnik = data.responseJSON;

            let uloga = "<td><label><b><i>" + korisnik.uloga + "</i></b></label></td>";
            $("#u").append(uloga);
            
            let tabela = $("#nalogTabela");

            $("#korIme:text").val(korisnik.korisnicko_ime);
            $("#staraLoz").val(korisnik.lozinka);
            $("#ime").val(korisnik.ime);
            $("#prz").val(korisnik.prezime);
            
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

            $("#odustani").click(function(event){
                event.preventDefault();

                window.location.href = "index.html";
            })

            $("#sacuvaj").click(function(event){
                event.preventDefault();

                if($("#ime").val() == "" || $("#ime").val() == " "){
                    document.getElementById("imeP").hidden = false;
                }else {
                    document.getElementById("imeP").hidden = true;
                    imeIspravno = true;
                }

                if($("#prz").val() == "" || $("#prz").val() == " "){
                    document.getElementById("przP").hidden = false;
                }else {
                    document.getElementById("przP").hidden = true;
                    przIspravno = true; 
                }

                let duzinaLozinke = $("#novaLoz").val().length;
                let vrPrva = $("#novaLoz").val();
                let vrDruga = $("#novaLoz2").val();

                if($("#novaLoz").is(":visible")){

                    if(duzinaLozinke < 5){
                        document.getElementById("novaP").hidden = false;
                        prvaLozIspravna = false;
                    }else{
                        document.getElementById("novaP").hidden = true;
                        prvaLozIspravna = true;
                    }
                    if(vrPrva !== vrDruga){
                        document.getElementById("ponoviP").hidden = false;
                        drugaLozIspravna = false;
                    }else{
                        document.getElementById("ponoviP").hidden = true;
                        drugaLozIspravna = true;
                    }

                    if(imeIspravno == true && przIspravno == true && prvaLozIspravna == true && drugaLozIspravna == true){

                    }

                }else {
                    document.getElementById("novaP").hidden = true;
                    document.getElementById("ponoviP").hidden = true;
                    prvaLozIspravna = true;
                    drugaLozIspravna = true;

                    if(imeIspravno == true && przIspravno == true){

                    }
                }
            })
        }     
    })
});
