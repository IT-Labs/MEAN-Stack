import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AlertsEnum } from '../shared/alerts.enum';

@Component({
  selector: 'kitchen-sink',
  templateUrl: './kitchen-sink.component.html',
})
export class KitchenSinkComponent {
  constructor(private modalService: BsModalService) {}
  tableHeadItems = ['Id', 'Name', 'SwiftCode', 'Actions'];
  items = [
    {
      _id: '5eb060deb7450735fc26a004',
      name: 'Komercijalna Banka AD Skopje',
      swiftCode: 'KOBSMK2X',
    },
    {
      _id: '5eb061c3f7ff403bd027e133',
      name: 'TTK Banka AD Skopje',
      swiftCode: 'TTXBMK2X',
    },
    {
      _id: '5eb063975e65f72f781a39e7',
      name: 'Stopanska Banka AD Bitola',
      swiftCode: 'STBBMK22',
    },
  ];

  formGroup: FormGroup = new FormGroup({
    searchInput: new FormControl(''),
  });
  modalTitle = 'Modal sample';
  modalBody = 'This is sample for Modal that you can reuse.';
  AlertsEnum = AlertsEnum;

  openModal(modal) {
    this.modalService.show(modal);
  }

  closeModal() {
    this.modalService.hide();
  }
}
