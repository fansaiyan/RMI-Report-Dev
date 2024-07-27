import { NgModule } from '@angular/core';
import { ReportRoutingModule } from './report-routing.module';
import {SharedModule} from 'src/app/shared/shared.module';
import { AdjustAspekDimensiComponent } from './adjust-aspek-dimensi/adjust-aspek-dimensi.component';
import { CoreModule } from 'src/app/core/core.module';
import { AdjustAspekDimensiDetailComponent } from './adjust-aspek-dimensi/adjust-aspek-dimensi-detail/adjust-aspek-dimensi-detail.component';
import { AspekKinerjaReportComponent } from './aspek-kinerja-report/aspek-kinerja-report.component';
import { AspekKinerjaDetailComponent } from './aspek-kinerja-report/aspek-kinerja-detail/aspek-kinerja-detail.component';
import { AspekDimensiComponent } from './aspek-dimensi/aspek-dimensi.component';
import { AspekDimensiDetailComponent } from './aspek-dimensi/aspek-dimensi-detail/aspek-dimensi-detail.component';
import { FormAspekKinerjComponent } from './aspek-kinerja-report/form-aspek-kinerj/form-aspek-kinerj.component';
import { AdParameterComponent } from './adjust-aspek-dimensi/ad-parameter/ad-parameter.component';
import { AdDimensiComponent } from './adjust-aspek-dimensi/ad-dimensi/ad-dimensi.component';
import { AdSubdimensiComponent } from './adjust-aspek-dimensi/ad-subdimensi/ad-subdimensi.component';
import { AdAllcorrespondenceComponent } from './adjust-aspek-dimensi/ad-allcorrespondence/ad-allcorrespondence.component';


@NgModule({
  declarations: [
    AdjustAspekDimensiComponent,
    AdjustAspekDimensiDetailComponent,
    AspekKinerjaReportComponent,
    AspekKinerjaDetailComponent,
    AspekDimensiComponent,
    AspekDimensiDetailComponent,
    FormAspekKinerjComponent,
    AdParameterComponent,
    AdDimensiComponent,
    AdSubdimensiComponent,
    AdAllcorrespondenceComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    ReportRoutingModule
  ]
})
export class ReportModule { }
