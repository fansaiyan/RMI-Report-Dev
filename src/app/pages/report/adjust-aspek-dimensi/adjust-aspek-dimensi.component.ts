import { Component, OnInit } from '@angular/core';
import {DialogService} from 'primeng/dynamicdialog';
import {LookupSurveyComponent} from 'src/app/shared/component/lookup-survey/lookup-survey.component';
import {MasterService} from 'src/app/core/services/master.service';
import {MessageService} from 'primeng/api';
import {
  AdjustAspekDimensiDetailComponent
} from 'src/app/pages/report/adjust-aspek-dimensi/adjust-aspek-dimensi-detail/adjust-aspek-dimensi-detail.component';

@Component({
  selector: 'app-adjust-aspek-dimensi',
  templateUrl: './adjust-aspek-dimensi.component.html',
  styleUrls: ['./adjust-aspek-dimensi.component.scss']
})
export class AdjustAspekDimensiComponent implements OnInit {
  surveySelected: any = null;
  survey_name = '';
  listdata: any[] = [];
  loading = false;
  msgs: any[] = [];
  constructor(
      public dialog: DialogService,
      private service: MasterService,
      private messageService: MessageService,
  ) { }

  ngOnInit(): void {
  }
  findSurvey(){
    const ref = this.dialog.open(LookupSurveyComponent, {
      width: '900px',
      header: 'Pilih Survey',
      data: {}
    });
    ref.onClose.subscribe((resp: any) => {
      if (resp){
        this.surveySelected = resp;
        this.survey_name = this.surveySelected.name;
        this.gets();
      } else {
        this.surveySelected = null;
        this.survey_name = '';
        this.listdata = [];
      }
    });
  }
  gets(){
    if (this.surveySelected){
      this.service.adjustAspekDimensi({survey_id: this.surveySelected.id}).subscribe((resp) => {
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
  }
  detail(e: any){
    const ref = this.dialog.open(AdjustAspekDimensiDetailComponent, {
      width: '900px',
      header: `Detail : ${e.parametername}`,
      data: {...e}
    });
    ref.onClose.subscribe((resp: any) => {
      console.log(resp);
    });
  }
}
