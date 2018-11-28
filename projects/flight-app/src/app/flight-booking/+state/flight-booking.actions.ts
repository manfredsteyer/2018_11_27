import { Action } from '@ngrx/store';
import { Flight } from '@flight-workspace/flight-api';

export enum FlightBookingActionTypes {
  LoadFlightBookings = '[FlightBooking] Load FlightBookings',
  FlightsLoaded = '[FlightBooking] FlightsLoaded',
  FlightUpdated = '[FlightBooking] FlightUpdated',
  FlightsLoad = '[FlightBooking] FlightsLoad'
}

export class FlightBooking implements Action {
  readonly type = FlightBookingActionTypes.LoadFlightBookings;
}

export class FlightsLoad implements Action {
  readonly type = FlightBookingActionTypes.FlightsLoad;
  constructor(readonly payload: { from: string, to: string, urgent: boolean }) {
  }
}

export class FlightsLoaded implements Action {
  readonly type = FlightBookingActionTypes.FlightsLoaded;
  constructor(readonly payload: { flights: Flight[] }) {
  }
}

export class FlightUpdated implements Action {
  readonly type = FlightBookingActionTypes.FlightUpdated;
  constructor(readonly payload: { flight: Flight }) {
  }
}

export type FlightBookingActions = FlightsLoaded | FlightUpdated | FlightsLoad;
