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
  birthDate: string,
  department: Department,
  admissionStates: AdmissionState[]
}

export interface Department {
  id?: number,
  code: string,
  name: string,
  patients?: Patient[];
}
