package beans;

public class Komentar {
	
	private Gost gost;
	private Apartman apartman;
	private String tekst;
	private double ocena;
	

	public Komentar() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public Komentar(Gost gost, Apartman apartman, String tekst, double ocena) {
		super();
		this.gost = gost;
		this.apartman = apartman;
		this.tekst = tekst;
		this.ocena = ocena;
	}

	public Gost getGost() {
		return gost;
	}

	public void setGost(Gost gost) {
		this.gost = gost;
	}

	public Apartman getApartman() {
		return apartman;
	}

	public void setApartman(Apartman apartman) {
		this.apartman = apartman;
	}

	public String getTekst() {
		return tekst;
	}

	public void setTekst(String tekst) {
		this.tekst = tekst;
	}

	public double getOcena() {
		return ocena;
	}

	public void setOcena(double ocena) {
		this.ocena = ocena;
	}

	@Override
	public String toString() {
		return "Komentar [gost=" + gost + ", apartman=" + apartman + ", tekst=" + tekst + ", ocena=" + ocena + "]";
	}
	
}
