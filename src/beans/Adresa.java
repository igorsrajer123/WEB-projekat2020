package beans;

public class Adresa {

	private String ulicaIBroj;
	private String naseljenoMesto;
	private String postanskiBrMesta;
	
	public Adresa() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public Adresa(String ulicaIBroj, String naseljenoMesto, String postanskiBrMesta) {
		super();
		this.ulicaIBroj = ulicaIBroj;
		this.naseljenoMesto = naseljenoMesto;
		this.postanskiBrMesta = postanskiBrMesta;
	}

	public String getUlicaIBroj() {
		return ulicaIBroj;
	}

	public void setUlicaIBroj(String ulicaIBroj) {
		this.ulicaIBroj = ulicaIBroj;
	}

	public String getNaseljenoMesto() {
		return naseljenoMesto;
	}

	public void setNaseljenoMesto(String naseljenoMesto) {
		this.naseljenoMesto = naseljenoMesto;
	}

	public String getPostanskiBrMesta() {
		return postanskiBrMesta;
	}

	public void setPostanskiBrMesta(String postanskiBrMesta) {
		this.postanskiBrMesta = postanskiBrMesta;
	}

	@Override
	public String toString() {
		return "Adresa [ulicaIBroj=" + ulicaIBroj + ", naseljenoMesto=" + naseljenoMesto + ", postanskiBrMesta="
				+ postanskiBrMesta + "]";
	}
}
