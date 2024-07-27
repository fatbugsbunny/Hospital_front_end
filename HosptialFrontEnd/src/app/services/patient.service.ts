import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {AdmissionState, ClinicalData, Patient} from "../types";
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

  deletePatient(id: number): Observable<any>{
    return this.httpClient.delete<Patient>(`${this.apiUrl}/${id}`);
  }

  addAdmissionState(id: number, admissionState: AdmissionState): Observable<any> {
    console.log(admissionState);
    return this.httpClient.post<AdmissionState>(`${this.apiUrl}/${id}/admissionState`, admissionState);
  }

  setDepartment(patientId: number, departmentId: number): Observable<any> {
    return this.httpClient.put<Patient>(`${this.apiUrl}/${patientId}/department/${departmentId}`, null);
  }

  setClinicalData(patientId: number, clinicalData: ClinicalData): Observable<any> {
    return this.httpClient.put<ClinicalData>(`${this.apiUrl}/${patientId}/clinicalData`, clinicalData);
  }

   updatePatient(id: number, patient: Patient): Observable<any> {
    return this.httpClient.put<Patient>(`${this.apiUrl}/${id}`, patient);
  }

  getAllAdmissionStates(id: number): Observable<AdmissionState[]>{
    return this.httpClient.get<AdmissionState[]>(`${this.apiUrl}/${id}/allAdmissionStates`)
  }

  dischargePatient(id: number, reason: string): Observable<any>{
    const params = {params: new HttpParams().set("reason", reason)}

    return this.httpClient.put(`${this.apiUrl}/${id}/discharge`, null, params);
  }


}
