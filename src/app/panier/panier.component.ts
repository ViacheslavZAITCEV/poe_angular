import { Component, OnInit } from '@angular/core';
import { PanierService } from '../services/panier.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.scss']
})
export class PanierComponent implements OnInit {
  public panier: string[] = [];
  constructor(private panierService:PanierService) { }

  ngOnInit(): void {
    this.panier = this.panierService.panier;
  }

}
