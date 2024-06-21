import { Component, Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ElementRef, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  @ViewChildren('formInput') inputs!: QueryList<ElementRef<HTMLInputElement>>;
  error: string | null = null;
  isLoggedIn = false;
  username: string | null = null;
  userId: string | null = null;  // Add this line to store userId

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.checkToken();
  }

  addFocus(input: HTMLInputElement): void {
    let parent = input.parentNode?.parentNode as HTMLElement;
    if (parent) {
      parent.classList.add("focus");
    }
  }

  removeFocus(input: HTMLInputElement): void {
    let parent = input.parentNode?.parentNode as HTMLElement;
    if (parent && input.value === "") {
      parent.classList.remove("focus");
    }
  }

  login(email: string, password: string): void {
    this.http.post<any>('http://localhost:8000/login', { email, password })
      .subscribe(
        response => {
          if (response && response.token) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('username', response.username);
            localStorage.setItem('userId', response.userId);  // Store userId in local storage
            this.isLoggedIn = true;
            this.username = response.username;
            this.userId = response.userId;  // Set userId in component state
            this.clearFormFields();
            window.location.href= '/dashboard';
          } else {
            this.handleError('Login failed. Please check your credentials and try again.');
          }
        },
        error => {
          if (error.status === 401) {
            this.handleError('Unauthorized. Please check your credentials.');
          } else {
            this.handleError('An error occurred. Please try again later.');
          }
        }
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');  // Remove userId from local storage
    this.isLoggedIn = false;
    this.username = null;
    this.userId = null;  // Clear userId in component state
  }

  private checkToken(): void {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const userId = localStorage.getItem('userId');  // Retrieve userId from local storage
    if (token && username && userId) {
      this.isLoggedIn = true;
      this.username = username;
      this.userId = userId;  // Set userId in component state
    }
  }

  private handleError(message: string): void {
    console.error(message);
    this.error = message;
    setTimeout(() => {
      this.error = null;
    }, 2000);
  }

  private clearFormFields(): void {
    this.inputs.forEach(input => input.nativeElement.value = '');
  }
}
