import { Component, OnInit } from '@angular/core';
import {DialogService} from 'primeng/dynamicdialog';
import {ConfirmationService, MessageService} from 'primeng/api';
import {MasterService} from 'src/app/core/services/master.service';
import {Router} from '@angular/router';
import {PopupLoadingComponent} from 'src/app/shared/popup-loading/popup-loading.component';

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
      private router: Router,
      private confirmationService: ConfirmationService,
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
    this.router.navigate(['/report/aspek-kinerja', e.id, 'survey', e.survey_ids]);
  }
  edit(e: any){
    this.router.navigate(['/report/aspek-kinerja/form-aspek-kinerja', e.id]);
  }
  add(){
    this.router.navigate(['/report/aspek-kinerja/form-aspek-kinerja']);
  }
  delete(e: any){
    this.confirmationService.confirm({
      key: 'confirm-delete',
      header: 'Konfirmasi',
      message: `${e.name} Akan Dihapus ?`,
      accept: () => {
        const overlay = this.dialog.open(PopupLoadingComponent, {
          data : {
            message: 'Mengapus Data'
          }
        });
        this.service.postAspekKinerjaDelete(e.id).subscribe(
            (resp: any) => {
              overlay.close(true);
              this.gets();
              this.messageService.add({
                key: 'toast-notif',
                severity: 'success',
                summary: 'Berhasil',
                detail: 'Data Berhasil Dihapus'
              });
            },
            (error: any) => {
              overlay.close(true);
              if (Array.isArray(error.error.error)){
                for (let i = 0; i < error.error.error.length; i++){
                  this.messageService.add({
                    key: 'toast-notif',
                    severity: 'error',
                    summary: 'Error',
                    detail: error.error.error[i]
                  });
                }
              } else {
                this.messageService.add({
                  key: 'toast-notif',
                  severity: 'error',
                  summary: 'Error',
                  detail: error.error,
                });
              }
            }
        );
      },
      reject: () => {
      }
    });
  }
}
