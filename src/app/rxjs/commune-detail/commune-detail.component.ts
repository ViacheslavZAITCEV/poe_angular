import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { catchError, concatMap, delay, filter, map, mergeMap } from 'rxjs/operators';
import { RxjsService } from '../services/rxjs.service';
import { CommuneModel } from '../models/commune.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-commune-detail',
  templateUrl: './commune-detail.component.html',
  styleUrls: ['./commune-detail.component.scss']
})
export class CommuneDetailComponent implements OnInit, OnDestroy {

  sub: Subscription = new Subscription();
  sub2: Subscription[] = [];
  selectedCommune: CommuneModel;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _rxjsService: RxjsService
  ) {
  }

  ngOnInit(): void {
    console.log('snapshot ', this._activatedRoute.snapshot.paramMap.get('code'));
    this.sub.add(
      // ANTI PATTERN
      /*this._activatedRoute.paramMap.pipe( //Observable<ParamMap>
        delay(2000),
        filter((param: ParamMap) => !!param)
      ).subscribe((param: ParamMap) => {
        const codeCommune = param.get('code');
        const codeDepartement = param.get('code').substr(0, 2);
        this._rxjsService.getAllCommunesByDept(codeDepartement)
          .subscribe({
            next: (communes: CommuneModel[]) => {
              this.selectedCommune =
                communes.find((comm: CommuneModel) => comm.code === codeCommune)
              const num = 2
            }
          }
        );
      })*/
      this._activatedRoute.paramMap.pipe(
        delay(2000),
        filter((param: ParamMap) => !!param),
        mergeMap((param: ParamMap) =>
            this._rxjsService.getAllCommunesByDept(
              param.get('code').substr(0, 2)).pipe(
              map((communes: CommuneModel[]) => {
                return { communesObject: communes, paramObject: param };
              })
            )
        ),
        catchError((err: HttpErrorResponse) => {
          console.error(err.message);
          throw of(err);
        })
      ).subscribe({
        next: ({ communesObject, paramObject }) => {
          console.debug('test')
          this.selectedCommune = communesObject.find((comm: CommuneModel) =>
            comm.code === paramObject.get('code')
          );
          this._rxjsService.setSpinnerSubject(false);
        }
      })
    );
    this.sub2.push(
      this._activatedRoute.paramMap.pipe(
      )
        .subscribe(
          {
            next: () => console.log('next'),
            error: () => console.error('error'),
            complete: () => console.log('FINISHED')
          }
        )
    );


    this._activatedRoute.paramMap.subscribe(
      () => console.log('next'),
      () => console.error('error')
    );
    this._rxjsService.setMySubject('World')
    this._rxjsService.getMySubject().subscribe({
      next: (val) => console.log('subject ', val),
      error: (err) =>  console.error(err),
      complete: () => console.log('COMPLETED!!')
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.sub2.forEach(sub => sub.unsubscribe());
  }

}
