import { AuthService } from './../shared/auth/auth.service';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'flight-booking',
  templateUrl: './flight-booking.component.html'
})
export class FlightBookingComponent implements OnInit {

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  get isLoggedIn() {
    if (this.authService.userName) {
      return true;
    }
    return false;
  }

}
