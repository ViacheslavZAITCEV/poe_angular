import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, interval, Observable, Observer, Subject, Subscription } from 'rxjs';
import {map, filter} from 'rxjs/operators';

interface User {
  name: string,
  age: number,
  email: string
}

@Component({
  selector: 'app-test-binding',
  templateUrl: './test-binding.component.html',
  styleUrls: ['./test-binding.component.scss']
})
export class TestBindingComponent implements OnInit, OnDestroy {
  nom: string;
  inputType = "date";
  compteur: number;
  content = "";
  sexe = "";
  color = "green";
  monNom = "";
  articles: any[] = [{ "reference": "pomme", "prix": 1.5 }, { "reference": "poire", "prix": 1.2 }];
  today: Date;
  name: Promise<string>;
  cpt: Observable<number>;
  lastUpdateAsync: Promise<Date>;
  organe: string;
  organes: string[] = [];
  obs$: Observable<any>;
  sub: Subscription;
  sub2: Subscription;
  email:string;


  constructor() {
    this.nom = "Déborah";
    this.compteur = 0;
    setTimeout(() => {
      this.inputType = "number";
    }, 3000);
    this.today = new Date();
  }

  ngOnInit(): void {
    this.name = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('Paul');
      }, 3000)
    })
    this.cpt = interval(1000);

    this.obs$ = new Observable((observer: Observer<any>) => {
      observer.next(2);
      observer.next(3);
      setTimeout(() => {
        observer.next(45);
      }, 2000)
      observer.error('Message d erreur');
      observer.next(4);
      //observer.complete();
    })

    this.sub = this.obs$.subscribe({
      next: x => console.log('[next] :', x),
      complete: () => console.log('[complete]'),
      error: x => console.log('[error] :', x)
    })


    //dans ngOnInit
    this.sub2 = this.obs$.subscribe(
      x => console.log('[sub2 next] :', x),
      x => console.log('[sub2 error] :', x)
    );

    const subj = new Subject<number>();

    

    const s1 = subj.subscribe((x: number) => {
      console.log('[s1] : ', x);
    })
    

    const s2 = subj.subscribe((x: number) => {
      console.log('[s2] : ', x);
    })
    subj.next(2);
    s1.unsubscribe();
    subj.next(3);

    const subj2 = new BehaviorSubject<number>(0);

    subj2.next(2);

    const s3 = subj2.subscribe((x: number) => {
      console.log('[s3] : ', x);
    })

    const s4 = subj2.subscribe((x: number) => {
      console.log('[s4] : ', x);
    })

    const subjectPipe = new BehaviorSubject<User>({
      name: 'jean',
      age: 28,
      email: 'jean@gmail.com'
    });

    const sub1 = subjectPipe.subscribe((x: User) => {
      console.log('[sub1] : ', x);
    })

    const sub2 = subjectPipe.pipe(
      map((user: User) => {
        return user.email;
      })
    ).subscribe((email: string) => {
      console.log('exemple utilisation de map : ', email);
    })


    const sub3 = subjectPipe.pipe(
      filter((user: User) => {
        return true; //essayer avec return false  
      }),
      map((user: User) => {
        return user.email;
      })
    ).subscribe((email: string) => {
      console.log('exemple utilisation de filter : ', email);
    })


  }


  public afficheMomentActuel(): string {
    let auj = new Date();
    return auj.toLocaleDateString('fr-FR') + " " + auj.toLocaleTimeString();
  }
  public incrementeCompteur() {
    this.compteur++;
  }

  deleteOrgane(organe) {
    this.organes.splice(this.organes.indexOf(organe), 1);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.sub2.unsubscribe();

  }
}
