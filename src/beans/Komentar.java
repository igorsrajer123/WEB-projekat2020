package beans;

import java.util.UUID;

public class Komentar {
	
	private String gost;
	private String apartman;
	private String tekst;
	private double ocena;
	private boolean komentarVidljiv = true;
	private String idKomentara = UUID.randomUUID().toString();

	public Komentar() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public Komentar(String gost, String apartman, String tekst, double ocena, boolean vidljiv, String id) {
		super();
		this.gost = gost;
		this.apartman = apartman;
		this.tekst = tekst;
		this.ocena = ocena;
		this.komentarVidljiv = vidljiv;
		this.idKomentara = id;
	}

	public String getGost() {
		return gost;
	}

	public void setGost(String gost) {
		this.gost = gost;
	}

	public String getApartman() {
		return apartman;
	}

	public void setApartman(String apartman) {
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
		return "Komentar [gost=" + gost + ", apartman=" + apartman + ", tekst=" + tekst + ", ocena=" + ocena + ", vidljiv= " + komentarVidljiv + ", idKomentara= " + idKomentara + "]";
	}

	public boolean isKomentarVidljiv() {
		return komentarVidljiv;
	}

	public void setKomentarVidljiv(boolean komentarVidljiv) {
		this.komentarVidljiv = komentarVidljiv;
	}

	public String getIdKomentara() {
		return idKomentara;
	}

	public void setIdKomentara(String idKomentara) {
		this.idKomentara = idKomentara;
	}
	
}
