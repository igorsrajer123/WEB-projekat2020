package services;

import java.util.ArrayList;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
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
import beans.Komentar;
import beans.Korisnik;
import beans.Rezervacija;
import beans.Rezervacija.Status;
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
		
		//dodaj komentar apartmanu kom je namenjen u listu apartmana
		Apartman a = apartmaniDAO.getPoIdApartmana(idAp);
		a.dodajKomentar(k);
		
		//dodaj komentar u apartman kod domacina
		String korImeDomacina = a.getDomacin();
		Korisnik kor = korisniciDAO.getOneKorisnik(korImeDomacina);
		System.out.println("Korisnicko ime domacina apartmana na kom je komentar: " + korImeDomacina);
		
		Domacin d = (Domacin) kor;
		
		(d.getApartmanPoId(idAp)).dodajKomentar(k);
			
		dao.sacuvajKomentare();
		apartmaniDAO.sacuvajApartmane();
		korisniciDAO.sacuvajKorisnika();
		
		System.out.println("Komentar uspesno kreiran!");
		return Response.ok().build();
	}
	
	@GET
	@Path("/getSveKomentare")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<Komentar> getSveKomentare(){
		
		KomentarDAO dao = (KomentarDAO) ctx.getAttribute("komentarDAO");
		
		if(dao == null){
			System.out.println("Komentari prazni!");
			return null;
		}
		
		ArrayList<Komentar> lista = dao.getSveKomentare();
		
		return lista;
	}
	
	@GET
	@Path("/getKomentareApartmana/{idApartmana}")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<Komentar> getKomentareApartmana(@PathParam("idApartmana") String idAp){
		
		KomentarDAO komentari = (KomentarDAO) ctx.getAttribute("komentarDAO");
		ApartmanDAO apartmani = (ApartmanDAO) ctx.getAttribute("apartmanDAO");
		
		if(komentari == null) {
			System.out.println("Nema komentara!");
			return null;
		}
		
		ArrayList<Komentar> listaKomentara = new ArrayList<Komentar>();
		
		Apartman a = null;
		for(Apartman aa : apartmani.getSveApartmane()) {
			if (aa.getIdApartmana().equals(idAp)) {
				a = aa;
			}
		}

		for(Komentar k : a.getKomentari()) {
			if(a.getKomentari() != null) {
				if(k.isKomentarVidljiv()) {
					listaKomentara.add(k);
				}
			}
		}
		
		System.out.println("Komentari apartmana pronadjeni!");
		return listaKomentara;
	}
	
	@GET
	@Path("/getKomentareMogApartmana/{idApartmana}")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<Komentar> getKomentareMogApartmana(@PathParam("idApartmana") String idAp, @Context HttpServletRequest rq){
		
		Domacin d = (Domacin) rq.getSession().getAttribute("korisnik");
		Apartman a = d.getApartmanPoId(idAp);
		
		ArrayList<Komentar> lista = new ArrayList<Komentar>();
		
		for(Komentar k : a.getKomentari()){
			lista.add(k);
		}
		
		return lista;
	}
	
	@PUT
	@Path("/setVidljivost/{idKomentara}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response setVidljivost(@PathParam("idKomentara") String idKom, @Context HttpServletRequest rq) {
		
		KomentarDAO komentari = (KomentarDAO) ctx.getAttribute("komentarDAO");
		ApartmanDAO apartmani = (ApartmanDAO) ctx.getAttribute("apartmanDAO");
		
		ArrayList<Komentar> lista = komentari.getSveKomentare();
		
		//izmena komentara na kontekstu
		for(Komentar k : lista) {
			if(k.getIdKomentara().equals(idKom)) {
				if(k.isKomentarVidljiv()) {
					k.setKomentarVidljiv(false);
				}else if(!k.isKomentarVidljiv()) {
					k.setKomentarVidljiv(true);
				}
			}
		}
		
		//izmena kod korisnika u njegovom apartmanu
		Domacin d = (Domacin) rq.getSession().getAttribute("korisnik");
		
		ArrayList<Apartman> korisnikoviApartmani =  d.getApartmani();
		ArrayList<Komentar> korisnikoviKomentari = new ArrayList<Komentar>();
		
		for(Apartman ap : korisnikoviApartmani) {
			korisnikoviKomentari.addAll(ap.getKomentari());
		}
		
		for(Komentar k : korisnikoviKomentari) {
			if(k.getIdKomentara().equals(idKom)) {
				if(k.isKomentarVidljiv()) {
					k.setKomentarVidljiv(false);
				}else if(!k.isKomentarVidljiv()) {
					k.setKomentarVidljiv(true);
				}
			}
		}
		
		//izmena u tacno odredjenom apartmanu na kontekstu u kom se nalazi
		ArrayList<Apartman> novaLista = apartmani.getSveApartmane();
		ArrayList<Komentar> komentariLista = new ArrayList<Komentar>();
		
		for(Apartman a : novaLista) {
			komentariLista.addAll(a.getKomentari());
		}
		
		for(Komentar kom : komentariLista) {
			if(kom.getIdKomentara().equals(idKom)) {
				if(kom.isKomentarVidljiv()) {
					kom.setKomentarVidljiv(false);
				}else if(!kom.isKomentarVidljiv()) {
					kom.setKomentarVidljiv(true);
				}
			}
		}
		
		komentari.sacuvajKomentare();
		apartmani.sacuvajApartmane();
		
		return Response.ok().build();
	}
	
	@GET
	@Path("/moguceOstavitiKomentarApartmani")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<Apartman> moguceOstavitiKomentar(@Context HttpServletRequest rq) {
		
		ApartmanDAO apartmani = (ApartmanDAO) ctx.getAttribute("apartmanDAO");
		
		Gost g = (Gost) rq.getSession().getAttribute("korisnik");
		
		ArrayList<Rezervacija> gostoveRezervacije = g.getRezervacije();
		ArrayList<Rezervacija> rezervacijeKojeTrazimo = new ArrayList<Rezervacija>();
		
		for(Rezervacija r : gostoveRezervacije) {
			if(r.getStatus() == Status.Odbijena || r.getStatus() == Status.Zavrsena) {
				rezervacijeKojeTrazimo.add(r);
			}
		}
		
		ArrayList<Apartman> lista = apartmani.getAktivne();
		ArrayList<Apartman> apartmaniKojeTrazimo = new ArrayList<Apartman>();
		ArrayList<String> idApartmana = new  ArrayList<String>();
		
		for(Rezervacija r : rezervacijeKojeTrazimo) {
			idApartmana.add(r.getApartman());
		}
		
		for(Apartman a : lista) {
			for(String id : idApartmana) {
				if(id.equals(a.getIdApartmana()) && !apartmaniKojeTrazimo.contains(a)) {
					apartmaniKojeTrazimo.add(a);
				}
			}
		}
		
		System.out.println("------------------------------ : " + apartmaniKojeTrazimo);
		return apartmaniKojeTrazimo;
	}
}
