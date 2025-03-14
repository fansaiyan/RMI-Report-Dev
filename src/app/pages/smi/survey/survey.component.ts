import { Component, OnInit } from '@angular/core';
import {SMIService} from 'src/app/core/services/smi.service';
import { environment } from 'src/environments/environment';
import {MessageService} from 'primeng/api';
import {AuthenticationService} from 'src/app/core/services/auth.service';

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
  constructor(
      private service: SMIService,
      private messageService: MessageService,
      private authService: AuthenticationService
  ) {
    this.email = this.authService.email();
    this.smi_survey_code = environment.smi_survey_code;
    if(this.smi_survey_code){
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

  ngOnInit(): void {
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
        detail: error.error,
      });
    });
  }
}
