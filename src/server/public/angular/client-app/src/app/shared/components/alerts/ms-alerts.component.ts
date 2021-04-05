import { Component, Input } from '@angular/core';

@Component({
  selector: 'ms-alerts',
  template: `
    <div class="ms-alerts__container__{{ role }}">
      {{ content }}
    </div>
  `,
})
export class MsAlertsComponent {
  @Input() content: string;
  @Input() role: string;
}
