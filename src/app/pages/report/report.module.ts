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


@NgModule({
  declarations: [
    AdjustAspekDimensiComponent,
    AdjustAspekDimensiDetailComponent,
    AspekKinerjaReportComponent,
    AspekKinerjaDetailComponent,
    AspekDimensiComponent,
    AspekDimensiDetailComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    ReportRoutingModule
  ]
})
export class ReportModule { }
