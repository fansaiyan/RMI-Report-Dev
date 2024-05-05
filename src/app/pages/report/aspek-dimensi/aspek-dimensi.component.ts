import { Component, OnInit } from '@angular/core';
import {DialogService} from 'primeng/dynamicdialog';
import {MasterService} from 'src/app/core/services/master.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {AuthenticationService} from 'src/app/core/services/auth.service';
import {HelpersService} from 'src/app/core/services/helpers.service';

@Component({
  selector: 'app-aspek-dimensi',
  templateUrl: './aspek-dimensi.component.html',
  styleUrls: ['./aspek-dimensi.component.scss']
})
export class AspekDimensiComponent implements OnInit {
  loading = false;
  listdata = [];
  msgs: any[] = [];
  constructor(
      public dialog: DialogService,
      private service: MasterService,
      private messageService: MessageService,
      private router: Router,
      private authService: AuthenticationService,
      private helper: HelpersService
  ) { }

  ngOnInit(): void {
    this.helper.setInfoSurvey({});
    this.gets();
  }
  gets(){
    if (this.loading) { this.loading = true; }
    this.listdata = [];
    this.service.surveyList(this.authService.isSuperAdmin() ? {} : {company_id: this.authService.current_company()}).subscribe(resp => {
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
  pilih(e: any){
    this.helper.setInfoSurvey(e);
    this.router.navigate(['/report/aspek-dimensi', e.id]);
  }
}
