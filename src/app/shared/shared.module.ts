import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageValidControlComponent } from './message-valid-control/message-valid-control.component';
import { CpfPipe, CpfOrCnpjPipe } from './pipes/cpf-pipe';


@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    MessageValidControlComponent,
    CpfPipe,
    CpfOrCnpjPipe
  ],
  exports: [
    MessageValidControlComponent,
    CpfPipe,
    CpfOrCnpjPipe
  ],
  entryComponents: [
    MessageValidControlComponent
  ]
})
export class SharedModule { }
