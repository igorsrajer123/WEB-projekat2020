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

import beans.Rezervacija;

public class RezervacijaDAO {

	ArrayList<Rezervacija> listaRezervacija = new ArrayList<Rezervacija>();
	private String ctxPath;
	
	public  RezervacijaDAO(String ctx) {
		super();
		ctxPath = ctx;
		try {
			ucitajRezervacije();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public void dodajRezervaciju(Rezervacija r) {
		listaRezervacija.add(r);
	}
	
	public ArrayList<Rezervacija> getSveRezervacije(){
		return listaRezervacija;
	}
	
	public void ucitajRezervacije() throws FileNotFoundException, IOException{
		ObjectMapper mapper = new ObjectMapper();

		File file = new File(this.ctxPath + "data"+ java.io.File.separator +"rezervacije.json");
		String json = ""; 
		String temp;
		try(BufferedReader br = new BufferedReader(new FileReader(file))){
			while ((temp = br.readLine()) != null) {
				json += temp;
			}
		}
		
		List<Rezervacija> lista =  mapper.readValue(json, 
			    new TypeReference<ArrayList<Rezervacija>>() {});
		
		this.listaRezervacija.clear();
		for(Rezervacija r : lista) {
			this.listaRezervacija.add(r);
		}
	}
	
	public void sacuvajRezervacije() {
		
		ObjectMapper mapper = new ObjectMapper();
		File file = new File(this.ctxPath + "data"+ java.io.File.separator +"rezervacije.json");
		
		try {
			mapper.writerWithDefaultPrettyPrinter().writeValue(file, this.listaRezervacija);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
