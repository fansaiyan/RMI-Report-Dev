import {Component, OnDestroy, OnInit} from '@angular/core';
import {DialogService} from 'primeng/dynamicdialog';
import {LookupSurveyComponent} from 'src/app/shared/component/lookup-survey/lookup-survey.component';
import {MenuItem, MessageService} from 'primeng/api';
import {ReportService} from 'src/app/core/services/report.service';
import {HelpersService} from 'src/app/core/services/helpers.service';

@Component({
  selector: 'app-adjust-aspek-dimensi',
  templateUrl: './adjust-aspek-dimensi.component.html',
  styleUrls: ['./adjust-aspek-dimensi.component.scss']
})
export class AdjustAspekDimensiComponent implements OnInit, OnDestroy {
  activeIndex: number = 0;
  surveySelected: any = null;
  survey_name = '';
  buttonOpsi: MenuItem[];
  constructor(
      public dialog: DialogService,
      private service: ReportService,
      private messageService: MessageService,
      private helper: HelpersService
  ) { }
  ngOnInit(): void {this.buttonOpsi = [
    {label: 'All Correspondence', icon: 'pi pi-file-excel', command: (event) => {this.allCorrespondence(event)}}
  ];
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
        this.helper.setSurveySelected(this.surveySelected);
      } else {
        this.surveySelected = null;
        this.survey_name = '';
        this.helper.setSurveySelected(null);
      }
    });
  }
  clickOpsi(e: any){
    this.buttonOpsi.forEach((f: any) => {
      f.state = e;
    });
  }
  allCorrespondence(event: any) {
    let e: any = event.item.state;
    this.service.adjustAspekDimensiDetailAllRows({survey_id: e.id}).subscribe((resp) => {
      if(resp.data.length){
        let data = resp.data;
        let rows = [];
        data.forEach((f: any) => {
          rows.push({
            'No' : f.no,
            'Nama Survey' : f.survey_name,
            'Company': f.company,
            'Dimensi' : f.dimensi,
            'Sub Dimensi' : f.subdimensi,
            'Parameter': f.parametername,
            'User' : f.user,
            'Department': f.department,
            'Value': f.value
          });
        });
        this.helper.exportExcel(rows, 'adjust_aspek_dimensi(All Correspondence)');
      }
    }, (error: any) => {
      this.messageService.add({
        key: 'toast-notif',
        severity: 'error',
        summary: 'Error',
        detail: error.error,
      });
    });
  }
  ngOnDestroy(): void {
  }
}
