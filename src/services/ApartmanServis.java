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
import beans.Korisnik;
import dao.ApartmanDAO;
import dao.KorisnikDAO;

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
		
		return dao.getSveApartmane();
		
	}
	
	//vraca aktivan apartman po idju
	@GET
	@Path("/getApartman/{idApartmana}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Apartman getApartman(@PathParam("idApartmana") String id) {
		
		ApartmanDAO dao = (ApartmanDAO) ctx.getAttribute("apartmanDAO");
	
		if(dao == null) 
			return null;
		
		Apartman a = dao.getPoIdApartmana(id);
		
		if(a != null) {
			return a;
		}else {
			return null;
		}
	}
	
	
	//vraca bilo aktivan ili neaktivan apartman po idju
	@GET
	@Path("/getBiloKojiApartman/{idApartmana}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Apartman getPoIdApartman(@PathParam("idApartmana") String id) {
		
		ApartmanDAO dao = (ApartmanDAO) ctx.getAttribute("apartmanDAO");
	
		if(dao == null) 
			return null;
		
		Apartman a = dao.getPoIdSve(id);
		
		if(a != null) {
			return a;
		}else {
			return null;
		}
	}
	
	@GET
	@Path("/getAktivneApartmane")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<Apartman> getAktivneApartmane() {
		ApartmanDAO dao = (ApartmanDAO) ctx.getAttribute("apartmanDAO");
		
		return dao.getAktivne();
	}
	@GET
	@Path("/getApartmaneDomacina")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<Apartman> getApartmaneDomacina(@Context HttpServletRequest rq) {
		
		Domacin d = (Domacin) rq.getSession().getAttribute("korisnik");
		
		ApartmanDAO dao = (ApartmanDAO) ctx.getAttribute("apartmanDAO");
		
		ArrayList<Apartman> lista = dao.getSveApartmane();
		ArrayList<Apartman> listaPunilacka = new ArrayList<Apartman>();
		
		for(Apartman a : lista) {
			if(a.getDomacin().equals(d.getKorisnicko_ime())) {
				listaPunilacka.add(a);
			}
		}
		
		return listaPunilacka;
	}
	
	//vraca aktivne apartmane
	@GET
	@Path("/pretragaTip/{tip}")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<Apartman> getTipApartmana(@PathParam("tip") String tip){
		 
		ApartmanDAO dao = (ApartmanDAO) ctx.getAttribute("apartmanDAO");
		
		if(dao == null)
			return null;
		
		ArrayList<Apartman> listaApartmana = dao.getPoTipuApartmana(tip);
		
		if(listaApartmana.isEmpty()) {
			System.out.println("Lista apartmana prazna!");
			return null;
		}else {
			System.out.println("Apartmani pronadjeni!");
			return listaApartmana;
		}
	}
	
	//vraca aktivne apartmane
	@GET
	@Path("/pretragaSobe/{brSoba}")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<Apartman> getPoBrSoba(@PathParam("brSoba") int brSoba){
		
		ApartmanDAO dao = (ApartmanDAO) ctx.getAttribute("apartmanDAO");
		
		if(dao == null) 
			return null;
		
		ArrayList<Apartman> listaApartmana = dao.getPoBrojuSoba(brSoba);
		
		if(listaApartmana.isEmpty()) {
			System.out.println("Lista apartmana prazna!");
			return null;
		}else {
			System.out.println("Apartmani pronadjeni!");
			return listaApartmana;
		}
	}
	
	//vraca aktivne apartmane
	@GET
	@Path("/pretragaGosti/{brGostiju}")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<Apartman> getPoBrGostiju(@PathParam("brGostiju") int brGostiju){
		
		ApartmanDAO dao = (ApartmanDAO) ctx.getAttribute("apartmanDAO");
		
		if(dao == null) 
			return null;
		
		ArrayList<Apartman> listaApartmana = dao.getPoBrojuGostiju(brGostiju);
		
		if(listaApartmana.isEmpty()) {
			System.out.println("Lista apartmana prazna!");
			return null;
		}else {
			System.out.println("Apartmani pronadjeni!");
			return listaApartmana;
		}
	}
	
	//vraca aktivne apartmane
	@GET
	@Path("/pretraga/{tip}/{brSoba}/{brGostiju}")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<Apartman> getPoParametrima(@PathParam("tip") String tip, @PathParam("brSoba") int brSoba, @PathParam("brGostiju") int brGostiju){
		
		ApartmanDAO dao = (ApartmanDAO) ctx.getAttribute("apartmanDAO");
		
		ArrayList<Apartman> listaApartmana = dao.getPoTipuApartmana(tip);
		
		ArrayList<Apartman> listaApartmana2 =  dao.getPoBrojuSoba(brSoba);
		
		ArrayList<Apartman> listaApartmana3 = dao.getPoBrojuGostiju(brGostiju);
		
		listaApartmana.retainAll(listaApartmana2);
		listaApartmana.retainAll(listaApartmana3);
		
		if(listaApartmana.isEmpty()) {
			System.out.println("Lista apartmana prazna!");
			return null;
		}else {
			System.out.println("Apartmani pronadjeni!");
			return listaApartmana;
		}
	}
	
	//vraca aktivne i NEAKTIVNE apartmane
	@GET
	@Path("/pretragaSvih/{tip}/{brSoba}/{brGostiju}")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<Apartman> getSvePoParametrima(@PathParam("tip") String tip, @PathParam("brSoba") int brSoba, @PathParam("brGostiju") int brGostiju){
		
		ApartmanDAO dao = (ApartmanDAO) ctx.getAttribute("apartmanDAO");
		
		ArrayList<Apartman> listaApartmana = dao.getPoTipuSveApartmane(tip);
		
		ArrayList<Apartman> listaApartmana2 = dao.getPoBrojuSobaSve(brSoba);
		
		ArrayList<Apartman> listaApartmana3 = dao.getPoBrojuGostijuSve(brGostiju);
		
		listaApartmana.retainAll(listaApartmana2);
		listaApartmana.retainAll(listaApartmana3);
		
		if(listaApartmana.isEmpty()) {
			System.out.println("Lista apartmana prazna!");
			return null;
		}else {
			System.out.println("Apartmani pronadjeni!");
			return listaApartmana;
		}
	}

	@POST
	@Path("/dodajApartman")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response dodajApartman(Apartman a, @Context HttpServletRequest rq) {
		
		System.out.println(a);
		ApartmanDAO apartmani = (ApartmanDAO) ctx.getAttribute("apartmanDAO");
		KorisnikDAO korisnici = (KorisnikDAO) ctx.getAttribute("korisnikDAO");
		
		Domacin d = (Domacin) rq.getSession().getAttribute("korisnik");
		System.out.println(d.getKorisnicko_ime());
		a.setDomacin(d.getKorisnicko_ime());
		
		System.out.println(d.getApartmani());
		d.dodajApartman(a);
	
		System.out.println(d.getApartmani());
		apartmani.dodajApartman(a);
		
		apartmani.sacuvajApartmane();
		korisnici.sacuvajKorisnika();
		
		return Response.ok().build();	
	}
	
	
	@PUT
	@Path("/ukloniApartman/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response ukloniApartman(@PathParam("id") String id) {
		
		ApartmanDAO dao = (ApartmanDAO) ctx.getAttribute("apartmanDAO");
		
		if(dao == null)
			return Response.status(500).build();
		
		
		dao.ukloniPoIdApartmana(id);
		System.out.println("Apartman uspesno uklonjen!");
		
	
		dao.sacuvajApartmane();
		return Response.ok().build();
	}
	
	@PUT
	@Path("/izmeniApartman/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response izmeniApartman(Apartman a, @PathParam("id") String id) {
		ApartmanDAO dao = (ApartmanDAO) ctx.getAttribute("apartmanDAO");
		KorisnikDAO korisnici = (KorisnikDAO) ctx.getAttribute("korisnikDAO");
		
		if(dao == null)
			return Response.status(500).build();
		
		ArrayList<Apartman> lista = dao.getSveApartmane();
		
		for(Apartman app : lista) {
			if(app.getIdApartmana().equals(id)) {
				app.setStatus(a.getStatus());
				app.setBrSoba(a.getBrSoba());
				app.setBrGostiju(a.getBrGostiju());
				app.setCenaPoNoci(a.getCenaPoNoci());
				app.setSadrzajAp(a.getSadrzajAp());
				app.setLokacija(a.getLokacija());
				System.out.println("Izmenjen apartman: " + app.toString());
				break;
			}
		}
		
		
		String domacinApartmana = a.getDomacin();
		System.out.println(a.getDomacin());
		Domacin dom = null;
		for(Korisnik k : korisnici.getKorisnici()) {
			if(k.getKorisnicko_ime().equals(domacinApartmana)) {
				dom = (Domacin) k;
			}
		}
		System.out.println(dom.getKorisnicko_ime());
		
		
		dom.zameniApartman(a, id);
		korisnici.sacuvajKorisnika();
		dao.sacuvajApartmane();
		return Response.ok().build();
	}
	
	@GET
	@Path("/getDomacinaApartmana/{idApartmana}")
	@Produces(MediaType.APPLICATION_JSON)
	public String getDomacina(@PathParam("idApartmana") String idAp) {
		
		ApartmanDAO dao = (ApartmanDAO) ctx.getAttribute("apartmanDAO");
		
		ArrayList<Apartman> lista = dao.getSveApartmane();
		
		String domacin = null;
		
		for(Apartman a : lista) {
			if(a.getIdApartmana().equals(idAp)) {
				domacin = a.getDomacin();
				break;
			}
		}
		
		return domacin;
	}
	
	@GET
	@Path("/filtrirajStatus/{status}")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<Apartman> filtrirajStatus(@PathParam("status") Apartman.Status status) {
		
		ApartmanDAO dao = (ApartmanDAO) ctx.getAttribute("apartmanDAO");
		
		ArrayList<Apartman> lista = dao.getSveApartmane();
		ArrayList<Apartman> povratna = new ArrayList<Apartman>();
		
		for(Apartman a : lista) {
			if(a.getStatus() == status) {
				povratna.add(a);
			}
		}
		
		return povratna;
	}
	
	@GET
	@Path("/filtrirajTip/{tip}")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<Apartman> filtrirajTip(@PathParam("tip") Apartman.Tip tip){

		ApartmanDAO dao = (ApartmanDAO) ctx.getAttribute("apartmanDAO");
		
		ArrayList<Apartman> lista = dao.getSveApartmane();
		ArrayList<Apartman> povratna = new ArrayList<Apartman>();
		
		for(Apartman a : lista) {
			if(a.getTip() == tip) {
				povratna.add(a);
			}
		}
		
		return povratna;
	}
}
