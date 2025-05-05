import { Component } from '@angular/core';
import { TimeCapsuleComponent } from './time-capsule/time-capsule.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TimeCapsuleComponent],
  template: '<app-time-capsule></app-time-capsule>',
})
export class AppComponent {
  title = 'capsula-del-tiempo';
  }
