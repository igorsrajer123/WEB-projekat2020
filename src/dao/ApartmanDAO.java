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
import beans.Apartman.Status;

public class ApartmanDAO {
	private ArrayList<Apartman> listaApartmana= new ArrayList<Apartman>();
	private String ctxPath;
	
	public ApartmanDAO(String ctx) {
		super();
		ctxPath = ctx;
		try {
			ucitajApartmane();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	
	
	public void dodajApartman(Apartman a) {
		listaApartmana.add(a);
	}
	
	public ArrayList<Apartman> getSveApartmane() {
		return listaApartmana;
	}
	
	public ArrayList<Apartman> getAktivne() {
		ArrayList<Apartman> app = new ArrayList<Apartman>();
		
		for(Apartman apartman : listaApartmana) {
			if(apartman.getStatus() == Status.Aktivno) {
				app.add(apartman);
			}
		}
		
		return app;
	}
	
	public void ucitajApartmane() throws FileNotFoundException, IOException {
		ObjectMapper mapper = new ObjectMapper();

		File file = new File(this.ctxPath + "data"+ java.io.File.separator +"apartmani.json");
		String json = ""; 
		String temp;
		try(BufferedReader br = new BufferedReader(new FileReader(file))){
			while ((temp = br.readLine()) != null) {
				json += temp;
			}
		}
		List<Apartman> list = mapper.readValue(json, 
			    new TypeReference<ArrayList<Apartman>>() {});
		
		this.listaApartmana.clear();
		for(Apartman ap: list) {
			this.listaApartmana.add(ap);
		}
	}

}
