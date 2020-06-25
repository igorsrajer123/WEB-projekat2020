$(document).ready(function(){

	var number = getUrlVars()["idApartmana"];

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

