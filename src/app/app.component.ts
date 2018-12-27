import {Component, OnInit} from '@angular/core';
import {forkJoin} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {mergeMap, tap} from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    title = 'forkJoin vs mergeMap';

    constructor(private http: HttpClient) {

    }

    ngOnInit(): void {

        /****
         *
         * Test by bamossza
         *
         */

        let service1 = 'https://jsonplaceholder.typicode.com/todos/1';
        let service2 = 'https://jsonplaceholder.typicode.com/users';

        forkJoin([this.http.get(service1), this.http.get(service2)])
            .subscribe(results => {
                console.log('== forkJoin ==\n', results);
            });

        this.http.get(service1).pipe(
            tap(t => console.log('== mergeMap ==\n', t)),
            mergeMap(e => this.http.get(service2 + '/' + e['userId'])),
        ).subscribe(s => console.log('== mergeMap service 2 result ==\n', s));
    }


}
