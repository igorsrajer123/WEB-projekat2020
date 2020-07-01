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

import beans.Apartman;
import beans.Domacin;
import beans.Gost;
import beans.Korisnik;
import beans.Rezervacija;
import beans.Korisnik.Uloga;
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
		//treba da dodam rezervaciju, na domacinov tacno odredjen apartman sa nekim idjem
		
		//1.treba preko id apartmana da saznam kom domacinu on pripada
		//2.onda preko dao korisnici nadjem domacina 
		//3.onda pristupim njegovim apartmanima i dodam tamo na tacno odredjeni apartman sa idjem
		
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
		ArrayList<Korisnik> listaKorisnika = daoKor.getKorisnici();
		
		Apartman nasApartman = daoAp.getPoIdApartmana(idAp); // nas apartman po id smo nasli
		
		String domacinApartmana = nasApartman.getDomacin();
		Domacin dom = null;
		for(Korisnik k : listaKorisnika) {
			if(k.getKorisnicko_ime().equals(domacinApartmana)) {
				dom = (Domacin) k;
			}
		}
		
		System.out.println("Nadjeni korisnik: " + dom.toString()  + "AAAAAAAAAAAAAAAAAAAAAA");//ronaldo ispisuje
		Apartman korisnikovApartman = dom.getApartmanPoId(idAp);
		System.out.println(korisnikovApartman);
		korisnikovApartman.dodajRezervaciju(r);
		
		/*
		for(Apartman a : lista) {
			if(a.getIdApartmana().equals(idAp)) {
				System.out.println(idAp);
				a.dodajRezervaciju(r);
				System.out.println("Rezervacija dodata u apartman!");
				break;
			}
		}*/
		
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
		
		//postavljanje statusa ODUSTANAK kod domacina, u njegovoj listi apartmana
		Apartman nasApartman = daoAp.getPoIdApartmana(idAp); // nas apartman po id smo nasli
		
		String domacinApartmana = nasApartman.getDomacin();
		Domacin dom = null;
		for(Korisnik k : daoKor.getKorisnici()) {
			if(k.getKorisnicko_ime().equals(domacinApartmana)) {
				dom = (Domacin) k;
			}
		}
		
		Apartman korisnikovApartman = dom.getApartmanPoId(idAp);
		for(Rezervacija rez : korisnikovApartman.getRezervacije()) {
			if(rez.getIdRezervacije().equals(idRez)) {
				rez.setStatus(Status.Odustanak);
			}
		}
		
		//------------------------------------------------------------------------
		
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
			System.out.println("DEBUG: Domacinove rezervacije: " + a.getRezervacije());
		}
		
		for(Apartman a : listaAp) {
			if(a.getRezervacije() != null) {
				listaRez = a.getRezervacije();
				povratnaLista.addAll(listaRez);
				System.out.println("Povratna lista: " + povratnaLista);
			}else {
				System.out.println("Null lista rezervacija!");
				continue;			}
		}
		
		System.out.println("Domacinove rezervacije: " + povratnaLista);
		return povratnaLista;
	}
	
	@PUT
	@Path("/zavrsiRezervaciju/{idRezervacije}/{idApartmana}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response zavrsiRezervaciju(@PathParam("idRezervacije") String idRez, @PathParam("idApartmana") String idAp, @Context HttpServletRequest rq) {
		
		RezervacijaDAO rezervacijeDAO = (RezervacijaDAO) ctx.getAttribute("rezervacijaDAO");
		KorisnikDAO korisniciDAO = (KorisnikDAO) ctx.getAttribute("korisnikDAO");

		//izmena na kontekstu rezervacija
		ArrayList<Rezervacija> listaR = rezervacijeDAO.getSveRezervacije();

		for(Rezervacija r : listaR) {
			if(r.getIdRezervacije().equals(idRez)) {
				r.setStatus(Status.Zavrsena);
				System.out.println("IZMENJENO NA KONTEKSTU");
				break;
			}
		}
		
		//izmena kod gosta kome pripada rezervacija
		ArrayList<Korisnik> listaK = korisniciDAO.getKorisnici();
		ArrayList<Gost> listaGosti = new ArrayList<Gost>();
		
		Gost g = null;
		for(Korisnik k : listaK) {
			if(k.getUloga().equals(Uloga.Gost)) {
				g = (Gost) k;
				listaGosti.add(g);
			}
		}
		System.out.println("Lista gostiju: " + listaGosti);
		
		for(Gost g2 : listaGosti) {
			for(Rezervacija r2 : g2.getRezervacije()) {
				if(r2.getIdRezervacije().equals(idRez)) {
					r2.setStatus(Status.Zavrsena);
					System.out.println("Status rezervacije promenjen u: " + r2.getStatus());
					break;
				}
			}
		}
		
		//izmena kod domacina, u njegovom apartmanu(sa sesije ga uzimamo)
		Domacin d = (Domacin) rq.getSession().getAttribute("korisnik");

		Apartman apDomacina = d.getApartmanPoId(idAp);
		
		ArrayList<Rezervacija> rez = apDomacina.getRezervacije();
		
		for(Rezervacija r : rez) {
			if(r.getIdRezervacije().equals(idRez)) {
				r.setStatus(Status.Zavrsena);
			}
		}
		
		rezervacijeDAO.sacuvajRezervacije();
		korisniciDAO.sacuvajKorisnika();
		
		return Response.ok().build();
	}
}
