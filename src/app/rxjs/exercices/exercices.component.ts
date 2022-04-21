import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin, from, interval, merge, Observable, of, Subscription, zip } from 'rxjs';
import { filter, first, map, mapTo, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-exercices',
  templateUrl: './exercices.component.html',
  styleUrls: ['./exercices.component.scss']
})
export class ExercicesComponent implements OnInit, OnDestroy {

  monObservable$: Observable<number> = of(1, 2, 3, 4, 5);
  sub: Subscription = new Subscription();

  constructor() {
  }

  ngOnInit(): void {
    // of()
    this.sub.add(
      this.monObservable$.subscribe({
        next: (res) => console.log('of', res)
      })
    );
    // from()
    this.sub.add(
      from([1, 2, 3, 4, 5]).subscribe(
        (val) => console.log('from ', val)
      )
    );
    //map()
    this.sub.add(
      of(1, 2, 3, 4, 5).pipe(
        map((res: number) => res * 10)
      ).subscribe(
        (res: number) => console.log('map ', res)
      )
    );

    //merge()
    /*const first$ = interval(2500);
    const second$ = interval(2000);
    const third$ = interval(1500);
    const fourth$ = interval(1000);
    merge(
      first$.pipe(mapTo('FIRST')),
      second$.pipe(mapTo('SECOND')),
      third$.pipe(mapTo('THIRD')),
      fourth$.pipe(mapTo('FOURTH'))
    ).subscribe((val) => console.log(val));*/

    // filter()
    this.sub.add(
      of(1, 2, 3, 4, 5).pipe(
        filter((res) => res > 2)
      ).subscribe(
        (res) => console.log('filter ', res)
      )
    );

    // take, //tap()
    of(1, 2, 3, 4, 5).pipe(
      tap((res) => console.log('tap', res)),
      filter((res) => res > 2),
      take(2)
    ).subscribe(
      (res) => console.log('first ', res)
    );

    //zip => garde la valeur du dernier evenement simultané
    const myObs$: Observable<boolean> = of(true, true);
    const myObs2$: Observable<number> = of(1, 2, 3, 4, 5);
    this.sub.add(
      zip(myObs$, myObs2$).subscribe({
          next: ([obs1, obs2]) => {
            if (obs1 === true) {
              console.log('zip ', obs2);
            }
          }
        }
      )
    );
    // forkjoin => garde la derniere valeur
    this.sub.add(
      forkJoin([myObs$, myObs2$]).subscribe({
          next: ([obs1, obs2]) => {
            if (obs1 === true) {
              console.log('forkjoin ', obs2);
            }
          }
        }
      )
    );


  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


}
