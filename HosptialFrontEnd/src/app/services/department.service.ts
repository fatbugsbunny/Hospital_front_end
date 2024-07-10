import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Department, Options, Patient} from "../types";

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private apiUrl = 'http://localhost:8080/department';

  constructor(private httpClient: HttpClient) {
  }

  getAllDepartments(): Observable<Department[]> {
    return this.httpClient.get<Department[]>(`${this.apiUrl}/all`);
  }

  addDepartment(department: Department): void {
    this.httpClient.post<Department>(`${this.apiUrl}/add`, department);
  }

  editDepartment(id: number, department: Department): void {
    this.httpClient.put<Department>(`${this.apiUrl}/${id}`, {
      code: department.code,
      name: department.name
    }).subscribe();
  }

  deleteDepartment(id: number): void {
    this.httpClient.delete(`${this.apiUrl}/${id}`);
  }
}
