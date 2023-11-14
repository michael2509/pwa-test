import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SwPush } from "@angular/service-worker";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-ui';
  vapidPublicKey = "BN6Dgs22Lox_eHucrca1GIlpeBh-iboEox_O4mE1mMC6EbZqy49MDlkg8o_xnc4wzKRQjKcsaebXeeabIjJqdyk";

  constructor(private httpClient: HttpClient, private swPush: SwPush) { }

  ngOnInit(): void {
    this.swPush.requestSubscription({ serverPublicKey: this.vapidPublicKey })
      .then((subscription) => {
        this.httpClient.post("https://back-backup.onrender.com/subscribe", subscription)
          .subscribe(() => console.log("subscribed to notif"))
      })
      .catch(error => console.log(error))
  }
}
