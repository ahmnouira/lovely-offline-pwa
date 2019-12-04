import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CoreModule {

  //  To make sure that CoreModule will not imported multiple times 
  constructor(@Optional() @SkipSelf() parentModule: CoreModule  ) {
    if(parentModule) {
      throw new Error(`CoreModule has already been loaded, Import CoreModule in the AppModule.`);
    }

  }
 }
