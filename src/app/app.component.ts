import { Component, OnInit } from '@angular/core';
import { MessagingService } from './core/messaging.service';
import { AuthService } from './core/auth.service';
import { Observable, Subject, ReplaySubject, from, of, range } from 'rxjs';
import { map, filter, switchMap, take } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(public msg: MessagingService, public auth: AuthService) {}

  ngOnInit() {
    this.auth.user
      .pipe(
        filter(user => !!user),
        take(1)
      ) // filter null
      // take first real user)

      .subscribe(user => {
        if (user) {
          this.msg.getPermission(user);
          this.msg.monitorRefresh(user);
          this.msg.receiveMessages();
        }
      });
  }
}
