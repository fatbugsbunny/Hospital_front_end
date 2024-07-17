import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Department} from "../types";

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

  addDepartment(department: Department): Observable<any> {
   return this.httpClient.post<Department>(`${this.apiUrl}/add`, department);
  }

  editDepartment(id: number, department: Department): Observable<any> {
    return this.httpClient.put<Department>(`${this.apiUrl}/${id}`, {
      code: department.code,
      name: department.name
    })
  }


  deleteDepartment(id: number): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/${id}`);
  }

}
