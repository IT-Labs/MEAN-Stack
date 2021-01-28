import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ks-modal',
  templateUrl: './ks-modal.component.html',
})
export class KsModal {
  @Input() modalTitle: string;
  @Input() modalBody: string;
  @Input() confirmMsg: string;
  @Input() declineMsg: string;
  @Output() confirm = new EventEmitter();
  @Output() decline = new EventEmitter();
}
