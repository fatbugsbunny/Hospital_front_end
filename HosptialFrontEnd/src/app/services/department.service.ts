import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Department, Options, Patient} from "../types";
@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private httpClient: HttpClient) { }

  getAllDepartments(): Observable<Department[]> {
    return this.httpClient.get<Department[]>("http://localhost:8080/department/all");
  }

  addDepartment(department: Department): void{
    this.httpClient.post<Department>("http://localhost:8080/department/add",department)
  }

}
