import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RxjsService } from './rxjs/services/rxjs.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'exemples';
  public myForm: FormGroup;
  loading$: Observable<boolean> = this._rxjsService.getSpinnerSubject();

  constructor(
    private _rxjsService: RxjsService
  ) {
  }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      username: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl('')
    });
    console.log(this.myForm);

  }

}
