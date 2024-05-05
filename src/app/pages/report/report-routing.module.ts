import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CanActiveGuardService} from 'src/app/core/services/can-active-guard.service';
import {AdjustAspekDimensiComponent} from 'src/app/pages/report/adjust-aspek-dimensi/adjust-aspek-dimensi.component';
import {AspekKinerjaReportComponent} from 'src/app/pages/report/aspek-kinerja-report/aspek-kinerja-report.component';
import {
  AspekKinerjaDetailComponent
} from 'src/app/pages/report/aspek-kinerja-report/aspek-kinerja-detail/aspek-kinerja-detail.component';
import {AspekDimensiComponent} from 'src/app/pages/report/aspek-dimensi/aspek-dimensi.component';
import {
  AspekDimensiDetailComponent
} from 'src/app/pages/report/aspek-dimensi/aspek-dimensi-detail/aspek-dimensi-detail.component';
import {
  FormAspekKinerjComponent
} from 'src/app/pages/report/aspek-kinerja-report/form-aspek-kinerj/form-aspek-kinerj.component';

const routes: Routes = [
  {
    path: 'adjust-aspek-dimensi',
    component: AdjustAspekDimensiComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Detail Aspek Dimensi'}
  },
  {
    path: 'aspek-dimensi',
    component: AspekDimensiComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Aspek Dimensi'}
  },
  {
    path: 'aspek-dimensi/:survey_id',
    component: AspekDimensiDetailComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Aspek Dimensi Detail'}
  },
  {
    path: 'aspek-kinerja',
    component: AspekKinerjaReportComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Report Aspek Kinerja'}
  },
  {
    path: 'aspek-kinerja/:id/survey/:survey_id',
    component: AspekKinerjaDetailComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Report Ringkasan Hasil Penilaian RMI'}
  },
  {
    path: 'aspek-kinerja/form-aspek-kinerja/:id',
    component: FormAspekKinerjComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Form Aspek Kinerja'}
  },
  {
    path: 'aspek-kinerja/form-aspek-kinerja',
    component: FormAspekKinerjComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Form Aspek Kinerja'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
