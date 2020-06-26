package dao;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Apartman;
import beans.SadrzajApartmana;

public class SadrzajApartmanaDAO {

	private ArrayList<SadrzajApartmana> listaSadrzaja = new ArrayList<SadrzajApartmana>();
	private String ctxPath;
	
	public SadrzajApartmanaDAO(String ctx) {
		super();
		ctxPath = ctx;
		try {
			ucitajSadrzajApartmana();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public void dodajSadrzaj(SadrzajApartmana s) {
		this.listaSadrzaja.add(s);
	}
	
	public ArrayList<SadrzajApartmana> getCeoSadrzaj(){
		return listaSadrzaja;
	}
	
	public void ukloniStavku(int id) {
		for(SadrzajApartmana s : listaSadrzaja) {
			if(s.getId() == id) {
				s.setUklonjen(true);
				break;
			}
		}
	}
	
	//dobija stavku po njenom id-ju
	public SadrzajApartmana getStavku(int id) {
		for(SadrzajApartmana s : listaSadrzaja) {
			if(s.getId() == id) {
				return s;
			}
		}
		return null;
	}
	
	public void ucitajSadrzajApartmana() throws FileNotFoundException, IOException{
		ObjectMapper mapper = new ObjectMapper();

		File file = new File(this.ctxPath + "data"+ java.io.File.separator +"sadrzajApartmana.json");
		String json = ""; 
		String temp;
		try(BufferedReader br = new BufferedReader(new FileReader(file))){
			while ((temp = br.readLine()) != null) {
				json += temp;
			}
		}
		
		List<SadrzajApartmana> list = mapper.readValue(json, 
			    new TypeReference<ArrayList<SadrzajApartmana>>() {});
		
		this.listaSadrzaja.clear();
		for(SadrzajApartmana s : list) {
			this.listaSadrzaja.add(s);
		}
	}
	
	public void sacuvajSadrzajApartmana() {
		
		ObjectMapper mapper = new ObjectMapper();
		File file = new File(this.ctxPath + "data"+ java.io.File.separator +"sadrzajApartmana.json");
		
		try {
			mapper.writerWithDefaultPrettyPrinter().writeValue(file, this.listaSadrzaja);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
