import { Component, OnInit } from '@angular/core';
import {DialogService} from 'primeng/dynamicdialog';
import {MessageService} from 'primeng/api';
import {MasterService} from 'src/app/core/services/master.service';
import {Router} from '@angular/router';

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
      private router: Router
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
    console.log(e);
    this.router.navigate(['/report/aspek-kinerja', e.id, 'survey', e.survey_ids]);
  }
}
