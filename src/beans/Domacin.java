package beans;

import java.util.ArrayList;
import java.util.List;

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
		
		ArrayList<Apartman> lista = new ArrayList<Apartman>();
		
		for(Apartman a : apartmani) {
			if(a.getUklonjen() == false) {
				lista.add(a);
			}
		}
		
		return lista;
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
}
