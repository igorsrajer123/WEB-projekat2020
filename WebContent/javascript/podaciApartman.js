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
