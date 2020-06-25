package services;

import java.util.ArrayList;


import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.Apartman;
import dao.ApartmanDAO;

@Path("apartman")
public class ApartmanServis {
	
	@Context
	ServletContext ctx;
	
	public ApartmanServis() {
		super();
	}
	
	@PostConstruct
	public void init() {
		if(ctx.getAttribute("apartmanDAO") == null)
			ctx.setAttribute("apartmanDAO", new ApartmanDAO(ctx.getRealPath("/")));
	}
	
	@GET
	@Path("/getSveApartmane")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<Apartman> getSveApartmane(){
		
		ApartmanDAO dao = (ApartmanDAO) ctx.getAttribute("apartmanDAO");
		
		System.out.println(dao.getSveApartmane() + "SVISSSSSSSSSSSSSSSSSSSSSS");
		return dao.getSveApartmane();
		
	}
	
	@GET
	@Path("/getAktivneApartmane")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<Apartman> getAktivneApartmane() {
		ApartmanDAO dao = (ApartmanDAO) ctx.getAttribute("apartmanDAO");
		
		System.out.println(dao.getAktivne() + "AKTIVNIIIIIIIIIIIAAAAAAAAAAAAAAAAAA");
		return dao.getAktivne();
	}
	
	//vraca aktivne apartmane
	@GET
	@Path("/pretragaTip/{tip}")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<Apartman> getTipApartmana(@PathParam("tip") String tip){
		 
		ApartmanDAO dao = (ApartmanDAO) ctx.getAttribute("apartmanDAO");
		
		if(dao == null)
			return null;
		
		ArrayList<Apartman> listaApartmana = dao.getPoTipuApartmana(tip);
		
		if(listaApartmana.isEmpty()) {
			System.out.println("Lista apartmana prazna!");
			return null;
		}else {
			System.out.println("Apartmani pronadjeni!");
			return listaApartmana;
		}
	}
	
	//vraca aktivne apartmane
	@GET
	@Path("/pretragaSobe/{brSoba}")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<Apartman> getPoBrSoba(@PathParam("brSoba") int brSoba){
		
		ApartmanDAO dao = (ApartmanDAO) ctx.getAttribute("apartmanDAO");
		
		if(dao == null) 
			return null;
		
		ArrayList<Apartman> listaApartmana = dao.getPoBrojuSoba(brSoba);
		
		if(listaApartmana.isEmpty()) {
			System.out.println("Lista apartmana prazna!");
			return null;
		}else {
			System.out.println("Apartmani pronadjeni!");
			return listaApartmana;
		}
	}
	
	//vraca aktivne apartmane
	@GET
	@Path("/pretragaGosti/{brGostiju}")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<Apartman> getPoBrGostiju(@PathParam("brGostiju") int brGostiju){
		
		ApartmanDAO dao = (ApartmanDAO) ctx.getAttribute("apartmanDAO");
		
		if(dao == null) 
			return null;
		
		ArrayList<Apartman> listaApartmana = dao.getPoBrojuGostiju(brGostiju);
		
		if(listaApartmana.isEmpty()) {
			System.out.println("Lista apartmana prazna!");
			return null;
		}else {
			System.out.println("Apartmani pronadjeni!");
			return listaApartmana;
		}
	}
	
	//vraca aktivne apartmane
	@GET
	@Path("/pretraga/{tip}/{brSoba}/{brGostiju}")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<Apartman> getPoParametrima(@PathParam("tip") String tip, @PathParam("brSoba") int brSoba, @PathParam("brGostiju") int brGostiju){
		
		ApartmanDAO dao = (ApartmanDAO) ctx.getAttribute("apartmanDAO");
		
		ArrayList<Apartman> listaApartmana = dao.getPoTipuApartmana(tip);
		
		ArrayList<Apartman> listaApartmana2 =  dao.getPoBrojuSoba(brSoba);
		
		ArrayList<Apartman> listaApartmana3 = dao.getPoBrojuGostiju(brGostiju);
		
		listaApartmana.retainAll(listaApartmana2);
		listaApartmana.retainAll(listaApartmana3);
		
		if(listaApartmana.isEmpty()) {
			System.out.println("Lista apartmana prazna!");
			return null;
		}else {
			System.out.println("Apartmani pronadjeni!");
			return listaApartmana;
		}
	}
	
	//vraca aktivne i NEAKTIVNE apartmane
	@GET
	@Path("/pretragaSvih/{tip}/{brSoba}/{brGostiju}")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<Apartman> getSvePoParametrima(@PathParam("tip") String tip, @PathParam("brSoba") int brSoba, @PathParam("brGostiju") int brGostiju){
		
		ApartmanDAO dao = (ApartmanDAO) ctx.getAttribute("apartmanDAO");
		
		ArrayList<Apartman> listaApartmana = dao.getPoTipuSveApartmane(tip);
		
		ArrayList<Apartman> listaApartmana2 = dao.getPoBrojuSobaSve(brSoba);
		
		ArrayList<Apartman> listaApartmana3 = dao.getPoBrojuGostijuSve(brGostiju);
		
		listaApartmana.retainAll(listaApartmana2);
		listaApartmana.retainAll(listaApartmana3);
		
		if(listaApartmana.isEmpty()) {
			System.out.println("Lista apartmana prazna!");
			return null;
		}else {
			System.out.println("Apartmani pronadjeni!");
			return listaApartmana;
		}
	}
}
