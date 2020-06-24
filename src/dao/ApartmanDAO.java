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

public class ApartmanDAO {
	private ArrayList<Apartman> listaApartmana= new ArrayList<Apartman>();
	private String ctxPath;
	
	public ApartmanDAO(String ctx) {
		super();
		ctxPath = ctx;
		try {
			ucitajApartmane();
			System.out.println(listaApartmana);
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
			System.out.println(ap.toString());
			this.listaApartmana.add(ap);
		}
	}

}
