import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, tap, map } from 'rxjs/operators';

import { UserEditModalComponent } from 'src/app/modals/user-edit-modal/user-edit-modal.component';
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
  modalRef: MdbModalRef<UserEditModalComponent> | null = null;

  constructor(
    private api: ApiService,
    private modals: MdbModalService,
  ) { }

  ngOnInit(): void {
    this.dataSource$ = this.api.getApi('/user/').pipe(
      delay(2000),
      map(x => x?.users),
      tap(() => (this.loading = false))
    );
  }

  headers = ['First Name', 'Last Name', 'Phone Number', 'Email', 'Is Active', 'Actions'];

  reloadData(): void {
    this.loading = true;
    this.dataSource$ = this.api.getApi('/user/').pipe(
      delay(2000),
      map(x => x?.users),
      tap(() => (this.loading = false))
    );
  }

  logData(data: any) {
    console.log(data);
  }

  openUserEditModal(userData: any) {
    this.modals.open(UserEditModalComponent, { data: userData });
  }


}
