package beans;

public class Korisnik {


	public enum Uloga {Administrator, Domacin, Gost}
	
	protected String korisnicko_ime;
	protected String lozinka;
	protected String ime;
	protected String prezime;
	protected String pol;
	protected Uloga uloga;
	
	public Korisnik() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public Korisnik(String korisnicko_ime, String lozinka) {
		super();
		this.korisnicko_ime = korisnicko_ime;
		this.lozinka = lozinka;
	}
	
	public Korisnik(String ki, String loz, String ime, String prz, String pol, Uloga ul) {
		super();
		this.korisnicko_ime = ki;
		this.lozinka = loz;
		this.ime = ime;
		this.prezime = prz;
		this.pol = pol;
		this.uloga = ul;
	}

	public String getKorisnicko_ime() {
		return korisnicko_ime;
	}

	public void setKorisnicko_ime(String korisnicko_ime) {
		this.korisnicko_ime = korisnicko_ime;
	}

	public String getLozinka() {
		return lozinka;
	}

	public void setLozinka(String lozinka) {
		this.lozinka = lozinka;
	}

	public String getIme() {
		return ime;
	}

	public void setIme(String ime) {
		this.ime = ime;
	}

	public String getPrezime() {
		return prezime;
	}

	public void setPrezime(String prezime) {
		this.prezime = prezime;
	}

	public String getPol() {
		return pol;
	}

	public void setPol(String pol) {
		this.pol = pol;
	}

	public Uloga getUloga() {
		return uloga;
	}

	public void setUloga(Uloga uloga) {
		this.uloga = uloga;
	}

	@Override
	public String toString() {
		return "Korisnik [korisnicko_ime=" + korisnicko_ime + ", lozinka=" + lozinka + ", ime=" + ime + ", prezime="
				+ prezime + ", pol=" + pol + ", uloga=" + uloga + "]";
	}
}
