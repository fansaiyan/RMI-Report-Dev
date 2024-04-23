import { NgModule } from '@angular/core';
import { ReportRoutingModule } from './report-routing.module';
import {SharedModule} from 'src/app/shared/shared.module';
import { AdjustAspekDimensiComponent } from './adjust-aspek-dimensi/adjust-aspek-dimensi.component';
import { CoreModule } from 'src/app/core/core.module';
import { AdjustAspekDimensiDetailComponent } from './adjust-aspek-dimensi/adjust-aspek-dimensi-detail/adjust-aspek-dimensi-detail.component';
import { AspekKinerjaReportComponent } from './aspek-kinerja-report/aspek-kinerja-report.component';
import { AspekKinerjaDetailComponent } from './aspek-kinerja-report/aspek-kinerja-detail/aspek-kinerja-detail.component';


@NgModule({
  declarations: [
    AdjustAspekDimensiComponent,
    AdjustAspekDimensiDetailComponent,
    AspekKinerjaReportComponent,
    AspekKinerjaDetailComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    ReportRoutingModule
  ]
})
export class ReportModule { }
