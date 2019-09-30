import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from '../shared/shared.module';

import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [
    CommonModule, SharedModule
  ],
  exports : [HeaderComponent, FooterComponent]
})
export class LayoutModule { }
