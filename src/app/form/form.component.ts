import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  formData: any = {}; // Initialize formData object

  constructor(private http: HttpClient) {}

  submitForm() {
    // Send form data to backend
    this.http.post('http://localhost:8000/user/create', {
      Name: this.formData.Name, // Include the Name field
      Company: this.formData.Company,
      Phone: this.formData.Phone,
      Email: this.formData.Email,
      Message: this.formData.Message
    })
    .subscribe(
      (response) => {
       
        // Optionally, you can reset the form here
        this.formData = {};
      },
      (error) => {
        console.error('Error sending form data:', error);
      }
    );
  }
}
