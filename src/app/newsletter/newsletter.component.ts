import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { UserService } from 'app/services/user.service';
import { NewsletterService } from 'app/services/newsletter.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'newsletter',
    templateUrl: './newsletter.component.html',
    styleUrls: ['./newsletter.component.css']
})
export class NewsletterComponent implements OnInit {

    firstName$: Observable<string>;

    constructor(
        private userService: UserService,
        private newsletterService: NewsletterService) {}

    ngOnInit() {
        this.firstName$ = this.userService.user$.pipe(
            map(user => user.firstName)
        )
    }


    subscribeToNewsletter(emailField) {
        this.newsletterService.subscribeToNewsletter(emailField.value)
            .subscribe(
                () => {
                    emailField.value = '';
                    alert('Subscription successful ...')
                },
                console.error
            );
    }

}
