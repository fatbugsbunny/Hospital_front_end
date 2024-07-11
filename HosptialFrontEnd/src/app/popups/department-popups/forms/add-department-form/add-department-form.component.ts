import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {IonicModule} from "@ionic/angular";
import {ModalHandler} from "../../../../ModalHandler";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {DepartmentService} from "../../../../services/department.service";
import {Department} from "../../../../types";
import {catchError} from "rxjs";
import {Router} from "@angular/router";

@Component({
  standalone: true,
  selector: 'app-add-department-form',
  templateUrl: './add-department-form.component.html',
  styleUrls: ['./add-department-form.component.scss'],
  imports: [
    FormsModule,
    IonicModule,
    ReactiveFormsModule
  ]
})
export class AddDepartmentFormComponent  extends ModalHandler {
  addDepartmentForm = new FormGroup({
    code: new FormControl("", [Validators.required]),
    name: new FormControl("", [Validators.required]),
  })

  constructor(private router:Router, private departmentService: DepartmentService) {
    super()
  }

  addDepartment() {
    this.departmentService.addDepartment(this.getFormData())
      .pipe(catchError((error: HttpErrorResponse) => this.handleError(error)))
      .subscribe(async response =>
      { if(response){ this.router.navigate([this.router.url]).then(() => {
        window.location.reload()})}
      });
    this.dismiss();
  }

  private getFormData(): Department {
    const formValue = this.addDepartmentForm.value;
    return {
      code: formValue.code ?? '',
      name: formValue.name ?? '',
    };
  }
}
