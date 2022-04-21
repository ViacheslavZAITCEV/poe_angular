import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-exercices',
  templateUrl: './exercices.component.html',
  styleUrls: ['./exercices.component.scss']
})
export class ExercicesComponent implements OnInit, OnDestroy {
  secondes:number;
  sub:Subscription;
  constructor() { }

  ngOnInit(): void {
    const counter$ = interval(1000);
    this.sub=counter$.subscribe(
      value => {
        this.secondes = value;
      },
      error => {
        console.log('Error! : ' + error);
      },
      () => {
        console.log('Observable complete!');
      }
    );

  }

  lastUpdate = new Date();
  lastUpdateAsync = new Promise((resolve, reject) => {
    const date = new Date();
    setTimeout(
      () => {
        resolve(date);
      }, 2000
    );
  });

  ngOnDestroy(){
    this.sub.unsubscribe();
  }
  

}
