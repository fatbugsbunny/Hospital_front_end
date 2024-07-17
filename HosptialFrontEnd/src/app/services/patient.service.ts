import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AdmissionState, Patient} from "../types";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private apiUrl = 'http://localhost:8080/patient'

  constructor(private httpClient: HttpClient) { }

  getAllPatients(): Observable<Patient[]>{
    return this.httpClient.get<Patient[]>(`${this.apiUrl}/all`);
  }

  addPatient(patient: Patient): Observable<any> {
    return this.httpClient.post<Patient>(`${this.apiUrl}/add`,patient);
  }

  addAdmissionState(id: number, admissionState: AdmissionState): Observable<any> {
    return this.httpClient.post<AdmissionState>(`${this.apiUrl}/${id}/admissionState`, admissionState);
  }

  setDepartment(patientId: number, departmentId: number): Observable<any> {
    return this.httpClient.put<Patient>(`${this.apiUrl}/${patientId}/department${departmentId}`, null);
  }



}
