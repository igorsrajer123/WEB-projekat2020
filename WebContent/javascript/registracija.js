$(document).ready(function(){
	
	//odustaje se od registracije i vraca se na pocetnu stranicu
	$("#odustani").click(function(event){
		event.preventDefault();
		window.location.href = "index.html";
	})
});