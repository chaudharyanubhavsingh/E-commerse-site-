
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {

  constructor(private formBuilder:FormBuilder,private http:HttpClient,private router: Router) { }
  form:FormGroup

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: [''],
      address: [''],
      email: [''],
      password: ['']
    });
    this.clearForm();
   
  }
  clearForm(): void {
    this.form.reset(); 
  }
  login():void{
    this.router.navigate(['/dashboard']);
  }
  signUp(): void {
    interface MyError {
      error: {
        message: string;
      };
    }
    let user =this.form.getRawValue()
    
    if (user.username =="" && user.email =="" &&user.address =="" && user.password =="") {
      alert('Please enter all the values');
    } else {
      this.http.post("http://localhost:8000/signup", user,{
        withCredentials: true
      })
      .subscribe(() => this.router.navigate(['/']), (err: any) => {
        alert("Enter right data " + err.error.message + " error");
      });
      
    }
    
    
  }
}
