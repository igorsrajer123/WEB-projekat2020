package services;

import java.util.ArrayList;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
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

import beans.SadrzajApartmana;
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
	public Response dodajItem(SadrzajApartmana s, @Context HttpServletRequest rq) {
		
		SadrzajApartmanaDAO dao = (SadrzajApartmanaDAO) ctx.getAttribute("sadrzajApartmanaDAO");
		
		if(dao == null)
			return Response.status(500).build();
		
		dao.dodajSadrzaj(s);
		dao.sacuvajSadrzajApartmana();
		System.out.println("Item dodat!");
		
		
		return Response.ok().build();
	}
}
