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

import beans.Komentar;
import beans.Rezervacija;

public class KomentarDAO {

	private ArrayList<Komentar> listaKomentara = new ArrayList<Komentar>();
	private String ctxPath;
	
	public KomentarDAO(String ctx) {
		super();
		ctxPath = ctx;
		try { 
			ucitajKomentare();
		}catch(IOException e) {
			e.printStackTrace();
		}	
	}
	
	public void dodajKomentar(Komentar k) {
		listaKomentara.add(k);
	}
	
	public ArrayList<Komentar> getSveKomentare(){
		return listaKomentara;
	}
	
	public void ucitajKomentare() throws FileNotFoundException, IOException{
		
		ObjectMapper mapper = new ObjectMapper();

		File file = new File(this.ctxPath + "data"+ java.io.File.separator +"komentari.json");
		String json = ""; 
		String temp;
		try(BufferedReader br = new BufferedReader(new FileReader(file))){
			while ((temp = br.readLine()) != null) {
				json += temp;
			}
		}
		
		List<Komentar> lista =  mapper.readValue(json, 
			    new TypeReference<ArrayList<Komentar>>() {});
		
		this.listaKomentara.clear();
		for(Komentar k : lista) {
			this.listaKomentara.add(k);
		}
	}
	
	public void sacuvajKomentare() { 
		
		ObjectMapper mapper = new ObjectMapper();
		File file = new File(this.ctxPath + "data"+ java.io.File.separator +"komentari.json");
		
		try {
			mapper.writerWithDefaultPrettyPrinter().writeValue(file, this.listaKomentara);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	
}
