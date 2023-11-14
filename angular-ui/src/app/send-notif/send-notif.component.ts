import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-send-notif',
  templateUrl: './send-notif.component.html',
  styleUrls: ['./send-notif.component.css']
})
export class SendNotifComponent {
  notification = { title: '', body: '', icon: 'assets/icons/icon-384x384.png' };

  constructor(private http: HttpClient) { }

  submitForm() {
    this.http.post('http://localhost:5000/send-notif', this.notification)
      .subscribe(response => {
        console.log('Notification envoyée avec succès', response);
        this.notification = { title: '', body: '', icon: 'assets/icons/icon-384x384.png' };
      }, error => {
        console.error('Erreur lors de l\'envoi de la notification', error);
      });
  }
}
