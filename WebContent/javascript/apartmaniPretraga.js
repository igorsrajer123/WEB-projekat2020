$(document).ready(function(){

    document.getElementById("pretraga").hidden = true;
    document.getElementById("tipNijeOdabran").hidden = true;
    document.getElementById("brSobaPrazan").hidden = true;
    document.getElementById("brOsobaPrazan").hidden = true;

    let tipValidan = false;
    let sobeValidne = false;
    let osobeValidne = false;
    

    $("#pretragaBtn").click(function(event){

        if($("#pretraga").is(":visible")){
            document.getElementById("pretraga").hidden = true;
        }else {
            document.getElementById("pretraga").hidden = false;
        }
    })

    $("#pretrazi").click(function(event){

        event.preventDefault();

        let tip = $("#tip option:selected").val();
        let sobe = $("#brSoba").val();
        let osobe = $("#brOsoba").val();

        if(tip == "nista"){
            document.getElementById("tipNijeOdabran").hidden = false;
            tipValidan = false;
        }else {
            document.getElementById("tipNijeOdabran").hidden = true;
            tipValidan = true;
        }

        if(sobe == "" || sobe == " "){
            document.getElementById("brSobaPrazan").hidden = false;
            sobeValidne = false;
        }else {
            document.getElementById("brSobaPrazan").hidden = true;
            sobeValidne = true;
        }

        if(osobe == "" || osobe == " "){
            document.getElementById("brOsobaPrazan").hidden = false;
            osobeValidne = false;
        }else {
            document.getElementById("brOsobaPrazan").hidden = true;
            osobeValidne = true;
        }

        if(tipValidan && sobeValidne && osobeValidne){
            $.ajax({
                type: 'GET',
                url: 'rest/apartman/pretraga/'+tip + '/'+ sobe + '/'+ osobe,
                complete: function(data){

                    let apartmani = data.responseJSON;

                    let lista = $("#apartmaniTabela tbody");
                    lista.empty();

                    for(var i = 0; i < apartmani.length;i++){
                        lista.append("<tr><td>" + i + "</td>"
                        + "<td>" + apartmani[i].brSoba + "</td> " + "<td>" 
                        + apartmani[i].brGostiju + "</td>" + "<td>" + apartmani[i].lokacija + "</td>"
                        + "<td>" + apartmani[i].domacin + "</td>" + "<td>" + apartmani[i].cenaPoNoci
                        + "</td>");
                        $("#apartmaniTabela").append(lista);        
                    }
                }
            })
        }
    })
});