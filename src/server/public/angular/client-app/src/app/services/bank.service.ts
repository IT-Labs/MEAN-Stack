import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BankService {
  apiEndpoint = 'http://localhost:3001/api';
  endpoint: string = `${this.apiEndpoint}/banks`;

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(this.endpoint);
  }

  getById(id: string) {
    return this.http.get(`${this.endpoint}/${id}`);
  }

  insert(model) {
    return this.http.post(this.endpoint, model);
  }

  update(id, model) {
    return this.http.put(`${this.endpoint}/${id}`, model);
  }

  delete(id: string) {
    return this.http.delete(`${this.endpoint}/${id}`);
  }
}
