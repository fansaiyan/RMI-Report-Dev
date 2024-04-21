import { NgModule } from '@angular/core';
import { MasterRoutingModule } from './master-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ParameterDimensiComponent } from './parameter-dimensi/parameter-dimensi.component';
import { ParameterGroupComponent } from './parameter-group/parameter-group.component';
import { FinalRatingComponent } from './final-rating/final-rating.component';
import { KompositResikoComponent } from './komposit-resiko/komposit-resiko.component';


@NgModule({
  declarations: [
    ParameterDimensiComponent,
    ParameterGroupComponent,
    FinalRatingComponent,
    KompositResikoComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    MasterRoutingModule
  ]
})
export class MasterModule { }
