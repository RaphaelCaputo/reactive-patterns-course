import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessagesService } from 'app/services/messages.service';

@Component({
  selector: 'messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

    errors$: Observable<string[]>;

    constructor(private messagesService: MessagesService) { }

    ngOnInit() {
        this.errors$ = this.messagesService.errors$;
    }

    close() {
        this.messagesService.error();
    }

}
