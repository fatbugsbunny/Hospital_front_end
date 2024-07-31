import {Component, Input, OnInit} from '@angular/core';
import {PatientService} from "../../../../services/patient.service";
import {ModalHandler} from "../../../../ModalHandler";
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {IonButton, IonCard, IonCardHeader, IonInput, IonSelect, IonSelectOption} from "@ionic/angular/standalone";
import {NgForOf} from "@angular/common";
import {catchError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  standalone: true,
  selector: 'app-change-clinical-data-popup',
  templateUrl: './change-clinical-data-form.component.html',
  styleUrls: ['./change-clinical-data-form.component.scss'],
  imports: [
    IonButton,
    IonCard,
    IonCardHeader,
    IonSelect,
    IonSelectOption,
    NgForOf,
    IonInput,
    ReactiveFormsModule
  ]
})
export class ChangeClinicalDataFormComponent extends ModalHandler{
@Input() patientId!: number;
dataFormControl: FormControl = new FormControl('', Validators.required);

  constructor(private patientService: PatientService) {super() }

  changeClinicalData() {
    this.patientService.setClinicalData(this.patientId,this.dataFormControl.value).pipe(catchError((error:HttpErrorResponse)=>this.handleError(error))).subscribe(async response => {if (response){this.refreshPage()}})
    this.dismiss();
  }

}
