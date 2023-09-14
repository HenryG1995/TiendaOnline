import { Component, OnInit, ViewEncapsulation } from '@angular/core';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  // encapsulation: ViewEncapsulation.None, //desactiva el encapsulamiento de estilos
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {

  }
}
