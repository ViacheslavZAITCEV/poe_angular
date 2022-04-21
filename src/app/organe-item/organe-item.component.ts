import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-organe-item',
  templateUrl: './organe-item.component.html',
  styleUrls: ['./organe-item.component.scss']
})
export class OrganeItemComponent implements OnInit {
  @Input() organe:string;
  @Output() public deleteOrg: EventEmitter<string> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  deleteOrgane(){
    this.deleteOrg.emit(this.organe);
  }

}
