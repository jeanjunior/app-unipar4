import { HomeModule } from './../home/home.module';
import { ClienteModalComponent } from './componentes/modal/cliente-modal.component';
import { ClienteComponent } from './cliente.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ToastrModule } from 'ngx-toastr';
import { ClienteRoutingModule } from './cliente-routing.module';
import { TextMaskModule } from 'angular2-text-mask';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ClienteRoutingModule,
    SharedModule,
    ToastrModule,
    TextMaskModule,
    CurrencyMaskModule,
    HomeModule,
    NgSelectModule
  ],
  declarations: [
    ClienteComponent,
    ClienteModalComponent
  ],
  entryComponents: [
    ClienteModalComponent
  ]
})
export class ClienteModule { }
