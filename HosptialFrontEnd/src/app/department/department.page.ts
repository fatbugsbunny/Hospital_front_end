import { Component, OnInit } from '@angular/core';
import {CommonModule} from "@angular/common";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonGrid, IonRow, IonCol, IonButton, IonModal, IonButtons, IonInput, ModalController, IonSearchbar
} from '@ionic/angular/standalone';
import {DepartmentService} from "../services/department.service";
import {Department} from "../types";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DepartmentFormComponent} from "../popups/forms/department-form/department-form.component";

@Component({
  selector: 'app-department',
  templateUrl: 'department.page.html',
  styleUrls: ['department.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonGrid, IonRow, IonCol, CommonModule, IonButton, ReactiveFormsModule, IonModal, IonButtons, IonInput, FormsModule, IonSearchbar],
})
export class DepartmentPage implements OnInit{
  data!: Department[];
  departments: Department[] = [];

  constructor(public modalController: ModalController, private departmentService: DepartmentService) {}

  ngOnInit(){
    this.departmentService.getAllDepartments().subscribe(departments => {this.data = departments; this.departments = departments});
  }

  async openModal(department: Department){
    const modal = await this.modalController.create({
      component: DepartmentFormComponent,
      componentProps: {
        department
      }
    });
    return await modal.present();
  }

  // @ts-ignore
  handleInput(event) {
    const query = event.target.value.toLowerCase();
    this.departments = this.data.filter((d) => d.name.toLowerCase().indexOf(query) > -1);
  }
}


