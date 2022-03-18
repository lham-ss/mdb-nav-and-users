import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-user-edit-modal',
  templateUrl: './user-edit-modal.component.html',
  styleUrls: ['./user-edit-modal.component.scss']
})
export class UserEditModalComponent implements OnInit {
  user: any | null = null;
  userForm: FormGroup;

  constructor(
    public modalRef: MdbModalRef<UserEditModalComponent>,
  ) {
    this.userForm = new FormGroup({
      firstName: new FormControl(null, { validators: Validators.required, updateOn: 'blur' }),
      lastName: new FormControl(null, { validators: Validators.required, updateOn: 'blur' }),
    });
  }

  ngOnInit(): void {
    if (this.user) {
      this.userForm.setValue({
        "firstName": this.user.firstName,
        "lastName": this.user.lastName
      });
    }
  }

  get firstName(): AbstractControl {
    return this.userForm?.get('firstName')!;
  }

  get lastName(): AbstractControl {
    return this.userForm?.get('lastName')!;
  }


  close(): void {
    const closeMessage = 'Modal closed';

    /* save here in case we share this modal in other components -lham */

    this.modalRef.close(closeMessage)
  }

}
