import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-time-capsule',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './time-capsule.component.html',
  styleUrls: ['./time-capsule.component.css']
})
export class TimeCapsuleComponent {
  userMessage: string = '';
  encryptedMessage: string = '';
  decryptedMessage: string = '';
  countdown: number = 10;
  interval: any;
  title = 'capsula-del-tiempo';

  sendMessage() {
    if (!this.userMessage) return;

    this.encryptedMessage = CryptoJS.AES.encrypt(this.userMessage, 'secret-key').toString();
    this.decryptedMessage = '';
    this.countdown = 10;
    clearInterval(this.interval);
    this.startCountdown();
  }

  startCountdown() {
    this.interval = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--;
      } else {
        clearInterval(this.interval);
        this.decryptMessage();
      }
    }, 1000);
  }

  decryptMessage() {
    const bytes = CryptoJS.AES.decrypt(this.encryptedMessage, 'secret-key');
    this.decryptedMessage = bytes.toString(CryptoJS.enc.Utf8);
  }
}
