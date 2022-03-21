import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-user-edit-modal',
  templateUrl: './user-edit-modal.component.html',
  styleUrls: ['./user-edit-modal.component.scss']
})
export class UserEditModalComponent implements OnInit {
  user: any | null = null;
  modalTitle: string = 'Editing Account';
  userForm: FormGroup;

  constructor(
    public modalRef: MdbModalRef<UserEditModalComponent>,
    private api: ApiService,
  ) {
    this.userForm = new FormGroup({
      firstName: new FormControl(null, { validators: Validators.required, updateOn: 'blur' }),
      lastName: new FormControl(null, { validators: Validators.required, updateOn: 'blur' }),
      phoneNumber: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.pattern(/^[0-9\-]*$/),
          Validators.minLength(10),
        ],
        updateOn: 'blur'
      }),
      email: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.email
        ],
        updateOn: 'blur'
      }),
    });
  }

  ngOnInit(): void {
    if (this.user) {

      this.userForm.setValue({
        "firstName": this.user.firstName ?? "",
        "lastName": this.user.lastName ?? "",
        "email": this.user.email ?? "",
        "phoneNumber": this.user.phoneNumber ?? "505-555-1212",
      });

    }
    else {
      this.modalTitle = 'Create Account';
    }
  }

  get firstName(): AbstractControl {
    return this.userForm?.get('firstName')!;
  }

  get lastName(): AbstractControl {
    return this.userForm?.get('lastName')!;
  }

  get email(): AbstractControl {
    return this.userForm?.get('email')!;
  }

  get phoneNumber(): AbstractControl {
    return this.userForm?.get('phoneNumber')!;
  }


  close(): void {
    this.modalRef.close({ message: 'Modal form closed without saving', reloadData: false })
  }

  save(): void {
    let data = this.userForm.getRawValue();

    if (this.user?.id) {
      this.api.putApi(`/user/${this.user.id}`, data).subscribe((res: any) => {
        this.modalRef.close({ message: res.message, reloadData: true })
      });
    }
    else {
      this.api.postApi('/user', data).subscribe((res: any) => {
        this.modalRef.close({ message: res.message, reloadData: true })
      });
    }

  }

}
