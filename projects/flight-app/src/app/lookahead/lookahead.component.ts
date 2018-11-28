import { Observable, interval, Subject } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Flight, FlightService } from '@flight-workspace/flight-api';
import { debounceTime, withLatestFrom, switchMap, startWith, map, distinctUntilChanged, tap, filter, share, mergeMap, exhaustMap, takeUntil } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'flight-lookahead',
  templateUrl: './lookahead.component.html',
  styleUrls: ['./lookahead.component.css']
})
export class LookaheadComponent implements OnInit, OnDestroy {


  control: FormControl = new FormControl();
  
  input$: Observable<string> = this.control.valueChanges;
  flights$: Observable<Flight[]>;

  online$: Observable<boolean>;
  
  close$ = new Subject<void>();


  constructor(private flightService: FlightService) { }

  ngOnInit() {

    this.online$ 
        = interval(2000).pipe(
                startWith(0),
                map(_ => true /*Math.random() < 0.5*/),
                distinctUntilChanged(),
                takeUntil(this.close$),
                share()
        );

        // pulish, connect

    this.flights$ = this.input$.pipe(
      debounceTime(300),
      withLatestFrom(this.online$),
      map(tuple => ({ input: tuple[0], online: tuple[1] }) ),
      filter(o => o.online),
      exhaustMap(o => this.flightService.find(o.input, '')),
      takeUntil(this.close$)
    );

  }

  ngOnDestroy(): void {
    this.close$.next();

  }

}
