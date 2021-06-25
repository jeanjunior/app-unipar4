import { VendaMes } from './../models/home.model';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BaseRestService } from 'src/app/shared/services/base-rest.service';

@Injectable({
  providedIn: 'root'
})
export class GraficoService extends BaseRestService {

  public vendasPorMes(): Observable<VendaMes[]> {
    return this.getter<VendaMes[]>('graficos/vendas-por-mes').pipe(take(1));
  }

}
