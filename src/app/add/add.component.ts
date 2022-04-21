import { Component, OnInit } from '@angular/core';
import { PanierService } from '../services/panier.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  public aliment: string='Aliment';
  constructor(private panierService:PanierService) { }

  ngOnInit(): void {
  }

  add():void{
    this.panierService.panier.push(this.aliment);
    this.aliment='';
    console.log(this.panierService.panier);
  }

}
