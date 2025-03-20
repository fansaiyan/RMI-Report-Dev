import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MessageService} from 'primeng/api';
import {MasterService} from 'src/app/core/services/master.service';
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {AuthenticationService} from 'src/app/core/services/auth.service';
import {logger} from 'codelyzer/util/logger';

@Component({
  selector: 'app-lookup-survey',
  templateUrl: './lookup-survey.component.html',
  styleUrls: ['./lookup-survey.component.scss'],
  providers: [MessageService]
})
export class LookupSurveyComponent implements OnInit, OnDestroy {
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
      private authService: AuthenticationService
  ) {
  }
  ngOnInit(): void {
    this.gets();
  }
  gets(){
    if (this.loading) { this.loading = true; }
    this.listdata = [];
    this.msgs = [];
    this.service.surveyList(this.authService.isSuperAdmin() ? {} : {company_id: this.authService.current_company()}).subscribe(resp => {
      if (resp.data.length > 0){
        this.listdata = resp.data;
      } else {
        this.msgs.push({ severity: 'info', summary: 'Informasi', detail: 'Data Tidak Tesedia' });
      }
      this.loading = false;
    }, (error: any) => {
      this.loading = false;
      if (Array.isArray(error.error.error)){
        for (let i = 0; i < error.error.error.length; i++){
          this.msgs.push({ severity: 'error', summary: 'error', detail: error.error.error[i] });
        }
      } else {
        this.msgs.push({ severity: 'error', summary: 'error', detail: error.error });
      }
    });
  }
  pilih(e: any){
    this.ref.close({...e});
  }
  ngOnDestroy(): void {
  }
}
