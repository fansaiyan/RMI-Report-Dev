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
import { FormCalculateIcrComponent } from './aspek-kinerja-report/form-calculate-icr/form-calculate-icr.component';
import { GapAnalyzeComponent } from './adjust-aspek-dimensi/gap-analyze/gap-analyze.component';
import { Chart1Component } from './adjust-aspek-dimensi/gap-analyze/chart1/chart1.component';
import { Chart2Component } from './adjust-aspek-dimensi/gap-analyze/chart2/chart2.component';
import { Chart3Component } from './adjust-aspek-dimensi/gap-analyze/chart3/chart3.component';
import { Chart4Component } from './adjust-aspek-dimensi/gap-analyze/chart4/chart4.component';
import { Chart5Component } from './adjust-aspek-dimensi/gap-analyze/chart5/chart5.component';
import { Chart6Component } from './adjust-aspek-dimensi/gap-analyze/chart6/chart6.component';


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
    AdAllcorrespondenceComponent,
    FormCalculateIcrComponent,
    GapAnalyzeComponent,
    Chart1Component,
    Chart2Component,
    Chart3Component,
    Chart4Component,
    Chart5Component,
    Chart6Component
  ],
  imports: [
    CoreModule,
    SharedModule,
    ReportRoutingModule
  ]
})
export class ReportModule { }
