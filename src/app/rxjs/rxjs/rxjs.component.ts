import { Component, OnInit } from '@angular/core';
import { RxjsService } from '../services/rxjs.service';
import { Observable } from 'rxjs';
import { RegionModel } from '../models/region.model';
import { DepartementModel } from '../models/departement.model';
import { CommuneModel } from '../models/commune.model';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.scss'],
})
export class RxjsComponent implements OnInit {

  regionList$: Observable<RegionModel[]> = this._rxjsService.getAllRegion();
  departementList$: Observable<DepartementModel[]>;
  departementList: DepartementModel[];
  communeList$: Observable<CommuneModel[]>;
  cols: { header: string, field: string }[] = [
    { header: 'Code', field: 'code' },
    { header: 'Code département', field: 'codeDepartement' },
    { header: 'Code postaux', field: 'codesPostaux' },
    { header: 'Nom', field: 'nom' },
    { header: 'Population', field: 'population' }
  ];

  constructor(
    private _rxjsService: RxjsService,
    private _router: Router
  ) {
  }

  ngOnInit(): void {

  }

  changeDeptList(event: { originalEvent: PointerEvent, value: RegionModel }): void {
    this.departementList$ = this._rxjsService.getAllDeptByRegion(event?.value?.code);
  }

  changecommList(event: { originalEvent: PointerEvent, value: DepartementModel }) {
    this.communeList$ = this._rxjsService.getAllCommunesByDept(
      event?.value?.code).pipe(
        map((communes: CommuneModel[]) =>
          communes.map((commune: CommuneModel) =>
               ({...commune, codesPostaux: [commune.codesPostaux.join(' - ')]})

          )
        )
    );
  }

  goToDetail(codeCommune: string): void {
    this._rxjsService.setSpinnerSubject(true);
    this._router.navigate([`/rxjs/${codeCommune}`]).then(x => x);
  }

}
