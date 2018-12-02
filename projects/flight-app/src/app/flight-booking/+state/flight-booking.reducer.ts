import { AppState } from './../../+state/index';
import { Action } from '@ngrx/store';
import { FlightBookingActions, FlightBookingActionTypes } from './flight-booking.actions';
import { Flight } from '@flight-workspace/flight-api';

export interface FlightBookingAppState extends AppState {
  flightBooking: FlightBookingState
}

export interface FlightBookingState {
  flights: Flight[],
  stats: object
}

export const initialState: FlightBookingState = {
  flights: [],
  stats: {}
};

export function reducer(state = initialState, action: FlightBookingActions): FlightBookingState {
  
  
  switch (action.type) {

    case FlightBookingActionTypes.FlightsLoaded:
      const newFlights = action.payload.flights;
      return { ...state, flights: newFlights }

    case FlightBookingActionTypes.FlightUpdated: {
      const newFlight = action.payload.flight;
      const newFlights = state.flights.map(f => (f.id == newFlight.id) ? newFlight: f);

      return { ...state, flights: newFlights };
    }
    case FlightBookingActionTypes.FlightsLoad:
      return { ...state, flights: [] }

    default:
      return state;
  }
}
