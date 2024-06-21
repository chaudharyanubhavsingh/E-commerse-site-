import { Component, ElementRef, Renderer2, ViewChild, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DressesComponent } from "../dresses/dresses.component";
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { MainComponent } from "../main/main.component";
import { Dressdata } from '../app.module';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  dress=Dressdata;
  constructor() {
  }
  
    ngOnInit(): void {
    }
}
