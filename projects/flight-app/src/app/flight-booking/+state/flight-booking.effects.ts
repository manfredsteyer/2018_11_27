import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { FlightBookingActions, FlightBookingActionTypes, FlightsLoad, FlightsLoaded } from './flight-booking.actions';
import { switchMap, map } from 'rxjs/operators';
import { FlightService } from '@flight-workspace/flight-api';

@Injectable()
export class FlightBookingEffects {

  @Effect()
  flightsLoad$ = 
    this
      .actions$
      .ofType(FlightBookingActionTypes.FlightsLoad)
      .pipe(
        switchMap((a: FlightsLoad) => 
          this.flightService.find(
            a.payload.from, 
            a.payload.to, 
            a.payload.urgent)),
        map(flights => new FlightsLoaded({flights}))
      )

  constructor(private actions$: Actions, private flightService: FlightService) {}
}
