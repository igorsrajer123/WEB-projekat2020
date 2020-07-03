package beans;


import java.sql.Date;
import java.util.ArrayList;

import java.util.UUID;

public class Rezervacija {
	
	public enum Status {Kreirana, Odbijena, Odustanak, Prihvacena, Zavrsena}
	
	private String apartman;
	private Date pocetniDatum;
	private int brNocenja;
	private double ukCena;
	private String poruka;
	private String gost;
	private Status status;
	private ArrayList<Date> datumiRezervacije;
	
	private String idRezervacije = UUID.randomUUID().toString();
	
	public Rezervacija() {
		super();
		this.status = Status.Kreirana;
	}	
	
	public Rezervacija(String apartman, Date pocetniDatum, int brNocenja, double ukCena, String poruka, String gost,
			Status status, String idRez) {
		super();
		this.apartman = apartman;
		this.pocetniDatum = pocetniDatum;
		this.brNocenja = brNocenja;
		this.ukCena = ukCena;
		this.poruka = poruka;
		this.gost = gost;
		this.status = Status.Kreirana;
		this.idRezervacije = idRez;
	}

	public String getApartman() {
		return apartman;
	}

	public void setApartman(String apartman) {
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

	public String getGost() {
		return gost;
	}

	public void setGost(String gost) {
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
				+ ", ukCena=" + ukCena + ", poruka=" + poruka + ", gost=" + gost + ", status=" + status + ", idRezervacije=" + idRezervacije + "]";
	}

	public String getIdRezervacije() {
		return idRezervacije;
	}

	public void setIdRezervacije(String idRezervacije) {
		this.idRezervacije = idRezervacije;
	}

	public ArrayList<Date> getDatumiRezervacije() {
		return datumiRezervacije;
	}

	public void setDatumiRezervacije(ArrayList<Date> datumiRezervacije) {
		this.datumiRezervacije = datumiRezervacije;
	}
	
	
}
