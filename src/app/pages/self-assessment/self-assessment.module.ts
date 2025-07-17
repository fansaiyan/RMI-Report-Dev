import { NgModule } from '@angular/core';
import { SelfAssessmentRoutingModule } from './self-assessment-routing.module';
import {CoreModule} from 'src/app/core/core.module';
import {SharedModule} from 'src/app/shared/shared.module';
import { InputSurveyComponent } from './input-survey/input-survey.component';


@NgModule({
  declarations: [
    InputSurveyComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    SelfAssessmentRoutingModule
  ]
})
export class SelfAssessmentModule { }
