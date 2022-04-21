import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { RegionModel } from '../models/region.model';
import { DepartementModel } from '../models/departement.model';
import { CommuneModel } from '../models/commune.model';

@Injectable({
  providedIn: 'root'
})
export class RxjsService {

  private _mySubject$: BehaviorSubject<string> =
    new BehaviorSubject<string>('Hello!')

  private _spinnerSubject$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  baseUrl = `https://geo.api.gouv.fr`;

  constructor(
    private _http: HttpClient
  ) { }

  getMySubject(): Observable<string> {
    return this._mySubject$.asObservable();
  }

  setMySubject(value: string): void {
    this._mySubject$.next(value);
  }

  getSpinnerSubject(): Observable<boolean> {
    return this._spinnerSubject$.asObservable();
  }

  setSpinnerSubject(value: boolean): void {
    this._spinnerSubject$.next(value);
  }

  getAllRegion(): Observable<RegionModel[]> {
    return this._http.get<RegionModel[]>(`${this.baseUrl}/regions`);
  }

  getAllDeptByRegion(codeRegion: string): Observable<DepartementModel[]> {
    return this._http.get<DepartementModel[]>(
      `${this.baseUrl}/regions/${codeRegion}/departements`
    )
  }

  getAllCommunesByDept(code: string): Observable<CommuneModel[]> {
    return this._http.get<CommuneModel[]>(
      `${this.baseUrl}/departements/${code}/communes`
    )
  }


}
