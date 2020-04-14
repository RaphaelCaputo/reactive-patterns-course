import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, NavigationStart, RoutesRecognized } from '@angular/router';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  loading$: Observable<boolean>;

  constructor(private route: Router) { }

  ngOnInit() {

    this.loading$ = this.route.events.pipe(
      map(event => event instanceof NavigationStart || event instanceof RoutesRecognized),
      tap(console.log)
    )

  }

}
