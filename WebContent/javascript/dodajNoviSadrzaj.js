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

            
        }
    })
});