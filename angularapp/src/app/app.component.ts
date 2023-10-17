import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  carga = true;

  ngOnInit(): void {
    this.carga = false
  }

  ngAfterViewInit(): void {
    
  }

  // public forecasts?: WeatherForecast[];

  // constructor(http: HttpClient) {
  //   http.get<WeatherForecast[]>('/weatherforecast').subscribe(result => {
  //     this.forecasts = result;
  //   }, error => console.error(error));
  // }

  // title = 'angularapp';
}

// interface WeatherForecast {
//   date: string;
//   temperatureC: number;
//   temperatureF: number;
//   summary: string;
// }
