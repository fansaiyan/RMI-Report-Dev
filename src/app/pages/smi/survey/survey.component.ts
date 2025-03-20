import { Component, OnInit } from '@angular/core';
import {SMIService} from 'src/app/core/services/smi.service';
import { environment } from 'src/environments/environment';
import {MessageService} from 'primeng/api';
import {AuthenticationService} from 'src/app/core/services/auth.service';
import {
  LookupCompanyEmailComponent
} from 'src/app/shared/component/lookup-company-email/lookup-company-email.component';
import {DialogService} from 'primeng/dynamicdialog';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {
  survey:  any | null = null;
  email: any | null = null;
  activeIndex: number = 0;
  survey_sim_link: any | null = '';
  smi_survey_code: any | null = null;
  isAsesor: boolean;
  companyEmail: string | null = null;
  companyEmailSelected: string | null = null;
  constructor(
      private service: SMIService,
      private messageService: MessageService,
      private authService: AuthenticationService,
      public dialog: DialogService
  ) {
    this.smi_survey_code = environment.smi_survey_code;
    this.isAsesor = this.authService.isAssessor();
    if(!this.isAsesor){
      if(this.smi_survey_code){
        this.email = this.authService.email();
        this.getSurvey();
      } else {
        this.messageService.add({
          key: 'toast-notif',
          severity: 'warning',
          summary: 'Informasi',
          detail: 'Survey Code Belum Tersedia'
        });
      }
    }
  }

  ngOnInit(): void {
  }
  findCompanyEmail(){
    const ref = this.dialog.open(LookupCompanyEmailComponent, {
      width: '80%',
      header: 'Pilih Company Email',
      data: {}
    });
    ref.onClose.subscribe((resp: any) => {
      if (resp) {
        this.companyEmail = `${resp.company_name} - ${resp.user_name} - ${resp.user_email}`;
        this.companyEmailSelected = resp;
        this.email = this.companyEmailSelected['user_email'];
        this.survey = this.companyEmailSelected;
      } else {
        this.companyEmail = null;
        this.companyEmailSelected = null;
      }
    });
  }
  getSurvey() {
    this.service.surveys({survey_code: this.smi_survey_code}).subscribe(resp => {
      if (resp.data.length > 0){
        this.survey = resp.data[0];
        this.survey_sim_link = `${environment.url_smi}survey/start/${this.survey.access_token}`;
      } else {
        this.messageService.add({
          key: 'toast-notif',
          severity: 'info',
          summary: 'Informasi',
          detail: 'Data Tidak Tesedia'
        });
      }
    },(error: any) => {
      this.messageService.add({
        key: 'toast-notif',
        severity: 'error',
        summary: 'Error',
        detail: error.error.message
      });
    });
  }
}
