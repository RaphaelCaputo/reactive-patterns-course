import { Component, OnInit } from '@angular/core';
import { UserService, UNKNOWN_USER } from 'app/services/user.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {

  isLoggedIn$: Observable<boolean>

  constructor(private userService: UserService) { }

  ngOnInit() {

    this.isLoggedIn$ = this.userService.user$.pipe(
      map(user => user !== UNKNOWN_USER)
    )
  }

  logout() {
    
  }

}
