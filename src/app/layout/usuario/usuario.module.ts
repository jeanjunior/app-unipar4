import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuarioComponent } from './usuario.component';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioModalComponent } from './componentes/modal/usuario-modal/usuario-modal.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    UsuarioRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    ToastrModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule
  ],
  declarations: [
    UsuarioComponent,
    UsuarioModalComponent
  ],
  entryComponents: [
    UsuarioModalComponent
  ]
})
export class UsuarioModule { }
