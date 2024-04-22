import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CanActiveGuardService} from 'src/app/core/services/can-active-guard.service';
import {AdjustAspekDimensiComponent} from 'src/app/pages/report/adjust-aspek-dimensi/adjust-aspek-dimensi.component';
import {AspekKinerjaReportComponent} from 'src/app/pages/report/aspek-kinerja-report/aspek-kinerja-report.component';

const routes: Routes = [
  {
    path: 'adjust-aspek-dimensi',
    component: AdjustAspekDimensiComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Adjust Aspek Dimensi'}
  },
  {
    path: 'aspek-kinerja',
    component: AspekKinerjaReportComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Report Aspek Kinerja'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
