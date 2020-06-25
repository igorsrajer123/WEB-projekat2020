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
import beans.Gost;
import beans.Korisnik;
import beans.Apartman.Status;
import beans.Korisnik.Uloga;

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
	
	public void ukloniPoIdApartmana(String s) {
		for(Apartman a : listaApartmana) {
			if(a.getIdApartmana().equals(s)) {
				a.setUklonjen(true);
				a.setStatus(Status.Neaktivno);
				break;
			}
		}
	}
	
	//vraca Aktivni apartman po idju
	public Apartman getPoIdApartmana(String s) {
		
		ArrayList<Apartman> aktivni = getAktivne();
		
		for(Apartman a : aktivni) {
			if(a.getIdApartmana().contentEquals(s)) {
				return a;
			}
		}
		
		return null;
	}
	
	//vraca bilo aktivni ili neaktivni apartman po idju
	public Apartman getPoIdSve(String s) {
		for(Apartman a : listaApartmana) {
			if(a.getIdApartmana().contentEquals(s)) {
				return a;
			}
		}
		
		return null;
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
	
	//vraca aktivne apartmane po tipu
	public ArrayList<Apartman> getPoTipuApartmana(String tip){
		String soba = Apartman.Tip.Soba.name();
		String ceoAp = Apartman.Tip.Ceo_apartman.name();
		
		ArrayList<Apartman> listaSobe = new ArrayList<Apartman>();
		ArrayList<Apartman> listaCelihAp = new ArrayList<Apartman>();
		ArrayList<Apartman> aktivni = getAktivne();
		
		for(Apartman a : aktivni) {
			if(a.getTip().name().equals(soba)) {
				listaSobe.add(a);
			}else if(a.getTip().name().equals(ceoAp)) {
				listaCelihAp.add(a);
			}
		}
		
		if(tip.equals(soba)) {
			return listaSobe;
		}else if(tip.equals(ceoAp)) {
			return listaCelihAp;
		}else {
			return null;
		}
	}
	
	//vraca aktivne apartmane po broju soba
	public ArrayList<Apartman> getPoBrojuSoba(int brSoba){
		
		ArrayList<Apartman> lista = new ArrayList<Apartman>();
		ArrayList<Apartman> aktivni = getAktivne();
		
		for(Apartman a : aktivni) {
			if(a.getBrSoba() == brSoba) {
				lista.add(a);
			}
		}
		
		return lista;
	}
	
	//vraca aktivne apartmane po broju gostiju
	public ArrayList<Apartman> getPoBrojuGostiju(int brGostiju){
		
		ArrayList<Apartman> lista = new ArrayList<Apartman>();
		ArrayList<Apartman> aktivni = getAktivne();
		
		for(Apartman a : aktivni) {
			if(a.getBrGostiju() == brGostiju) {
				lista.add(a);
			}
		}
		return lista;
	}
	
	//vraca SVE apartmane po tipu
	public ArrayList<Apartman> getPoTipuSveApartmane(String tip){
		String soba = Apartman.Tip.Soba.name();
		String ceoAp = Apartman.Tip.Ceo_apartman.name();
		
		ArrayList<Apartman> listaSobe = new ArrayList<Apartman>();
		ArrayList<Apartman> listaCelihAp = new ArrayList<Apartman>();
		
		for(Apartman a : listaApartmana) {
			if(a.getTip().name().equals(soba)) {
				listaSobe.add(a);
			}else if(a.getTip().name().equals(ceoAp)) {
				listaCelihAp.add(a);
			}
		}
		
		if(tip.equals(soba)) {
			return listaSobe;
		}else if(tip.equals(ceoAp)) {
			return listaCelihAp;
		}else {
			return null;
		}
	}
	
	//vraca SVE apartmane po br soba
	public ArrayList<Apartman> getPoBrojuSobaSve(int brSoba){
		
		ArrayList<Apartman> lista = new ArrayList<Apartman>();
		
		for(Apartman a : listaApartmana) {
			if(a.getBrSoba() == brSoba) {
				lista.add(a);
			}
		}
		
		return lista;
	}
	
	//vraca SVE apartmane po br gostiju
	public ArrayList<Apartman> getPoBrojuGostijuSve(int brGostiju){
		
		ArrayList<Apartman> lista = new ArrayList<Apartman>();
		
		for(Apartman a : listaApartmana) {
			if(a.getBrGostiju() == brGostiju) {
				lista.add(a);
			}
		}
		return lista;
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
	
	public void sacuvajApartmane()
	{
		ObjectMapper mapper = new ObjectMapper();
		File file = new File(this.ctxPath + "data"+ java.io.File.separator +"apartmani.json");
		try {
			mapper.writerWithDefaultPrettyPrinter().writeValue(file, this.listaApartmana);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

}
