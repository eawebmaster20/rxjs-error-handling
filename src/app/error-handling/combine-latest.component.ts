import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ModelService } from '../services/model/model.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-combine-latest',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './combine-latest.component.html',
  styleUrl: './combine-latest.component.scss'
})
export class CombineLatestComponent implements OnInit{
 constructor(public modelService: ModelService){}
  ngOnInit() {
  }
}
