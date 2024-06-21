import { Component } from '@angular/core';
import { Dressdata } from  '../app.module';

@Component({
  selector: 'app-dresses',
  templateUrl: './dresses.component.html',
  styleUrls: ['./dresses.component.css']
})
export class DressesComponent {
  dresses =Dressdata;

  gridColumns = 4; // Default to 3 columns

  setGridColumns(columns: number) {
    this.gridColumns = columns;
  }

  // Function to determine which grid options to display based on screen size
  showGridOption(columns: number): boolean {
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      return columns <= 3;
    } else {
      return true;
    }
  }
}
