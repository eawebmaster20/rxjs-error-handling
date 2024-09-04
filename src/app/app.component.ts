import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { SplitButtonModule } from 'primeng/splitbutton';
import { CombineLatestComponent } from './error-handling/combine-latest.component';
import {SelectButtonModule} from 'primeng/selectbutton';
import { ModelService } from './services/model/model.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    SplitButtonModule,
    SelectButtonModule,
    TableModule,
    RouterOutlet, 
    FormsModule, 
    CommonModule,
    CombineLatestComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  // private searchTerms = new Subject<string>();
  // results:any = [];
  // selectedTest:string='search'
  // tests:any =[
  //   { label: 'search', value: 'search' },
  //   { label: 'combineLatest', value: 'combineLatest' },
  // ];
  // tasks:any = [
  //   { name: 'Eric', title: 'Buy groceries', completed: false },
  //   { name: 'Bright', title: 'Clean the house', completed: true },
  //   { name: 'Silas', title: 'Finish Angular project', completed: false },
  //   { name: 'Nana', title: 'Read a book', completed: false },
  //   { name: 'Sam', title: 'Exercise for 30 minutes', completed: true },
  // ];
  
  loading = false;
  error: string | null = null;

  constructor(public modelService: ModelService) {
      // this.results = this.tasks
      // this.setupSearch();
  }

  // onSearch(event: Event): void {
  //   console.log('hit search term')
  //   const searchTerm = (event.target as HTMLInputElement).value;
  //   this.searchTerms.next(searchTerm);
  // }

  // private setupSearch(): void {
  //   this.searchTerms
  //     .pipe(
  //       debounceTime(300), 
  //       distinctUntilChanged(), 
  //       switchMap(term => {
  //         this.loading = true;
  //         this.error = null;
  //         if (term.length <= 2) {
  //           console.log(this.tasks);
  //           return of(this.tasks);
  //         }
  //         try {
  //           const result = this.mockApiCall(term);
  //           return of(result).pipe(delay(500));
  //         } catch (err) {
  //           this.error = 'Error fetching results';
  //           return of([]);
  //         }
  //       }),
  //       catchError(err => {
  //         this.error = 'Error fetching results';
  //         return of([]);
  //       })
  //     )
  //     .subscribe(results => {
  //       this.results = results;
  //       this.loading = false;
  //     },(err) => {
  //       this.error = err;
  //       this.loading = false;
  //     });
  // }

  // private simulateHttpRequest(term: string) {
  //   if (Math.random() < 0.3) {
  //     throw new Error(`Ooops! error: could't get '${term}...'`);
  //   }
  //   return this.tasks.filter((item:any) =>
  //     item.name.toLowerCase().includes(term.toLowerCase())
  //   );
  // }

}