import { Component, ElementRef, Renderer2, ViewChild, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { Dressdata } from '../app.module';

@Component({
  selector: 'app-clothes',
  templateUrl: './clothes.component.html',
  styleUrl: './clothes.component.css'
})
export class ClothesComponent {
  dress=Dressdata;
  constructor() {
    
  }
  
    ngOnInit(): void {
      
    }
}
