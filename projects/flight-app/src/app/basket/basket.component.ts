import { EventService } from './../event.service';
import {Component} from '@angular/core';
import { Flight } from '@flight-workspace/flight-api';

@Component({
  selector: 'basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent {

  flights: Flight[] = [];

  constructor(private eventServie: EventService) {
    eventServie.flightSelected$.subscribe(
      f => {
        this.flights.push(f);
      }
    )
  }


}
