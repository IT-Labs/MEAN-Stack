import { Component, Input } from '@angular/core';

@Component({
  selector: 'ks-alerts',
  template: `
    <div class="ks-alerts__container__{{ role }}">
      {{ content }}
    </div>
  `,
})
export class KsAlertsComponent {
  @Input() content: string;
  @Input() role: string;
}
