import { AuthService } from './../shared/auth/auth.service';
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Subject, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute) {
  }

  needsLogin: boolean;
  _userName: string = '';

  ngOnInit() {

    let subject = new BehaviorSubject(null);
    subject.next('Hallo Welt!');
    subject.next('Heute ist ein schöner Tag!');

    subject.subscribe(value => console.debug('subject says: ', value));
    subject.subscribe(value => console.debug('subject says: ', value));


    this.needsLogin = !!this.route.snapshot.params['needsLogin'];
  }

  get userName(): string {
    return this.authService.userName;
  }

  login(): void {
    this.authService.login();
  }

  logout(): void {
    this.authService.logout();
  }


}
