import { NgModule } from '@angular/core';
import { SMIRoutingModule } from './smi-routing.module';
import { SurveyComponent } from './survey/survey.component';
import { UploadDokumenComponent } from './upload-dokumen/upload-dokumen.component';
import {CoreModule} from 'src/app/core/core.module';
import {SharedModule} from 'src/app/shared/shared.module';
import { FinalCalculationComponent } from './survey/final-calculation/final-calculation.component';


@NgModule({
  declarations: [
    SurveyComponent,
    UploadDokumenComponent,
    FinalCalculationComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    SMIRoutingModule
  ]
})
export class SMIModule { }
