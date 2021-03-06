import { AppareilService, IAppareil } from './../services/appareil.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-appareil-view',
  templateUrl: './appareil-view.component.html',
  styleUrls: ['./appareil-view.component.scss'],
})
export class AppareilViewComponent implements OnInit {
  appareils!: IAppareil[];
  appareilSubscription!: Subscription;

  lastUpdated = new Promise<Date>((resolve, reject) => {
    const date = new Date();
    setTimeout(() => {
      resolve(date);
    }, 2000);
  });

  constructor(private appareilService: AppareilService) {}

  ngOnInit() {
    this.appareilSubscription = this.appareilService.appareilSubject.subscribe(
      (appareils: IAppareil[]) => {
        this.appareils = appareils;
      }
    );
    this.onFetch();
    this.appareilService.emitAppareilSubject();
  }

  onAllumer() {
    this.appareilService.switchOnAll();
  }

  onEteindre() {
    this.appareilService.switchOffAll();
  }

  onSave() {
    this.appareilService.saveAppareilToServer();
  }

  onFetch() {
    this.appareilService.getAppareilFromServer();
  }
}
