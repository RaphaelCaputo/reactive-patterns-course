import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Lesson } from 'app/shared/model/lesson';
import { Http } from '@angular/http';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class LessonsPagerService {

    private static readonly PAGE_SIZE = 2;

    private subject = new BehaviorSubject<Lesson[]>([]);

    lessonsPage$: Observable<Lesson[]> = this.subject.asObservable();

    currentPageNumber = 1;

    private courseId: number;

    constructor(private http: Http) { }


    loadFirstPage(courseId: number) {
        
        this.courseId = courseId;
        this.currentPageNumber = 1;
        this.loadPage(this.currentPageNumber)

    }

    previous() {

        if(this.currentPageNumber - 1 >= 1) {
            this.currentPageNumber -= 1;
            this.loadPage(this.currentPageNumber)
        }

    }

    next() {

        this.currentPageNumber += 1;
        this.loadPage(this.currentPageNumber)

    }

    loadPage(pageNumber: number) {

        this.http.get('/api/lessons', {
            params: {
                courseId: this.courseId,
                pageNumber,
                pageSize: LessonsPagerService.PAGE_SIZE
            }
        }).pipe(
            map(res => res.json().payload),
            tap(console.log)
        ).subscribe(
            lessons => this.subject.next(lessons)
        )

    }
}
