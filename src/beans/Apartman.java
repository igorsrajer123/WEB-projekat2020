package beans;

import java.util.ArrayList;
import java.util.List;

public class Apartman {

	public enum Tip {Soba, Ceo_apartman}
	public enum Status {Aktivno, Neaktivno}
	
	private Tip tip;
	private int brSoba;
	private int brGostiju;
	private Lokacija lokacija;
	private String datumZaIzdavanje;
	private List<String> dostupnostPoDatumima;
	private Domacin domacin;
	private Komentar komentar;
	private String slika;//vise slika treba
	private double cenaPoNoci;
	private String vrZaPrijavu;
	private String vrZaOdjavu;
	private Status status;
	private SadrzajApartmana sadrzajAp;
	private List<Rezervacija> rezervacije;
	
	public Apartman() {
		super();
		this.status = Status.Aktivno;
	}
	
	public Apartman(Tip tip, int brSoba, int brGostiju, Lokacija lokacija, String datum, Domacin d,
						String slika, SadrzajApartmana sadrzaj, double cena) {							
		super();
		this.tip = tip;
		this.brSoba = brSoba;
		this.brGostiju = brGostiju;
		this.lokacija = lokacija;
		this.datumZaIzdavanje = datum;
		this.dostupnostPoDatumima = new ArrayList<String>();
		this.domacin = d;
		this.komentar = null;
		this.slika = slika;
		this.cenaPoNoci = cena;
		this.vrZaOdjavu = "";
		this.vrZaPrijavu = "";
		this.status = Status.Aktivno;	
		this.sadrzajAp = sadrzaj;
		this.rezervacije = new ArrayList<Rezervacija>();				
	}

	public Tip getTip() {
		return tip;
	}

	public void setTip(Tip tip) {
		this.tip = tip;
	}

	public int getBrSoba() {
		return brSoba;
	}

	@Override
	public String toString() {
		return "Apartman [tip=" + tip + ", brSoba=" + brSoba + ", brGostiju=" + brGostiju + ", lokacija=" + lokacija
				+ ", datumZaIzdavanje=" + datumZaIzdavanje + ", dostupnostPoDatumima=" + dostupnostPoDatumima
				+ ", domacin=" + domacin + ", komentar=" + komentar + ", slika=" + slika + ", cenaPoNoci=" + cenaPoNoci
				+ ", vrZaPrijavu=" + vrZaPrijavu + ", vrZaOdjavu=" + vrZaOdjavu + ", status=" + status + ", sadrzajAp="
				+ sadrzajAp + ", rezervacije=" + rezervacije + "]";
	}

	public void setBrSoba(int brSoba) {
		this.brSoba = brSoba;
	}

	public int getBrGostiju() {
		return brGostiju;
	}

	public void setBrGostiju(int brGostiju) {
		this.brGostiju = brGostiju;
	}

	public Lokacija getLokacija() {
		return lokacija;
	}

	public void setLokacija(Lokacija lokacija) {
		this.lokacija = lokacija;
	}

	public String getDatumZaIzdavanje() {
		return datumZaIzdavanje;
	}

	public void setDatumZaIzdavanje(String datumZaIzdavanje) {
		this.datumZaIzdavanje = datumZaIzdavanje;
	}

	public List<String> getDostupnostPoDatumima() {
		return dostupnostPoDatumima;
	}

	public void setDostupnostPoDatumima(List<String> dostupnostPoDatumima) {
		this.dostupnostPoDatumima = dostupnostPoDatumima;
	}

	public Domacin getDomacin() {
		return domacin;
	}

	public void setDomacin(Domacin domacin) {
		this.domacin = domacin;
	}

	public Komentar getKomentar() {
		return komentar;
	}

	public void setKomentar(Komentar komentar) {
		this.komentar = komentar;
	}

	public String getSlika() {
		return slika;
	}

	public void setSlika(String slika) {
		this.slika = slika;
	}

	public double getCenaPoNoci() {
		return cenaPoNoci;
	}

	public void setCenaPoNoci(double cenaPoNoci) {
		this.cenaPoNoci = cenaPoNoci;
	}

	public String getVrZaPrijavu() {
		return vrZaPrijavu;
	}

	public void setVrZaPrijavu(String vrZaPrijavu) {
		this.vrZaPrijavu = vrZaPrijavu;
	}

	public String getVrZaOdjavu() {
		return vrZaOdjavu;
	}

	public void setVrZaOdjavu(String vrZaOdjavu) {
		this.vrZaOdjavu = vrZaOdjavu;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	public SadrzajApartmana getSadrzajAp() {
		return sadrzajAp;
	}

	public void setSadrzajAp(SadrzajApartmana sadrzajAp) {
		this.sadrzajAp = sadrzajAp;
	}

	public List<Rezervacija> getRezervacije() {
		return rezervacije;
	}

	public void setRezervacije(List<Rezervacija> rezervacije) {
		this.rezervacije = rezervacije;
	}
}
