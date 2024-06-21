import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private apiUrl = 'http://localhost:8000/address';

  constructor(private http: HttpClient) {}

  createAddress(address: any): Observable<any> {
    
    return this.http.post<any>(this.apiUrl, address);
  }
}
