package services;

import java.util.ArrayList;


import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
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

}
