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

  interval$ = interval(1000);

  constructor() {}

  simulateHttpRes() {
    let i = 0;
    this.appState = 'loading';
    
    this.interval$.pipe(
      mergeMap(() =>
        of(this.httpResponse[i])
          .pipe(
            take(1),
            delay(2000),
            tap(data => {
              console.log(data);
              this.appState = 'resSucess';
            }),
            mergeMap(response => this.randomFailOrSucceed(response)),
            retryWhen(errors => 
              errors.pipe(
                scan((retryCount, error) => {
                  retryCount += 1;
                  console.log(`Retry attempt #${retryCount}`);
                  if (retryCount >= 3) {
                    throw error;
                  }
                  return retryCount;
                }, 0),
                delay(1000)
              )
            ),
            catchError(err => {
              console.error('All retries failed:', err);
              throwError(() => new Error('Simulated network error'))
              return of({
                name: 'Fallback User',
                title: 'Fallback Task',
                completed: false
              }); 
            })
          )
      ),
      tap(() => {
        i++;
        console.log('Request number:', i);
      }),
      take(8)
    ).subscribe({
      next: (value) => {
        console.log('Final Value:', value);
      },
      error: (err) => console.error('Error:', err),
      complete: () => console.log('Complete!')
    });
  }

  randomFailOrSucceed(response: responseData) {
    const shouldFail = Math.random() < 0.8; // 80% chance to fail
    if (shouldFail) {
      console.log('Simulated failure');
      return throwError(() => new Error('Simulated network error')).pipe(delay(2000));
    } else {
      console.log('Simulated success');
      return of(response);
    }
  }
}

// import { Injectable } from '@angular/core';
// import { interval, of, throwError } from 'rxjs';
// import { tap, take, delay, catchError, mergeMap, retry } from 'rxjs/operators';
// import { responseData } from '../../interfaces/model.httpRes';

// @Injectable({
//   providedIn: 'root'
// })
// export class ModelService {
//   results: responseData[] = [];
//   appState: boolean = false;
//   httpResponse: responseData[] = [
//     { name: 'Eric', title: 'Buy groceries', completed: false },
//     { name: 'Bright', title: 'Clean the house', completed: true },
//     { name: 'Silas', title: 'Finish Angular project', completed: false },
//     { name: 'Nana', title: 'Read a book', completed: false },
//     { name: 'Brown', title: 'Exercise for 30 minutes', completed: true },
//     { name: 'Ken', title: 'Exercise for 30 minutes', completed: true },
//     { name: 'Bismark', title: 'Exercise for 30 minutes', completed: true },
//     { name: 'Derick', title: 'Exercise for 30 minutes', completed: true },
//     { name: 'Sam', title: 'Exercise for 30 minutes', completed: true },
//   ];

//   interval$ = interval(1000);

//   constructor() {}

//   simulateHttpRes() {
//     let i = 0;
//     this.appState = true;
//     this.interval$.pipe(
//       mergeMap(() =>
//         of(this.httpResponse[i])
//           .pipe(
//             take(1),
//             delay(2000),
//             tap((
//               data=>{
//                 console.log(data);
//                 this.appState = false;
//               }
//             )),
//             mergeMap(response => this.randomFailOrSucceed(response)),
//             retry(3),
//             // catchError(err => {
//             //   console.error('All retries failed:', err);
//             //   return of({
//             //     name: 'Fallback User',
//             //     title: 'Fallback Task',
//             //     completed: false
//             //   }); 
//             // })
//           )
//       ),
//       tap(() => {
//         i++;
//         console.log('Request number:', i);
//       }),
//       take(8)
//     ).subscribe({
//       next: (value) => {
//         console.log('Final Value:', value);
//       },
//       error: (err) => console.error('Error:', err),
//       complete: () => console.log('Complete!')
//     });
//   }

//   private randomFailOrSucceed(response: responseData) {
//     const shouldFail = Math.random() < 0.8;
//     if (shouldFail) {
//       console.log('Simulated failure');
//       return throwError(() => new Error('Simulated network error')).pipe(delay(2000));
//     } else {
//       console.log('Simulated success');
//       return of(response);
//     }
//   }
// }
