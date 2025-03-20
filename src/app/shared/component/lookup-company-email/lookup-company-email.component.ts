import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MessageService} from 'primeng/api';
import {MasterService} from 'src/app/core/services/master.service';
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {AuthenticationService} from 'src/app/core/services/auth.service';
import {SMIService} from 'src/app/core/services/smi.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-lookup-company-email',
  templateUrl: './lookup-company-email.component.html',
  styleUrls: ['./lookup-company-email.component.scss'],
  providers: [MessageService]
})
export class LookupCompanyEmailComponent implements OnInit, OnDestroy {
  loading: boolean;
  listdata: any[] = [];
  msgs: any[] = [];
  @ViewChild('dt', {static: false}) dt: any;
  constructor(
      private messageService: MessageService,
      private service: MasterService,
      public dialog: DialogService,
      public config: DynamicDialogConfig,
      public ref: DynamicDialogRef,
      private authService: AuthenticationService,
      public smiService: SMIService
  ) { }
  ngOnInit(): void {
    this.gets();
  }
  gets(){
    if (this.loading) { this.loading = true; }
    this.listdata = [];
    this.service.getCompanyUserEmail().subscribe(resp => {
      if (resp.data.length > 0){
        let tempData = resp.data;
        this.smiService.get_email_entry_survey({survey_code: environment.smi_survey_code}).subscribe(resp => {
          if(resp.data.length > 0){
            const emailExist = resp.data.map((entry: any) => entry.email);
            this.listdata = tempData.map((item: any) => ({
              ...item,
              isExistEmail: emailExist.includes(item.user_email)
            }));
          }
        },(error: any) => {
          this.loading = false;
          this.messageService.add({
            key: 'toast-notif',
            severity: 'error',
            summary: 'Error',
            detail: error.error,
          });
        });
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
    this.ref.close({...e});
  }
  ngOnDestroy(): void {
    this.msgs = [];
    this.listdata = [];
  }
}
