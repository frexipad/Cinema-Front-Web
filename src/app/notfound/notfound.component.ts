import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent implements OnInit {
 imageNotFound:string="assets/static/images/not2.jpg"
  constructor() { }

  ngOnInit() {

  }

}
