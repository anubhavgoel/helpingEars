import { Component, OnInit, AfterViewInit } from "@angular/core";
import { MessagingService } from "../core/messaging.service";
import { AuthService } from "../core/auth.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit, AfterViewInit {
  constructor(private msgService: MessagingService, public auth: AuthService) {}

  ngOnInit() {
    (window as any).addEventListener(
      'custom-event',
      e => {
        this.msgService.sendMessages(e.detail);
      },
      false
    );
  }

  async ngAfterViewInit(): Promise<any> {
    await this.loadScript('../../assets/script/p5/p5.js');
    await this.loadScript('../../assets/script/p5/addons/p5.dom.js');
    await this.loadScript('../../assets/script/p5/addons/p5.sound.js');
    await this.loadScript('../../assets/script/script.1.js');
  }

  loadScript(scriptUrl: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = scriptUrl;
      scriptElement.onload = resolve;
      document.body.appendChild(scriptElement);
    });
  }
}
