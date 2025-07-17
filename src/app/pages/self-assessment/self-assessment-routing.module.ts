import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdjustAspekDimensiComponent} from 'src/app/pages/report/adjust-aspek-dimensi/adjust-aspek-dimensi.component';
import {CanActiveGuardService} from 'src/app/core/services/can-active-guard.service';
import {InputSurveyComponent} from 'src/app/pages/self-assessment/input-survey/input-survey.component';

const routes: Routes = [
  {
    path: 'self-assessment',
    component: InputSurveyComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Self Assessment'}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SelfAssessmentRoutingModule { }
