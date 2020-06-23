package dao;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Administrator;
import beans.Korisnik;

public class KorisnikDAO {

	private HashMap<String, Korisnik> korisnici = new HashMap<String, Korisnik>();
	
	public static Administrator glavniAdmin;
	
	private String contextPath;
	
	public KorisnikDAO(String path) {	
		
		contextPath = path;
		
		try {
			loadUsers();
		}catch(IOException e) {
			e.printStackTrace();
		}		
		
		Administrator a = new Administrator("admin","admin","Pera","Peric","muski");
		korisnici.put(a.getKorisnicko_ime(), a);
		
		glavniAdmin = a;		
	}
	
	//dodaj korisnika
	public void dodajKorisnik(Korisnik korisnik) {
		korisnici.put(korisnik.getKorisnicko_ime(), korisnik);
		System.out.println(korisnik.toString() + " " + "dodat u listu korisnika!");
	}
	
	//da li korisnicko ime postoji?
	public boolean postojiKorisnickoIme(String korisnickoIme) {
		return korisnici.containsKey(korisnickoIme);
	}
	
	//da li postoji korisnik?
	public boolean postojiKorisnik(String korisnickoIme, String lozinka) {
		for(Korisnik korisnik : korisnici.values()) {
			if(korisnik.getKorisnicko_ime().equals(korisnickoIme) && korisnik.getLozinka().equals(lozinka)) {
				return true;
			}
		}
		return false;
	}
	
	//vraca korisnika sa zadatim korisnickim imenom
	public Korisnik getOneKorisnik(String ki) {
		
		Korisnik value = korisnici.get(ki);
		
		if(value != null) {
			return value;
		}else {
			return null;
		}
		
	}
	
	//vraca sve korisnike
	public List<Korisnik> getKorisnici(){
		
		List<Korisnik> lista = new ArrayList<Korisnik>();
		
		for(Korisnik k : korisnici.values()) {
			lista.add(k);
		}
		
		return lista;
	}
	
	//ucitavanje korisnika iz .json datoteka
	private void loadUsers() throws IOException {
		
		ObjectMapper mapper = new ObjectMapper();
		
		//zadajemo putanju do fajla iz kog citamo admina
		File file = new File(this.contextPath + "data" + java.io.File.separator + "admin.json");
		
		String json = ""; 
		String temp;
		
		//ukoliko fajl postoji, citaj iz njega
		if(file.exists()) {
			try(BufferedReader buffReader = new BufferedReader(new FileReader(file))){
				while ((temp = buffReader.readLine()) != null) {
					json += temp;
				}
			}	
			
			//procitane administratore smestamo u listu
			List<Administrator> admini = mapper.readValue(json,
							new TypeReference<ArrayList<Administrator>>() {});
			
			this.korisnici.clear();
			for(Administrator a : admini) {
				this.korisnici.put(a.getKorisnicko_ime(), a);
				System.out.println(a.toString());
			}
		}		
	}
	
	
	
}
