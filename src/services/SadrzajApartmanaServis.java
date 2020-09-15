package services;

import java.util.ArrayList;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import beans.Apartman;
import beans.SadrzajApartmana;
import dao.ApartmanDAO;
import dao.SadrzajApartmanaDAO;

@Path("sadrzajApartmana")
public class SadrzajApartmanaServis {

	@Context
	ServletContext ctx;
	
	public SadrzajApartmanaServis() {
		super();
	}
	
	@PostConstruct
	public void init() {
		if(ctx.getAttribute("sadrzajApartmanaDAO") == null) 
			ctx.setAttribute("sadrzajApartmanaDAO", new SadrzajApartmanaDAO(ctx.getRealPath("/")));
	}
	
	@GET
	@Path("/getSavSadrzaj")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<SadrzajApartmana> getSavSadrzaj(){
		
		SadrzajApartmanaDAO dao = (SadrzajApartmanaDAO) ctx.getAttribute("sadrzajApartmanaDAO");
		
		System.out.println("Sadrzaj apartmana idemo!!");
		return dao.getCeoSadrzaj();
	}
	
	@POST
	@Path("/dodajSadrzaj")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response dodajItem(SadrzajApartmana s) {
		
		SadrzajApartmanaDAO dao = (SadrzajApartmanaDAO) ctx.getAttribute("sadrzajApartmanaDAO");
		
		if(dao == null)
			return Response.status(500).build();
		
		//zabranjuje ponavljanje ID-ja
		ArrayList<SadrzajApartmana> lista = dao.getCeoSadrzaj();
		for(SadrzajApartmana s1 : lista) {
			if(s1.getId() == s.getId()) {
				return Response.status(500).build();
			}
		}
		
		dao.dodajSadrzaj(s);
		dao.sacuvajSadrzajApartmana();
		System.out.println("Item dodat!");
		
		
		return Response.ok().build();
	}
	
	@PUT
	@Path("/ukloniSadrzaj/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response ukloniItem(@PathParam("id") int id) {
		
		SadrzajApartmanaDAO dao = (SadrzajApartmanaDAO) ctx.getAttribute("sadrzajApartmanaDAO");
		
		if(dao == null) {
			System.out.println("neradi!");
			return Response.status(500).build();
		}
		
		dao.ukloniStavku(id);	
		dao.sacuvajSadrzajApartmana();
		
		return Response.ok().build();
	}
	
	//menja sadrzaj 1 apartmana(salje se id apartmana)
	@PUT
	@Path("/izmeniSadrzaj/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response izmeniItem(SadrzajApartmana s, @PathParam("id") int id) {
		
		SadrzajApartmanaDAO dao = (SadrzajApartmanaDAO) ctx.getAttribute("sadrzajApartmanaDAO");
		
		if(dao == null) {
			return Response.status(500).build();
		}
		
		ArrayList<SadrzajApartmana> lista = dao.getCeoSadrzaj();
		
		for(SadrzajApartmana s1 : lista) {
			if(id == s1.getId()) {
				System.out.println(s1.toString());
				s1.setItem(s.getItem());
				System.out.println(s1.toString());
				break;
			}
		}
			
		dao.sacuvajSadrzajApartmana();
		return Response.ok().build();
	}
	
	@GET
	@Path("/getStavku/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public SadrzajApartmana getStavku(@PathParam("id") int id) {
		
		SadrzajApartmanaDAO dao = (SadrzajApartmanaDAO)ctx.getAttribute("sadrzajApartmanaDAO");
		
		if(dao == null)
			return null;
		
		SadrzajApartmana s = dao.getStavku(id);
		
		if(s != null) {
			return s;
		}else {
			return s;
		}
	}
	
	//prosledjujemo id apartmana od kog trazimo sadrzaj
	@GET
	@Path("/getSadrzajJednog/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<SadrzajApartmana> getSadrzajJednog(@PathParam("id") String id){

		ApartmanDAO dao = (ApartmanDAO) ctx.getAttribute("apartmanDAO");
		
		if(dao == null) 
			return null;
		
		Apartman a = dao.getPoIdApartmana(id);
		System.out.println("ID TRAZENOG APARTMANA: " + a.getIdApartmana());
		
		
		return a.getSadrzajAp();
	}
}
