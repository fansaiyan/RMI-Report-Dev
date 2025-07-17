import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from 'src/app/core/services/auth.service';
import {MasterService} from 'src/app/core/services/master.service';
import {environment} from 'src/environments/environment';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-input-survey',
  templateUrl: './input-survey.component.html',
  styleUrls: ['./input-survey.component.scss']
})
export class InputSurveyComponent implements OnInit {
  company_id: number;
  partner_id: number;
  survey:  any | null = null;
  survey_link: any | null = null;
  isAsesor: boolean;
  constructor(
    private authService: AuthenticationService,
    private service: MasterService,
    private messageService: MessageService
  ) {
    this.company_id = this.authService.current_company();
    this.partner_id = this.authService.partner_id();
    this.isAsesor = this.authService.isAssessor();
    this.getSurvey();
  }

  ngOnInit(): void {
  }
  getSurvey() {
    this.service.surveyGetLink({partner_id: this.partner_id, company_id: this.company_id}).subscribe(resp => {
      if (resp.data.length > 0){
        this.survey = resp.data[0];
        if(this.survey.status != 'not_yet'){
          this.survey_link = `${environment.url}survey/${this.survey.survey_token}/${this.survey.answer_token}`;
        } else {
          this.survey_link = `${environment.url}survey/start/${this.survey.survey_token}`;
        }
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
