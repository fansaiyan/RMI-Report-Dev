import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdjustAspekDimensiComponent} from 'src/app/pages/report/adjust-aspek-dimensi/adjust-aspek-dimensi.component';
import {CanActiveGuardService} from 'src/app/core/services/can-active-guard.service';
import {SurveyComponent} from 'src/app/pages/smi/survey/survey.component';
import {UploadDokumenComponent} from 'src/app/pages/smi/upload-dokumen/upload-dokumen.component';
import {ReportSummaryComponent} from 'src/app/pages/smi/report-summary/report-summary.component';

const routes: Routes = [
  {
    path: 'survey',
    component: SurveyComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Self Assessment'}
  },
  {
    path: 'upload-document',
    component: UploadDokumenComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Upload Document'}
  },
  {
    path: 'report-summary',
    component: ReportSummaryComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Report Summray Final Result'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SMIRoutingModule { }
