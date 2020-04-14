import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Course } from "app/shared/model/course";
import { Lesson } from "app/shared/model/lesson";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { CoursesService } from "app/services/courses.service";
import { switchMap } from "rxjs/operators";

@Injectable()
export class CourseDetailResolver implements Resolve<(Course | Lesson[])[]> {
    // (Lesson[]) indicates it is an expression

    constructor(private coursesService: CoursesService) { }


    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<(Course | Lesson[])[]> {
 
        // switchMap selector function
        // combines the output of the first Observable
        // and the output of the inner Observable?
        // link:
        // https://blog.angular-university.io/rxjs-switchmap-operator/
        return this.coursesService.findCourseByUrl(route.params['id'])
            .pipe(
                switchMap(course => this.coursesService.findLessonsForCourse(course.id),
                (course, lessons) => [course, lessons])
            )

    }

}