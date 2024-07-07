import {HttpContext, HttpHeaders, HttpParams} from "@angular/common/http";

export interface Options {
  headers?: HttpHeaders | {
    [header: string]: string | string[];
  };
  observe: 'body';
  context?: HttpContext;
  params?: HttpParams | {
    [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
  };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  transferCache?: {
    includeHeaders?: string[];
  } | boolean;
}

export interface ClinicalData {
  id?: number,
  clinicalRecord: string,
}

export interface AdmissionState {
  id?: number,
  enteringDate: string,
  exitingDate: string,
  cause: string,
  reason: string,
  discharge: boolean,
  clinicalData: ClinicalData,
  patient?: Patient
}

export interface Patient {
  id?: number,
  name: string,
  lastName: string,
  birthday: string,
  department: Department,
  admissionStates: AdmissionState[]
}

export interface Department {
  id?: number,
  code: string,
  name: string,
  patients?: Patient[];
}
