import { CanDeactivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface ExitComponent {
    canExit(): Observable<boolean>;
}

@Injectable({providedIn: 'root'})
export class ExitGuard implements CanDeactivate<ExitComponent> {
    canDeactivate(comp: ExitComponent) {
        return comp.canExit();
    }
}