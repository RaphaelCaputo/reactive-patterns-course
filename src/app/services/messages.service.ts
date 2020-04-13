import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  private errrosSubject = new BehaviorSubject<string[]>([])

  errors$: Observable<string[]> = this.errrosSubject.asObservable();


  constructor() { }

  error(...errors: string[]) {
    this.errrosSubject.next(errors);
  }
}
