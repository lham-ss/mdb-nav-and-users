import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, tap, map } from 'rxjs/operators';

import { UserEditModalComponent } from 'src/app/modals/user-edit-modal/user-edit-modal.component';
import { ConfirmModalComponent } from 'src/app/modals/confirm-modal/confirm-modal.component';

import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ApiService } from 'src/app/services/api.service';


export interface User {
  firstName: string;
  lastName: string;
  phoneNumber: string,
  isActive: boolean;
  roles: Array<string>;
}

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  loading: boolean = true;
  dataSource$ !: Observable<any[]>;
  userModalRef: MdbModalRef<UserEditModalComponent> | null = null;
  confirmationModalRef: MdbModalRef<ConfirmModalComponent> | null = null;

  constructor(
    private api: ApiService,
    private modals: MdbModalService,
  ) { }

  ngOnInit(): void {
    this.reloadData();
  }

  headers = ['First Name', 'Last Name', 'Phone Number', 'Email', 'Is Active', 'Actions'];

  reloadData(): void {
    this.loading = true;

    this.dataSource$ = this.api.getApi('/user/').pipe(
      delay(500),
      map(x => x?.users),
      tap(() => (this.loading = false))
    );
  }

  logData(data: any) {
    console.log(data);
  }

  deleteUserWithConfirmation(user: any) {
    this.confirmationModalRef = this.modals.open(ConfirmModalComponent, {
      data: {
        modalTitle: 'DELETE USER?',
        modalBody: 'Please confirm that you wish to delete user ' + user.firstName + '...',
      }
    });

    this.confirmationModalRef.onClose.subscribe((result: any) => {
      if (result.confirmed) {
        this.api.deleteApi(`/user/${user.id}`).subscribe((res: any) => {
          console.log(res.message);
          this.reloadData();
        });
      }
      else {
        console.log('Deletion not confirmed...')
      }
    })
  }

  openUserEditModal(userData: any) {
    this.userModalRef = this.modals.open(UserEditModalComponent, {
      data: {
        user: userData,
      }
    });

    this.userModalRef.onClose.subscribe((result: any) => {
      if (result?.reloadData) {
        this.reloadData();
      }
    });
  }


}
