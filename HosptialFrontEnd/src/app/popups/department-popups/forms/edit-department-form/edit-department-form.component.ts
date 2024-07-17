import {Component, Inject, Input, OnInit} from '@angular/core';
import {Department} from "../../../../types";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {IonicModule} from "@ionic/angular";
import {DepartmentService} from "../../../../services/department.service";
import {MatButton} from "@angular/material/button";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatLabel} from "@angular/material/form-field";
import {ModalController} from "@ionic/angular/standalone";
import {ErrorHandlePopupComponent} from "../../../error-handle-popup/error-handle-popup.component";
import {ModalHandler} from "src/app/ModalHandler";
import {catchError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-edit-department-form',
  templateUrl: './edit-department-form.component.html',
  standalone: true,
  styleUrls: ['./edit-department-form.component.scss'],
  imports: [
    IonicModule,
    ReactiveFormsModule,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    FormsModule,
  ]
})
export class EditDepartmentFormComponent extends ModalHandler implements OnInit {
  @Input() department!: Department;

  editDepartmentForm = new FormGroup({
    code: new FormControl("", [Validators.required]),
    name: new FormControl("", [Validators.required]),
  });

  ngOnInit() {
    this.editDepartmentForm.controls.name.setValue(this.department.name);
    this.editDepartmentForm.controls.code.setValue(this.department.code);
  }

  constructor(private router:Router,private departmentService: DepartmentService) {
    super();
  }

  editDepartment() {
    this.departmentService.editDepartment(this.department.id!, this.getFormData())
      .pipe(catchError((errorResponse: HttpErrorResponse) => this.handleError(errorResponse)))
      .subscribe(async response =>
      { if(response){ this.router.navigate([this.router.url]).then(() => {
        window.location.reload()})}
      });
    this.dismiss();
  }

  private getFormData(): Department {
    const formValue = this.editDepartmentForm.value;
    return {
      code: formValue.code ?? '',
      name: formValue.name ?? '',
    };
  }
}
