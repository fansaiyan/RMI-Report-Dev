import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { PopupLoadingComponent } from './popup-loading/popup-loading.component';
import {ProgressSpinner, ProgressSpinnerModule} from 'primeng/progressspinner';
import { UploadDokumenComponent } from './upload-dokumen/upload-dokumen.component';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { ChartPieComponent } from './charts/chart-pie/chart-pie.component';
import { ChartColumnCompareComponent } from './charts/chart-column-compare/chart-column-compare.component';
import { ChartColumn1Component } from './charts/chart-column1/chart-column1.component';
import { ChartPieNonRupiahComponent } from './charts/chart-pie-non-rupiah/chart-pie-non-rupiah.component';
import { InputMaskModule } from '@ngneat/input-mask';
import { LookupSurveyComponent } from './component/lookup-survey/lookup-survey.component';
@NgModule({
  declarations: [
    PopupLoadingComponent,
    UploadDokumenComponent,
    ChartPieComponent,
    ChartColumnCompareComponent,
    ChartColumn1Component,
    ChartPieNonRupiahComponent,
    LookupSurveyComponent
  ],
  imports: [
    CoreModule,
    ProgressSpinnerModule,
    FileUploadModule
  ],
  exports: [
    PopupLoadingComponent,
    UploadDokumenComponent,
    InputMaskModule,
    ChartPieComponent,
    ChartColumnCompareComponent,
    ChartColumn1Component,
    ChartPieNonRupiahComponent,
    LookupSurveyComponent
  ],
  providers: [
    ProgressSpinner
  ]
})
export class SharedModule { }
