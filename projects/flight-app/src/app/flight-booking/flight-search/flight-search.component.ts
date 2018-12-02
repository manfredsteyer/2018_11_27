import { FlightUpdated } from './../+state/flight-booking.actions';
import { takeUntil, first } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {Component, OnInit} from '@angular/core';
import {FlightService, Flight} from '@flight-workspace/flight-api';
import { EventService } from '../../event.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../+state';
import { FlightBookingAppState } from '../+state/flight-booking.reducer';
import { FlightsLoaded, FlightsLoad } from '../+state/flight-booking.actions';

@Component({
  selector: 'flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css'],
  providers: [FlightService]
})
export class FlightSearchComponent implements OnInit {

  from: string = 'Hamburg'; // in Germany
  to: string = 'Graz'; // in Austria
  urgent: boolean = false;

  get flights() {
    return this.flightService.flights;
  }

  // "shopping basket" with selected flights
  basket: object = {
    "3": true,
    "5": true
  };

  flights$: Observable<Flight[]>;

  constructor(
    private store: Store<FlightBookingAppState>,
    private eventService: EventService,
    private flightService: FlightService) {
  }

  ngOnInit() {
    this.flights$ = this.store.select(s => s.flightBooking.flights);
  }

  selectionChanged(flight: Flight, selected: boolean) {
    
    if (selected) {
      this.basket[flight.id] = true;
      this.eventService.flightSelected(flight);
    }
    else {
      this.basket[flight.id] = false;
    }
  }

  search(): void {
    if (!this.from || !this.to) return;

    this.store.dispatch(
      new FlightsLoad({
        from: this.from, 
        to: this.to, 
        urgent: this.urgent}));
  }

  delay(): void {
    
    this.flights$.pipe(first()).subscribe(flights => {

      const f = flights[0];
      const oldDate = new Date(f.date);
      const newDate = new Date(oldDate.getTime() + 1000 * 60 * 15);

      const newFlight: Flight = {...f, date: newDate.toISOString() };
      this.store.dispatch(new FlightUpdated({flight: newFlight}));

    });

  }

}
