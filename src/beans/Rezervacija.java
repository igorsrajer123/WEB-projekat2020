package beans;


import java.util.Date;

public class Rezervacija {
	
	public enum Status {Kreirana, Odbijena, Odustanak, Prihvacena, Zavrsena}
	
	private Apartman apartman;
	private Date pocetniDatum;
	private int brNocenja;
	private double ukCena;
	private String poruka;
	private Gost gost;
	private Status status;
	
	public Rezervacija() {
		super();
		this.status = Status.Kreirana;
	}	
	
	public Rezervacija(Apartman apartman, Date pocetniDatum, int brNocenja, double ukCena, String poruka, Gost gost,
			Status status) {
		super();
		this.apartman = apartman;
		this.pocetniDatum = pocetniDatum;
		this.brNocenja = brNocenja;
		this.ukCena = ukCena;
		this.poruka = poruka;
		this.gost = gost;
		this.status = Status.Kreirana;
	}

	public Apartman getApartman() {
		return apartman;
	}

	public void setApartman(Apartman apartman) {
		this.apartman = apartman;
	}

	public Date getPocetniDatum() {
		return pocetniDatum;
	}

	public void setPocetniDatum(Date pocetniDatum) {
		this.pocetniDatum = pocetniDatum;
	}

	public int getBrNocenja() {
		return brNocenja;
	}

	public void setBrNocenja(int brNocenja) {
		this.brNocenja = brNocenja;
	}

	public double getUkCena() {
		return ukCena;
	}

	public void setUkCena(double ukCena) {
		this.ukCena = ukCena;
	}

	public String getPoruka() {
		return poruka;
	}

	public void setPoruka(String poruka) {
		this.poruka = poruka;
	}

	public Gost getGost() {
		return gost;
	}

	public void setGost(Gost gost) {
		this.gost = gost;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}
	
	

	@Override
	public String toString() {
		return "Rezervacija [apartman=" + apartman + ", pocetniDatum=" + pocetniDatum + ", brNocenja=" + brNocenja
				+ ", ukCena=" + ukCena + ", poruka=" + poruka + ", gost=" + gost + ", status=" + status + "]";
	}
}
