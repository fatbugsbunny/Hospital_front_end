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
  IonGrid, IonRow, IonCol, IonButton, IonModal
} from '@ionic/angular/standalone';
import {DepartmentService} from "../services/department.service";
import {Department, Patient} from "../types";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-department',
  templateUrl: 'department.page.html',
  styleUrls: ['department.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonGrid, IonRow, IonCol, CommonModule, IonButton, FormControl, ReactiveFormsModule, IonModal],
})
export class DepartmentPage implements OnInit{
  departments: Department[] = [];
  department?: Department;
  addDepartmentForm = new FormGroup({
    code: new FormControl(""),
    name: new FormControl(""),
});
  isModalOpen: boolean = false;

  constructor(private departmentService: DepartmentService) {
  }

  ngOnInit() {
    this.departmentService.getAllDepartments().subscribe(departments => this.departments = departments);
  }

  // addDepartment() {
  //   this.departmentService.addDepartment(this.addDepartmentForm.value);
  // }

  edit(department: Department){
    this.department = department;

  }

  openModal(){
    this.isModalOpen = true;
  }

  closeModal(){
    this.isModalOpen = false;
  }


}


