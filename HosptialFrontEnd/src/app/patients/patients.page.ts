import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonRow, IonSearchbar,
  IonTitle,
  IonToolbar, ModalController
} from '@ionic/angular/standalone';
import {Patient} from "../types";
import {PatientService} from "../services/patient.service";
import {AddPatientFormComponent} from "../popups/patient-popups/forms/add-patient-form/add-patient-form.component";
import {
  DeletePatientPopupComponent
} from "../popups/patient-popups/delete-patient-popup/delete-patient-popup.component";
import {EditPatientFormComponent} from "../popups/patient-popups/forms/edit-patient-form/edit-patient-form.component";
import {Router, RouterLink} from "@angular/router";
import {HttpParams} from "@angular/common/http";
import {
  ChangeDepartmentFormComponent
} from "../popups/patient-popups/forms/change-department-form/change-department-form.component";

@Component({
  selector: 'app-patients',
  templateUrl: './patients.page.html',
  styleUrls: ['./patients.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonCol, IonGrid, IonRow, IonSearchbar, RouterLink]
})
export class PatientsPage implements OnInit {
  data!: Patient[];
  patients: Patient[] = [];

  constructor(private router: Router, public modalController: ModalController, private patientService: PatientService) { }

  ngOnInit() {
    this.patientService.getAllPatients().subscribe(patients => {this.patients = patients; this.data = patients});
  }

  // @ts-ignore
  handleInput(event) {
    const query = event.target.value.toLowerCase();
    this.patients = this.data.filter((d) => d.name.toLowerCase().indexOf(query) > -1);
  }

  async openAddPatientForm(){
    const modal = await this.modalController.create({
      component: AddPatientFormComponent
    })
    return await modal.present();
  }

  async openDeletePatientPopup(id: number){
    const modal = await this.modalController.create({
      component: DeletePatientPopupComponent,
      componentProps: {
        id
      }
    })
    return await modal.present();
  }

  async openEditPatientForm(patient: Patient){
    const modal = await this.modalController.create({
      component: EditPatientFormComponent,
      componentProps: {
        patient
      }
    })
    return await modal.present();
  }

  async openChangeDepartmentForm(patientId: number){
    const modal = await this.modalController.create({
      component: ChangeDepartmentFormComponent,
      componentProps: {
        patientId
      }
    })
    return await modal.present();
  }

  openAdmissionsPage(patientId: number){
    this.router.navigate(['/admissions', patientId]);
  }
}
