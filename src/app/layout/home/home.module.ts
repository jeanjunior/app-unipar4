import { DragDropComponent } from './components/drag-drop/drag-drop.component';
import { GraficoProdutoComponent } from './components/grafico-produto/grafico-produto.component';
import { CardNumeroComponent } from './components/card-numero/card-numero.component';
import { CardComponent } from './components/card/card.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { ChartsModule } from 'ng2-charts';
import { CardGraficoComponent } from './components/card-grafico/card-grafico.component';
import { DndModule } from 'ng2-dnd';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    HomeRoutingModule,
    ChartsModule,
    DndModule.forRoot()
  ],
  declarations: [
    HomeComponent,
    CardGraficoComponent,
    CardComponent,
    CardNumeroComponent,
    GraficoProdutoComponent,
    DragDropComponent
  ],
  exports: [
    GraficoProdutoComponent
  ]
})
export class HomeModule { }
