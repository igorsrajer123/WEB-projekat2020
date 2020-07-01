package services;

import java.util.ArrayList;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
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
import beans.Komentar;
import beans.Korisnik;
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
			System.out.println("Nema komentara!!!!");
			return null;
		}
		
		ArrayList<Komentar> listaKomentara = new ArrayList<Komentar>();
		
		Apartman a = apartmani.getPoIdApartmana(idAp);
		for(Komentar k : a.getKomentari()) {
			if(k.isKomentarVidljiv()) {
				listaKomentara.add(k);
			}
		}
		
		System.out.println("Komentari apartmana pronadjeni!");
		return listaKomentara;
	}
	
	
	
}
