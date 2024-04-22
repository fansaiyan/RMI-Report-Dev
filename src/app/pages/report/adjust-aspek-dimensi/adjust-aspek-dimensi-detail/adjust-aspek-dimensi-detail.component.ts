import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MessageService} from 'primeng/api';
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {ReportService} from 'src/app/core/services/report.service';

@Component({
  selector: 'app-adjust-aspek-dimensi-detail',
  templateUrl: './adjust-aspek-dimensi-detail.component.html',
  styleUrls: ['./adjust-aspek-dimensi-detail.component.scss'],
  providers: [MessageService]
})
export class AdjustAspekDimensiDetailComponent implements OnInit, OnDestroy {
  loading: boolean;
  listdata: any[] = [];
  msgs: any[] = [];
  @ViewChild('dt', {static: false}) dt: any;
  constructor(
      private messageService: MessageService,
      private service: ReportService,
      public dialog: DialogService,
      public config: DynamicDialogConfig,
      public ref: DynamicDialogRef
  ) {
  }
  ngOnInit(): void {
    this.gets();
  }
  gets(){
    if (this.loading) { this.loading = true; }
    this.listdata = [];
    const params = {
      survey_id : this.config.data.survey_id,
      question_id : this.config.data.question_id
    };
    this.service.adjustAspekDimensiDetail(params).subscribe(resp => {
      if (resp.data.length > 0){
        this.listdata = resp.data;
      } else {
        this.messageService.add({
          key: 'toast-notif',
          severity: 'info',
          summary: 'Informasi',
          detail: 'Data Tidak Tesedia'
        });
      }
      this.loading = false;
    }, (error: any) => {
      this.loading = false;
      this.messageService.add({
        key: 'toast-notif',
        severity: 'error',
        summary: 'Error',
        detail: error.error,
      });
    });
  }
  ngOnDestroy(): void {
    this.listdata = [];
    this.loading = false;
  }
}
