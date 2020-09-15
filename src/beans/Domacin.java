package beans;

import java.util.ArrayList;
import java.util.Date;

import beans.Rezervacija.Status;

public class Domacin extends Korisnik {

	private ArrayList<Apartman> apartmani = new ArrayList<Apartman>();
	
	public Domacin() {
		super();
	}
	
	public Domacin(Korisnik k) {
		super();
		this.apartmani = apartmani;
	}
	
	public Domacin(String korisnickoIme, String lozinka) {
		super(korisnickoIme, lozinka);
		//apartmani = new ArrayList<Apartman>();
	}
	
	public Domacin(String ki, String loz, String ime, String prz, String pol) {
		super(ki, loz, ime, prz, pol, Uloga.Domacin);
		//apartmani = new ArrayList<Apartman>();
	}

	public ArrayList<Apartman> getApartmani() {
		return apartmani; 			
	}
	
	
	public void setApartmani(ArrayList<Apartman> apartmani) {
		this.apartmani = apartmani;
	}
	
	public static Domacin Parse(Korisnik k) {
		
		Domacin d = new Domacin(k.getKorisnicko_ime(), k.getLozinka(), k.getIme(), k.getPrezime(), k.getPol());
		
		return d;
	}

	public void dodajApartman(Apartman a) {
		apartmani.add(a);
	}
	
	public Apartman getApartmanPoId(String id) {
		Apartman apartman = null;
		
		for(Apartman a : apartmani) {
			if(a.getIdApartmana().equals(id)) {
				apartman = a;
				break;
			}
		}
		
		return apartman;
	}
	
	public void zameniApartman(Apartman a, String idAp) {
		System.out.println("MOLIM TE UDJI U MENE");
		for(Apartman app : apartmani) {
			if(app.getIdApartmana().equals(idAp)) {
				apartmani.remove(app);
				apartmani.add(a);
				break;
			}
		}
	}
	
	public void prihvatiRezervaciju(String idAp, String idRez) {
		Apartman a = getApartmanPoId(idAp);
		
		Rezervacija r = a.getRezervacijuID(idRez);
		
		r.setStatus(Status.Prihvacena);
		
		ArrayList<java.sql.Date> slobodniDatumi = a.getdatumiZaIzdavanje();
		ArrayList<java.sql.Date> datumiZaZauzimanje = r.getDatumiRezervacije();
		
		System.out.println("USAO SAM U MESO");
	}
	
}
