import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {
  modalTitle: string = "";
  modalBody: string = "";

  constructor(
    private modalRef: MdbModalRef<ConfirmModalComponent>
  ) {

  }

  ngOnInit(): void {
  }

  close(): void {
    this.modalRef.close({ message: 'Modal closed without confirmation.', confirmed: false })
  }

  confirm(): void {
    this.modalRef.close({ message: 'Modal closed with confirmation.', confirmed: true });
  }


}
