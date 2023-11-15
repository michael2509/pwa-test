import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-ui';
  vapidPublicKey = 'BCxb-l5jFqHVaN1hrVSElSif1_Tq_cDAy3_XsmXWN9Lcck2WBP5Si5UzzVdBqNtA7TEWIvwppuZSw_H3-kKCu1o';

  constructor(private httpClient: HttpClient, private swPush: SwPush) { }

  ngOnInit(): void {
    this.swPush.requestSubscription({
      serverPublicKey: this.vapidPublicKey
    }).then(subscription => {
      console.log(JSON.stringify(subscription));

      this.httpClient.post("http://localhost:5000/subscribe", subscription).subscribe(() => {
        console.log("subscribed to notification");
      });
    }).catch(error => console.log);
  }


}
