package beans;

public class Lokacija {

	private double geoSirina;
	private double geoDuzina;
	private Adresa adresa;
	
	public Lokacija() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public Lokacija(double geoSirina, double geoDuzina, Adresa adresa) {
		super();
		this.geoSirina = geoSirina;
		this.geoDuzina = geoDuzina;
		this.adresa = adresa;
	}

	public double getGeoSirina() {
		return geoSirina;
	}

	public void setGeoSirina(double geoSirina) {
		this.geoSirina = geoSirina;
	}

	public double getGeoDuzina() {
		return geoDuzina;
	}

	public void setGeoDuzina(double geoDuzina) {
		this.geoDuzina = geoDuzina;
	}

	public Adresa getAdresa() {
		return adresa;
	}

	public void setAdresa(Adresa adresa) {
		this.adresa = adresa;
	}

	@Override
	public String toString() {
		return "Lokacija [geoSirina=" + geoSirina + ", geoDuzina=" + geoDuzina + ", adresa=" + adresa + "]";
	}
}
