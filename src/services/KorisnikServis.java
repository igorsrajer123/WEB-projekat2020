package services;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import beans.Gost;
import beans.Korisnik;
import dao.KorisnikDAO;

@Path("korisnik")
public class KorisnikServis {

	@Context
	ServletContext ctx;
	
	public KorisnikServis() {
		super();
	}
	
	@PostConstruct
	public void init() {
		if(ctx.getAttribute("korisnikDAO") == null)
			ctx.setAttribute("korisnikDAO", new KorisnikDAO(ctx.getRealPath("/")));
	}
	
	@POST
	@Path("/login/{korisnicko_ime}/{lozinka}")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response login(@PathParam("korisnicko_ime") String korisnicko_ime, @PathParam("lozinka") String lozinka, @Context HttpServletRequest req) {
		
		KorisnikDAO dao = (KorisnikDAO) ctx.getAttribute("korisnikDAO");
		
		if(dao == null)
			return Response.status(500).build();
		
		if(req.getSession().getAttribute("korisnik") != null)
			req.getSession().invalidate();
		
		Korisnik k = dao.getOneKorisnik(korisnicko_ime);
		
		req.getSession().setAttribute("korisnik", k);
		System.out.println("Ulogovani korisnik: " + k);
		
		
		return Response.ok().build();
	}
	
	@POST
	@Path("/logout")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response logout(@Context HttpServletRequest req) {
		
		req.getSession().invalidate();
		System.out.println("Korisnik uspesno izlogovan!");
		
		return Response.ok().build();
	}
	
	@GET
	@Path("/getKorisnik")
	@Produces(MediaType.APPLICATION_JSON)
	public Korisnik getTrenutniKorisnik(@Context HttpServletRequest req) {

		if(req.getSession(false) == null) {
			System.out.println("session false");
			return null;
		}
		
		Korisnik k = (Korisnik) req.getSession(false).getAttribute("korisnik");
		System.out.println("Trenutni korisnik: " + k);
		return k;
	}
	
	@POST
	@Path("/registruj")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response registruj(Korisnik k) {
		KorisnikDAO korisnici = (KorisnikDAO) ctx.getAttribute("korisnikDAO");
		
		if (korisnici == null) {
			return Response.status(500).build();
		}
		
		if (korisnici.postojiKorisnickoIme(k.getKorisnicko_ime())) {
			return Response.status(400).entity("Korisnicko ime").build();
		}
		
		Gost noviGost = new Gost(k);
		
		korisnici.dodajKorisnik(noviGost);
		System.out.println(korisnici.getKorisnici());
		
		return Response.ok().build();
		
		
		
	}
}
