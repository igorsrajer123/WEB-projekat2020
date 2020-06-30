package services;

import java.util.ArrayList;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServlet;
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

import beans.Apartman;
import beans.Domacin;
import beans.Gost;
import beans.Rezervacija;
import beans.Rezervacija.Status;
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
		
		dao.dodajRezervaciju(r);
		
		Gost g = (Gost) rq.getSession().getAttribute("korisnik");
		System.out.println(g.getKorisnicko_ime() + "OVAJ LIK!!");
		System.out.println(r.toString());
		g.dodajRezervaciju(r);
		
		ArrayList<Apartman> lista = daoAp.getSveApartmane();
		for(Apartman a : lista) {
			if(a.getIdApartmana().equals(idAp)) {
				System.out.println(idAp);
				a.dodajRezervaciju(r);
				break;
			}
		}
		
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
	
	@PUT
	@Path("/odustanakOdRezervacije/{idRezervacije}/{idApartmana}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response odustaniOdRezervacije(@PathParam("idRezervacije") String idRez, @PathParam("idApartmana") String idAp, @Context HttpServletRequest rq) {
		
		RezervacijaDAO dao = (RezervacijaDAO) ctx.getAttribute("rezervacijaDAO");
		KorisnikDAO daoKor = (KorisnikDAO) ctx.getAttribute("korisnikDAO");
		ApartmanDAO daoAp = (ApartmanDAO) ctx.getAttribute("apartmanDAO");
		
		Gost g = (Gost) rq.getSession().getAttribute("korisnik");
		g.setOdustanak(idRez);
		
		if(dao == null) {
			System.out.println("NULL REZERVACIJE!");
			return Response.status(500).build();
		}
		
		ArrayList<Rezervacija> lista = dao.getSveRezervacije();
		ArrayList<Apartman> listaAp = daoAp.getSveApartmane();
		
		for(Apartman a : listaAp) {
			if(a.getIdApartmana().equals(idAp)) {
				a.setOdustanak(idRez);
				break;
			}
		}
		
		for(Rezervacija r : lista) {
			if(r.getIdRezervacije().equals(idRez)) {
				r.setStatus(Status.Odustanak);
				break;
			}
		}
		
		dao.sacuvajRezervacije();
		daoKor.sacuvajKorisnika();
		daoAp.sacuvajApartmane();
		
		System.out.println("Odustanak uspesan!");
		return Response.ok().build();
	}
	
	@GET
	@Path("/getRezervacijeDomacina")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<Rezervacija> getRezervacijeDomacina(@Context HttpServletRequest rq){
		
		//RezervacijaDAO dao = (RezervacijaDAO) ctx.getAttribute("rezervacijaDAO");

		Domacin d = (Domacin) rq.getSession().getAttribute("korisnik");
		
		ArrayList<Apartman> listaAp = d.getApartmani();
		ArrayList<Rezervacija> listaRez = new ArrayList<Rezervacija>();
		ArrayList<Rezervacija> povratnaLista = new ArrayList<Rezervacija>();
		
		for(Apartman a : listaAp) {
			if(a.getRezervacije() != null) {
				listaRez = a.getRezervacije();
				povratnaLista.addAll(listaRez);
			}else {
				continue;
			}
		}
		
		System.out.println("Domacinove rezervacije: " + povratnaLista);
		return povratnaLista;
	}
}
