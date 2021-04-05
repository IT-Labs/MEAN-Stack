import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ms-modal',
  templateUrl: './ms-modal.component.html',
})
export class MsModal {
  @Input() modalTitle: string;
  @Input() modalBody: string;
  @Input() confirmMsg: string;
  @Input() declineMsg: string;
  @Output() confirm = new EventEmitter();
  @Output() decline = new EventEmitter();
}
