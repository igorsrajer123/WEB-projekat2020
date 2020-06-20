package beans;

public class Administrator extends Korisnik {

	public Administrator() {
		super();
	}
	
	public Administrator(String korisnicko_ime, String lozinka) {
		super(korisnicko_ime, lozinka);
	}
	
	public Administrator(String korisnicko_ime, String lozinka, String ime, String prezime,
							String pol) {
		super(korisnicko_ime, lozinka, ime, prezime, pol, Uloga.Administrator);
	}
}
