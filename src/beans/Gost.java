package beans;

import java.util.ArrayList;

import beans.Rezervacija.Status;


public class Gost extends Korisnik {

	private ArrayList<Apartman> iznajmljeniAp;
	private ArrayList<Rezervacija> rezervacije = new ArrayList<Rezervacija>();
	
	public Gost() {
		super();
	}
	
	public Gost(String korisnickoIme, String lozinka) {
		super(korisnickoIme, lozinka);
		//iznajmljeniAp = new ArrayList<Apartman>();
	//	rezervacije = new ArrayList<Rezervacija>();
	}
	
	public Gost(String ki, String loz, String ime, String prz, String pol) {
		super(ki, loz, ime, prz, pol, Uloga.Domacin);
	//	iznajmljeniAp = new ArrayList<Apartman>();
	//	rezervacije = new ArrayList<Rezervacija>();
	}
	
	public Gost(Korisnik k) {
		super(k.getKorisnicko_ime(), k.getLozinka(), k.getIme(), k.getPrezime(), k.getPol(), Uloga.Gost);
		iznajmljeniAp = this.iznajmljeniAp;
		rezervacije = this.rezervacije;
		
	}

	public ArrayList<Apartman> getIznajmljeniAp() {
		return iznajmljeniAp;
	}

	public void setIznajmljeniAp(ArrayList<Apartman> iznajmljeniAp) {
		this.iznajmljeniAp = iznajmljeniAp;
	}

	public ArrayList<Rezervacija> getRezervacije() {
		return rezervacije;
	}

	public void setRezervacije(ArrayList<Rezervacija> rezervacije) {
		this.rezervacije = rezervacije;
	}
	
	//dodajemo gostu novu rezervaciju u listu
	public void dodajRezervaciju(Rezervacija r) {
		rezervacije.add(r);
		System.out.println("Rezervacija dodata i kod gosta u listu!");
	}
	
	public void setOdustanak(String id) {
		for(Rezervacija r : rezervacije) {
			if(r.getIdRezervacije().equals(id)) {
				r.setStatus(Status.Odustanak);
			}
		}
	}
}
