import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActiveGuardService } from 'src/app/core/services/can-active-guard.service';
import {ParameterDimensiComponent} from './parameter-dimensi/parameter-dimensi.component';
import {ParameterGroupComponent} from './parameter-group/parameter-group.component';
import {FinalRatingComponent} from './final-rating/final-rating.component';
import {KompositResikoComponent} from './komposit-resiko/komposit-resiko.component';
import {IcrComponent} from 'src/app/pages/master/icr/icr.component';


const routes: Routes = [
  {
    path: 'parameter-dimensi',
    component: ParameterDimensiComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Parameter Dimensi'}
  },
  {
    path: 'parameter-group',
    component: ParameterGroupComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Parameter Group'}
  },
  {
    path: 'final-rating',
    component: FinalRatingComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Final Rating'}
  },
  {
    path: 'komposit-resiko',
    component: KompositResikoComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Komposit Resiko'}
  },
  {
    path: 'icr',
    component: IcrComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Interest Coverage Ratio'}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
