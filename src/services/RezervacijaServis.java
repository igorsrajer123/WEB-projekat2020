package services;

import java.util.ArrayList;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServlet;
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

import beans.Apartman;
import beans.Domacin;
import beans.Gost;
import beans.Rezervacija;
import dao.ApartmanDAO;
import dao.KorisnikDAO;
import dao.RezervacijaDAO;

@Path("rezervacija")
public class RezervacijaServis {


	@Context
	ServletContext ctx;
	
	public RezervacijaServis() {
		super();
	}
	
	@PostConstruct
	public void init() {
		if(ctx.getAttribute("rezervacijaDAO") == null)
			ctx.setAttribute("rezervacijaDAO", new RezervacijaDAO(ctx.getRealPath("/")));
	}
	
	@POST
	@Path("/dodajRezervaciju/{idApartmana}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response dodajRezervaciju(Rezervacija r, @PathParam("idApartmana") String idAp, @Context HttpServletRequest rq) {
		
		RezervacijaDAO dao = (RezervacijaDAO) ctx.getAttribute("rezervacijaDAO");
		ApartmanDAO daoAp = (ApartmanDAO) ctx.getAttribute("apartmanDAO");
		KorisnikDAO daoKor = (KorisnikDAO) ctx.getAttribute("korisnikDAO");
		
		if(dao == null) {
			return Response.status(500).build();
		}
		
		if(daoAp == null) {
			System.out.println("Apartmani su null");
			return Response.status(500).build();
		}
		
		if(daoKor == null) {
			System.out.println("Korisnik je null");
			return Response.status(500).build();
		}
		
		Gost g = (Gost) rq.getSession().getAttribute("korisnik");
		System.out.println(g.getKorisnicko_ime() + "OVAJ LIK!!");
		System.out.println(r.toString());
		g.dodajRezervaciju(r);
		
		ArrayList<Apartman> lista = daoAp.getSveApartmane();
		for(Apartman a : lista) {
			if(a.getIdApartmana().equals(idAp)) {
				System.out.println(idAp);
				a.dodajRezervaciju(r);
				//break;
			}
		}
		
		dao.dodajRezervaciju(r);
		
		
		daoKor.sacuvajKorisnika();
		daoAp.sacuvajApartmane();
		dao.sacuvajRezervacije();
			
		System.out.println("REZERVACIJA KREIRANAA!!!");
		return Response.ok().build();
	}
	
	@GET
	@Path("/getSveRezervacije")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<Rezervacija> getSveRez(){
		
		RezervacijaDAO dao = (RezervacijaDAO) ctx.getAttribute("rezervacijaDAO");
		
		if(dao == null) 
			return null;
			
		ArrayList<Rezervacija> lista = dao.getSveRezervacije();
		//System.out.println(lista.toString());
		
		return lista;
	}
}
