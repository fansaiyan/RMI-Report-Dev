import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CanActiveGuardService} from 'src/app/core/services/can-active-guard.service';
import {AdjustAspekDimensiComponent} from 'src/app/pages/report/adjust-aspek-dimensi/adjust-aspek-dimensi.component';

const routes: Routes = [
  {
    path: 'adjust-aspek-dimensi',
    component: AdjustAspekDimensiComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Adjust Aspek Dimensi'}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
