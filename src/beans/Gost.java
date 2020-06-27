package beans;

import java.util.ArrayList;
import java.util.List;

public class Gost extends Korisnik {

	private List<Apartman> iznajmljeniAp;
	private List<Rezervacija> rezervacije;
	
	public Gost() {
		super();
	}
	
	public Gost(String korisnickoIme, String lozinka) {
		super(korisnickoIme, lozinka);
		iznajmljeniAp = new ArrayList<Apartman>();
		rezervacije = new ArrayList<Rezervacija>();
	}
	
	public Gost(String ki, String loz, String ime, String prz, String pol) {
		super(ki, loz, ime, prz, pol, Uloga.Domacin);
		iznajmljeniAp = new ArrayList<Apartman>();
		rezervacije = new ArrayList<Rezervacija>();
	}
	
	public Gost(Korisnik k) {
		super(k.getKorisnicko_ime(), k.getLozinka(), k.getIme(), k.getPrezime(), k.getPol(), Uloga.Gost);
		iznajmljeniAp = this.iznajmljeniAp;
		rezervacije = this.rezervacije;
		
	}

	public List<Apartman> getIznajmljeniAp() {
		return iznajmljeniAp;
	}

	public void setIznajmljeniAp(List<Apartman> iznajmljeniAp) {
		this.iznajmljeniAp = iznajmljeniAp;
	}

	public List<Rezervacija> getRezervacije() {
		return rezervacije;
	}

	public void setRezervacije(List<Rezervacija> rezervacije) {
		this.rezervacije = rezervacije;
	}
}
