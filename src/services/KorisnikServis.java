package services;

import java.util.ArrayList;
import java.util.List;

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

import beans.Domacin;
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
		
		//ako korisnik ne postoji
		if(!dao.postojiKorisnik(korisnicko_ime, lozinka)) 
			return Response.status(500).build();
					
		Korisnik k = dao.getOneKorisnik(korisnicko_ime);
		
		//ulogovan korisnik 
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
	
	@GET
	@Path("/getSveKorisnike")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Korisnik> getSveKorisnike(){
		
		KorisnikDAO dao = (KorisnikDAO) ctx.getAttribute("korisnikDAO");
		
		if(dao == null)
			return null;
		System.out.println(dao.getKorisnici());
		
		return dao.getKorisnici();		
	}
	
	@GET
	@Path("/pretraga/{korisnicko_ime}")
	@Produces(MediaType.APPLICATION_JSON)
	public Korisnik pretraziKorisnike(@PathParam("korisnicko_ime") String korIme){
		
		KorisnikDAO dao = (KorisnikDAO) ctx.getAttribute("korisnikDAO");
		
		if(dao == null)
			return null;
		
		Korisnik k = dao.getOneKorisnik(korIme);
		if(k == null) {
			System.out.println("Taj korisnik ne postoji!");
			 return null;
		}else {
			System.out.println("Korisnik pronadjen!");
			return k;
		}
	}
	
	@PUT
	@Path("/izmeni/{korisnicko_ime}/{lozinka}/{ime}/{prezime}/{pol}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Korisnik izmeniKorisnika(@PathParam("korisnicko_ime") String korIme, @PathParam("lozinka") String lozinka,
								@PathParam("ime") String ime, @PathParam("prezime") String prezime, @PathParam("pol") String pol) {
		
		KorisnikDAO dao = (KorisnikDAO) ctx.getAttribute("korisnikDAO");
		
		if(dao == null)
			return null;
		
		Korisnik k = dao.getOneKorisnik(korIme);
		
		k.setLozinka(lozinka);
		k.setIme(ime);
		k.setPrezime(prezime);
		k.setPol(pol);
		
		dao.sacuvajKorisnika();
	
		System.out.println("Korisnik uspesno izmenjen!");
		return k;
	}
	
	@PUT
	@Path("/azurirajUlogu/{korisnicko_ime}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response azurirajUlogu(@PathParam("korisnicko_ime") String korIme) {
		
		KorisnikDAO dao = (KorisnikDAO) ctx.getAttribute("korisnikDAO");
		
		if(dao == null)
			return Response.status(500).build();
		
		Domacin d = Domacin.Parse(dao.getOneKorisnik(korIme));
		dao.zameniKorisnika(d.getKorisnicko_ime(), d);
		
		dao.sacuvajKorisnika();
		
		return Response.ok().build();
	}
	
	@POST
	@Path("/registruj")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response registruj(Korisnik k, @Context HttpServletRequest req) {
		KorisnikDAO korisnici = (KorisnikDAO) ctx.getAttribute("korisnikDAO");
		System.out.println("KURCINAAA");
		
		if (korisnici == null) {
			System.out.println("KEPASAAAAAAAAAAAAAAa");
			return Response.status(500).build();
		}
		
		if (korisnici.postojiKorisnickoIme(k.getKorisnicko_ime())) {
			System.out.println("USAO SAM OVDEEEE");
			return Response.status(500).entity("Korisnicko ime").build();
		}
		
		
		Gost noviGost = new Gost(k);
		
		korisnici.dodajKorisnik(noviGost);
		korisnici.sacuvajKorisnika();
		
		req.getSession().setAttribute("korisnik", noviGost);
		System.out.println("Ulogovani korisnik: " + noviGost);
		
		System.out.println(noviGost.toString() + "DUPEEEEEEEEEEEE");
		
		return Response.ok().build();
		
		
		
	}
}
