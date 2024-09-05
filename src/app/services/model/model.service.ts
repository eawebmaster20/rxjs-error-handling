import { Injectable } from '@angular/core';
import { interval, of, throwError } from 'rxjs';
import { tap, take, delay, catchError, mergeMap, retryWhen, scan } from 'rxjs/operators';
import { responseData } from '../../interfaces/model.httpRes';

@Injectable({
  providedIn: 'root'
})
export class ModelService {
  results: responseData[] = [];
  appState: string = 'idle';
  retryCount: string = '';
  apiRes:string = '';
  failChances:number = 0;
  i:number = 0;
  httpResponse: responseData[] = [
    { name: 'Eric', title: 'Buy groceries', completed: false },
    { name: 'Bright', title: 'Clean the house', completed: true },
    { name: 'Silas', title: 'Finish Angular project', completed: false },
    { name: 'Nana', title: 'Read a book', completed: false },
    { name: 'Brown', title: 'Exercise for 30 minutes', completed: true },
    { name: 'Ken', title: 'Exercise for 30 minutes', completed: true },
    { name: 'Bismark', title: 'Exercise for 30 minutes', completed: true },
    { name: 'Derick', title: 'Exercise for 30 minutes', completed: true },
    { name: 'Sam', title: 'Exercise for 30 minutes', completed: true },
  ];

  interval$ = interval(4000);

  constructor() {}

  simulateHttpRes() {
    this.appState = 'loading';
    this.interval$.pipe(
      mergeMap(() =>
        of(this.httpResponse[this.i])
          .pipe(
            take(1),
            delay(2000),
            mergeMap(response => this.randomFailOrSucceed(response)),
            tap(data => {
              console.log(data);
              this.appState = 'resSucess';
            }),
            retryWhen(errors => 
              errors.pipe(
                scan((retryCount, error) => {
                  retryCount += 1;
                  this.appState = 'retry';
                  this.retryCount = `Retry attempt #${retryCount}`;
                  if (retryCount >= 3) {
                    throw error;
                  }
                  return retryCount;
                }, 0),
                delay(3000)
              )
            ),
            catchError(err => {
              this.appState = 'error';
              console.error('All retries failed:', err);
              this.apiRes = JSON.stringify(
                {
                  name: 'Fallback User',
                  title: 'Fallback Task',
                  completed: false
                })
               return throwError(() => new Error('Simulated network error'))
            })
          )
      ),
      tap(() => {
        this.i++;
        console.log('Request number:', this.i);
      }),
      take(9)
    ).subscribe({
      next: (value) => {
        console.log('Final Value:', value);
      },
      error: (err) => console.error('Error:', err),
      complete: () => {
        this.appState = 'complete';
        console.log('Complete!')
      }
    });
  }

  randomFailOrSucceed(response: responseData) {
    const shouldFail = Math.random() < (this.failChances/100) // 80% chance to fail
    if (shouldFail) {
      console.log('Simulated failure');
      return throwError(() => new Error('Simulated network error')).pipe(delay(2000));
    } else {
      console.log('Simulated success');
      this.apiRes = JSON.stringify(response)
      this.appState = 'resSucess';
      return of(response);
    }
  }
}
