import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CinemaService} from '../services/cinema.service';

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit {
  private villes;
  private cinemas;
  private salles;
  private projections: any;
  private seances: any;
  private currentVille;
  private currentCinema;
  private currentSalle;
  private currentSeance;
  private currentProjection: any;



  constructor(public service:CinemaService) { }

  ngOnInit() {
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

  onGetSalle(c) {
    this.currentCinema=c;
    this.service.getSalles(c)
      .subscribe(data=>{

        this.salles=data;

        this.salles._embedded.salles.forEach(salle=>{
          this.service.getProjection(salle)
            .subscribe(data=>{
              salle.projections=data;
            },err=>{
              console.log(err)
            })
        })

      },err=>{
        console.log(err)
      })
  }

  // onGetProjection(s) {
  //   this.currentSalle=s;
  //   this.service.getProjection(s)
  //     .subscribe(data=>{
  //       this.salles=data;
  //     },err=>{
  //       console.log(err)
  //     })
  // }



































  // onGetCinemas(v) {
  //   this.currentVille=v;
  //   this.service.getCinemas(v)
  //     .subscribe(data=>{
  //       this.cinemas=data;
  //     },err=>{
  //       console.log(err)
  //     })
  //
  // }
  // onGetsalles(c) {
  //   this.currentCinema=c;
  //   this.service.getSalles(c)
  //     .subscribe(data=>{
  //       this.salles=data;
  //       this.salles._embedded.salles.forEach(salle =>{
  //         this.service.getProjection(salle)
  //           .subscribe(data=>{
  //           salle.projections=data;
  //         },err=>{
  //           console.log(err)
  //         });
  //       })
  //     },err=>{
  //       console.log(err)
  //     })
  //
  // }



}
