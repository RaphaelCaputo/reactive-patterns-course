import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Course} from "../shared/model/course";
import {Lesson} from "../shared/model/lesson";
import {Observable} from "rxjs";
import { map, tap } from 'rxjs/operators';


@Component({
    selector: 'course-detail',
    templateUrl: './course-detail.component.html',
    styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

    course$: Observable<Course>;
    lessons$: Observable<Lesson[]>;

    constructor(private route: ActivatedRoute) {

    }

    ngOnInit() {
        /* Data will be returned by the DataResolver.
        Upon route transition from the home screen into the
        CourseDetailScreen is going to load this data tuple [Course, Lesson[]]
        and emit the data as its loaded from the backend and it's made available
        here at the level of this component via the route (this.route.data)
        */

        this.course$ = this.route.data.pipe(
            map(data => data['detail'][0])
        );

        this.lessons$ = this.route.data.pipe(
            map(data => data['detail'][1])
        );
    }


}
