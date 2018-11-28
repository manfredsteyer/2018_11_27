import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';
import { Flight } from '@flight-workspace/flight-api';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private flightSelectedSubject = new ReplaySubject<Flight>(20);
  public flightSelected$: Observable<Flight> = this.flightSelectedSubject.asObservable();

  constructor() { }

  flightSelected(flight: Flight) {
    if (!flight) throw new Error('must not be null!');
    this.flightSelectedSubject.next(flight);
  }

}
