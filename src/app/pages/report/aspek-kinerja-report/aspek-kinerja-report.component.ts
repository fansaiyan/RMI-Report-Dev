import { Component, OnInit } from '@angular/core';
import {DialogService} from 'primeng/dynamicdialog';
import {ReportService} from 'src/app/core/services/report.service';
import {MessageService} from 'primeng/api';
import {LookupSurveyComponent} from 'src/app/shared/component/lookup-survey/lookup-survey.component';
import {
  AdjustAspekDimensiDetailComponent
} from 'src/app/pages/report/adjust-aspek-dimensi/adjust-aspek-dimensi-detail/adjust-aspek-dimensi-detail.component';
import {MasterService} from 'src/app/core/services/master.service';

@Component({
  selector: 'app-aspek-kinerja-report',
  templateUrl: './aspek-kinerja-report.component.html',
  styleUrls: ['./aspek-kinerja-report.component.scss']
})
export class AspekKinerjaReportComponent implements OnInit {
  listdata: any[] = [];
  loading = false;
  msgs: any[] = [];
  constructor(
      public dialog: DialogService,
      private service: MasterService,
      private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.gets();
  }
  gets(){
    this.service.aspekKinerjaList().subscribe((resp) => {
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
  detail(e: any){
  }
}
