import { Component, OnInit } from '@angular/core';
import {CinemaService} from '../services/cinema.service';


@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit {
  private villes;
  private cinemas;
  private nameCinema;
  private salles;
  private projections: any;
  private seances: any;
  private currentVille;
  private currentCinema;
  private currentSalle;
  private currentSeance;
  private currentProjection: any;
  private urlImage ="assets/static/images/";
  private ticketsPlaces: any;
  private selectedTickets: any[];



  constructor(public service:CinemaService) { }

  ngOnInit() {
    this.getVilles();
  }

  getVilles(){
    this.service.getVilles()
      .subscribe(data=>{
        this.villes=data;
      },err=>{
        console.log(err)
      })
  }

  onGetCinema(v) {
    this.currentVille=v;
    this.service.getCinemas(v)
      .subscribe(data=>{
        this.cinemas=data;
      },err=>{
        console.log(err)
      })
  }


  onGetSalles(c) {
    this.currentCinema=c;
    this.service.getSalles(c)
      .subscribe(data=>{
        this.salles=data;
        this.salles._embedded.salles.forEach(salle=>{
          this.service.getProjection(salle)
            .subscribe(data=>{
              salle.projections=this.currentProjection;
            salle.projections=data;
          },err=>{
            console.log(err)
          })
        })
      },err=>{
        console.log(err)
      })

  }


  onGetTicketsPlaces(p: any) {
    console.log(p);
    this.currentProjection=p;
    this.service.getTicketsPlaces(p)
      .subscribe(data=>{
        this.currentProjection.tickets=data;
        this.selectedTickets=[];
      },err=>{
        console.log(err)
      })
  }


  onSelectTicket(t) {
    if(!t.selected){
      t.selected=true;
      this.selectedTickets.push(t);
      console.log(this.selectedTickets)
    }else {
      t.selected=false;
      this.selectedTickets.splice(this.selectedTickets.indexOf(t),1);
      console.log(this.selectedTickets)
    }


  }

  getTicketClass(t):string {
    let str="btn clickable ticket ";
    if (t.reserve==true){
     str+= "btn-danger";
    }else if(t.selected){
      str+= "btn-warning";
    }else {
      str+= "btn-success";
    }
    return str;
  }

  onPayeTickets(dataFormulaire) {
    console.log(dataFormulaire);
    console.log(this.selectedTickets);
    let listTickets=[];

    this.selectedTickets.forEach(selectedT=>{
      listTickets.push(selectedT.id);
    });

    dataFormulaire.listTickets=listTickets;
    this.service.postPayeTickets(dataFormulaire)
      .subscribe(data=>{
      alert("Tickets Reservés avec succées!")
        this.onGetTicketsPlaces(this.currentProjection);
    },err=>{
      console.log(err)
    })

  }
}
