package beans;

public class SadrzajApartmana {

	private int id;
	private String item;
	private Boolean uklonjen = false;
	
	public SadrzajApartmana() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public SadrzajApartmana(int id, String item, Boolean uklonjen) {
		super();
		this.id = id;
		this.item = item;
		this.uklonjen = uklonjen;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getItem() {
		return item;
	}

	public void setItem(String nazivItema) {
		this.item = nazivItema;
	}

	@Override
	public String toString() {
		return "SadrzajApartmana [id=" + id + ", nazivItema=" + item + ", uklonjen=" + uklonjen + "]";
	}

	public Boolean getUklonjen() {
		return uklonjen;
	}

	public void setUklonjen(Boolean uklonjen) {
		this.uklonjen = uklonjen;
	}
}
