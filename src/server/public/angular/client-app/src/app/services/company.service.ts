import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  apiEndpoint: string = environment.apiEndpoint;
  endpoint: string = `${this.apiEndpoint}/companies`;

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

  companyBankInsert(id, model?) {
    return this.http.post(`${this.endpoint}/${id}/companybank`, model);
  }

  companyBankDelete(id, bankId) {
    return this.http.delete(`${this.endpoint}/${id}/companybank/${bankId}`);
  }
}
