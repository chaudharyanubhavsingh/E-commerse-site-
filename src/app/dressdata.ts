import { Component, OnInit } from '@angular/core';
import { DressService } from './dress.service';
import { Dress } from './dress.model';

@Component({
  selector: 'app-dress-list',
  template: '',
})
export class DressListComponent implements OnInit {
  constructor(private dressService: DressService) {}

  ngOnInit(): void {
    this.dressService.getDresses().subscribe((data) => {
      Dressdata.length = 0; // Clear existing data
      Dressdata.push(...data); // Update with new data
    });
  }
}

// Export the updated dress data
export const Dressdata: Dress[] = [];
