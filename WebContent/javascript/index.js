$(document).ready(function(){
	
	
	//klikom na dugme "prijava" odlazi na stranicu za prijavu
	$("#prijava_button").click(function(event)
	{
		event.preventDefault();
		window.location.href = "prijava.html";
	})
	
	//klikom na dugme "registracija" odlazi na stranicu za registraciju
	$("#registracija_button").click(function(event){
		event.preventDefault();
		window.location.href = "registracija.html";
	})
	
	
});
