import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-numero',
  templateUrl: './card-numero.component.html',
  styleUrls: ['./card-numero.component.scss']
})
export class CardNumeroComponent {

  @Input()
  titulo?: String;

  @Input()
  valor?: number;

  constructor() { }

}
