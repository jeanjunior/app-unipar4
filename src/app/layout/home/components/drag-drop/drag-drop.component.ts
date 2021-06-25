import { ToastrService } from 'ngx-toastr';
import { Item } from './../../models/home.model';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.scss']
})
export class DragDropComponent implements OnInit {

  public readonly itensAll: Item[] = [];
  public readonly itensAdd: Item[] = [];

  public totais: { valor: number, qtde: number } = { valor: 0, qtde: 0 };

  constructor(
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe(params => {
      if (params.id) {
        this.toastrService.info(`ID recebido ${params.id}`);
      }
    });

    // Chamar um serviço para buscar os produtos

    for (let i = 1; i <= 20; i++) {
      this.itensAll.push(
        {
          id: i,
          descricao: `Produto - ${i}`,
          preco: Math.floor(Math.random() * 350) + 1
        }
      );
    }
  }

  public adicionarItem(item: Item): void {
    if (this.itensAdd.find(i => i == item)) {
      return;
    }
    // Adiciona na nova lista
    this.itensAdd.push(item);

    // Remove da lista de disponiveis
    const idx = this.itensAll.findIndex(i => i == item);
    this.itensAll.splice(idx, 1);

    this.calcularTotais();
  }

  public removerItem(item: Item): void {
    if (this.itensAll.find(i => i == item)) {
      return;
    }
    // Adiciona na lista de disponiveis
    this.itensAll.push(item);

    // Remove da lista de adicionados
    const idx = this.itensAdd.findIndex(i => i == item);
    this.itensAdd.splice(idx, 1);

    this.calcularTotais();
  }

  public adicionarDiv(event: any): void {
    console.log(event);
  }

  public trackById = (index: number, item?: Item) => item?.id;

  private calcularTotais(): void {
    this.totais.valor = this.itensAdd.reduce((sum, current) => sum + current.preco, 0);
    this.totais.qtde = this.itensAdd.length;
  }

}
