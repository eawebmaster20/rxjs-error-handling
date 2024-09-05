import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ErrorHandlingComponent } from './error-handling/error-handling.component';
import {SelectButtonModule} from 'primeng/selectbutton';
import { ModelService } from './services/model/model.service';
import { SliderModule } from 'primeng/slider';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    SplitButtonModule,
    SelectButtonModule,
    SliderModule,
    TableModule,
    RouterOutlet, 
    FormsModule, 
    CommonModule,
    ErrorHandlingComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  loading = false;
  error: string | null = null;

  constructor(public modelService: ModelService) {
  }

}