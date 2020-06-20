package beans;

import java.util.ArrayList;
import java.util.List;

public class SadrzajApartmana {

	private int id;
	private List<String> sadrzaj = new ArrayList<String>();
	
	public SadrzajApartmana() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public SadrzajApartmana(int id, List<String> sadrzaj) {
		super();
		this.id = id;
		this.sadrzaj = sadrzaj;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public List<String> getSadrzaj() {
		return sadrzaj;
	}

	public void setSadrzaj(List<String> sadrzaj) {
		this.sadrzaj = sadrzaj;
	}

	@Override
	public String toString() {
		return "SadrzajApartmana [id=" + id + ", sadrzaj=" + sadrzaj + "]";
	}
}
