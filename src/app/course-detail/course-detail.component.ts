import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Course} from "../shared/model/course";
import {Lesson} from "../shared/model/lesson";
import * as _ from 'lodash';
import {CoursesService} from "../services/courses.service";
import {NewsletterService} from "../services/newsletter.service";
import {UserService} from "../services/user.service";
import { Observable } from 'rxjs';
import { switchMap, first, publishLast, refCount } from 'rxjs/operators';


@Component({
  selector: 'course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  course$: Observable<Course>;
  lessons$: Observable<Lesson[]>;

  constructor(private route: ActivatedRoute,
              private coursesService: CoursesService,
              private newsletterService: NewsletterService,
              private userService:UserService) {

  }

  ngOnInit() {
    
    this.course$ = this.route.params.pipe(
      switchMap(params => this.coursesService.findCourseByUrl(params['id'])),
      
      // Ensure completion on the first emitted value
      first(),

      // it won’t emit any value until Source completes.
      // When Source completes AsyncSubject completes too and emits last value
      // and ‘complete’ notification to all subscribers, current and new.
      publishLast(),

      // Connecting and disconnecting manually might be hard to implement,
      // therefore there is a refCount() operator that will automatically connect()
      // with first subscription, keep count of subscriptions and keep Subject connected
      // to the Source as long as there is at least one subscriber.
      refCount()
    );

    // Since we need the course to be able to load it's lessons
    // We are going to derive the lessons Observable from the course Observable
    // getting the course that is been emitted from course$ and load the lessons
    this.lessons$ = this.course$.pipe(
      switchMap(course => this.coursesService.findLessonsForCourse(course.id)),
      first(),
      publishLast(),
      refCount()
    )

    // Solved the nested subscribe problem is above
    // Nested subscribe problem
      // this.route.params
      //     .subscribe( params => {

      //         const courseUrl = params['id'];

      //         this.coursesService.findCourseByUrl(courseUrl)
      //             .subscribe(data => {
      //                 this.course = data;

      //                 this.coursesService.findLessonsForCourse(this.course.id)
      //                     .subscribe(lessons => this.lessons = lessons);
      //             });

      //     });
  }

  onSubscribe(email:string) {
    this.newsletterService.subscribeToNewsletter(email)
        .subscribe(
            () => {
                alert('Subscription successful ...');
            },
            console.error
        );
  }

  loginAsJohn() {
    this.userService.login('john@gmail.com', 'test123').subscribe()
  }

}
