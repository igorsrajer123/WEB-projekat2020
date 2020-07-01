package services;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import beans.Apartman;
import beans.Gost;
import beans.Komentar;
import dao.ApartmanDAO;
import dao.KomentarDAO;
import dao.KorisnikDAO;

@Path("komentar")
public class KomentarServis {

	@Context
	ServletContext ctx;
	
	public KomentarServis() {
		super();
	}
	
	@PostConstruct
	public void init() {
		if(ctx.getAttribute("komentarDAO") == null) {
			ctx.setAttribute("komentarDAO", new KomentarDAO(ctx.getRealPath("/")));
		}
	}
	
	@POST
	@Path("/dodajKomentar/{idApartmana}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response dodajKomentar(Komentar k, @PathParam("idApartmana") String idAp) {
		
		KomentarDAO dao = (KomentarDAO) ctx.getAttribute("komentarDAO");
		ApartmanDAO apartmaniDAO = (ApartmanDAO) ctx.getAttribute("apartmanDAO");
		KorisnikDAO korisniciDAO = (KorisnikDAO) ctx.getAttribute("korisnikDAO");
		
		//dodaj komentar u kontekst komentara
		dao.dodajKomentar(k);
		
		
		
		
		
		dao.sacuvajKomentare();
		
		System.out.println("Komentar uspesno kreiran!");
		return Response.ok().build();
	}
	
	
	
	
}
