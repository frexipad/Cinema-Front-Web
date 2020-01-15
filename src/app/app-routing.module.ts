import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CinemaComponent} from './cinema/cinema.component';
import {NotfoundComponent} from './notfound/notfound.component';
// import {VilleComponent} from './ville/ville.component';

const routes: Routes = [
  {path:"",component:NotfoundComponent},
  {path:"cinema",component:CinemaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
