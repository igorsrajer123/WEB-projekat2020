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
import beans.Domacin;
import beans.Gost;
import beans.Korisnik;
import beans.Korisnik.Uloga;

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
	public ArrayList<Korisnik> getKorisnici(){
		
		ArrayList<Korisnik> lista = new ArrayList<Korisnik>();
		
		for(Korisnik k : korisnici.values()) {
			lista.add(k);
		}
		
		return lista;
	}
	
	//kod zamene uloge
	public void zameniKorisnika(String korisnickoIme, Korisnik k)
	{
		korisnici.put(korisnickoIme, k);
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
			try(BufferedReader br = new BufferedReader(new FileReader(file))){
				while ((temp = br.readLine()) != null) {
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
		
		file = new File(this.contextPath + "data"+ java.io.File.separator +"domacini.json");
		json = "";
		
		if(file.exists()) {
			try(BufferedReader br = new BufferedReader(new FileReader(file))) { 
				while ((temp = br.readLine()) != null) {
					json += temp;
				}
			}
			
			ArrayList<Domacin> list3 = mapper.readValue(json, 
					new TypeReference<ArrayList<Domacin>>() {});
			
			for(Domacin domacin: list3) {
				this.korisnici.put(domacin.getKorisnicko_ime(), domacin);
				System.out.println(domacin.toString());
			}
				
		}
		
		file = new File(this.contextPath + "data"+ java.io.File.separator +"gosti.json");
		json = "";
		
		if(file.exists()) {
			try(BufferedReader br = new BufferedReader(new FileReader(file))) { 
				while ((temp = br.readLine()) != null) {
					json += temp;
				}
			}
			
			ArrayList<Gost> list2 = mapper.readValue(json, 
					new TypeReference<ArrayList<Gost>>() {});
			
			for(Gost gost: list2) {
				this.korisnici.put(gost.getKorisnicko_ime(), gost);
				System.out.println(gost.toString());
			}
				
		}
	}
	
	public void sacuvajKorisnika() {
		ObjectMapper mapper = new ObjectMapper();
		
		ArrayList<Gost> list = new ArrayList<Gost>();
		for (Korisnik korisnik: this.korisnici.values()) {
			if (korisnik.getUloga().equals(Uloga.Gost)) {
				list.add( (Gost)korisnik );
			}
		}
		File file = new File(this.contextPath + "data"+ java.io.File.separator +"gosti.json");
		try {
			mapper.writerWithDefaultPrettyPrinter().writeValue(file, list);
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		
		ArrayList<Domacin> list2 = new ArrayList<Domacin>();		
		for (Korisnik korisnik: this.korisnici.values()) {
			if (korisnik.getUloga().equals(Uloga.Domacin)) {
				list2.add((Domacin)korisnik );
			}
		}
		File file2 = new File(this.contextPath + "data"+ java.io.File.separator +"domacini.json");
		try {
			mapper.writerWithDefaultPrettyPrinter().writeValue(file2, list2);
		} catch (IOException e) {
			e.printStackTrace();
		}		
	}
}
