import {Component, OnInit, ViewChild} from '@angular/core';
import {DialogService} from 'primeng/dynamicdialog';
import {LookupSurveyComponent} from 'src/app/shared/component/lookup-survey/lookup-survey.component';
import {MessageService} from 'primeng/api';
import {
  AdjustAspekDimensiDetailComponent
} from 'src/app/pages/report/adjust-aspek-dimensi/adjust-aspek-dimensi-detail/adjust-aspek-dimensi-detail.component';
import {ReportService} from 'src/app/core/services/report.service';
import {Table} from 'primeng/table';
import {HelpersService} from 'src/app/core/services/helpers.service';

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
  @ViewChild('dt', {static: false}) table: Table;
  @ViewChild('dt', {static: false}) dt: HTMLTableElement;
  constructor(
      public dialog: DialogService,
      private service: ReportService,
      private messageService: MessageService,
      private helper: HelpersService
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
  exportCSV() {
    const data = this.table;
    let csvContent = 'No;Nama Survey;Dimensi;Sub Dimensi;Parameter Name;Avg;Min;Max;Range\n';
    if (data.filteredValue){
      data.filteredValue.forEach((row: any) => {
        csvContent += `${row.no};${row.survey_name};${row.dimensi};${row.subdimensi};${row.parametername};${row.avgvalue};${row.minvalue};${row.maxvalue};${row.rangevalue}\n`;
      });
    } else {
      data.value.forEach((row: any) => {
        csvContent += `${row.no};${row.survey_name};${row.dimensi};${row.subdimensi};${row.parametername};${row.avgvalue};${row.minvalue};${row.maxvalue};${row.rangevalue}\n`;
      });
    }
    this.helper.exportCSV(csvContent, 'adjust_aspek_dimensi');
  }
  exportPdf() {
    const data = this.table;
    const columns = ['No', 'Nama Survey', 'Dimensi', 'Sub Dimensi','Parameter Name', 'Avg', 'Min', 'Max', 'Range'];
    const rows = [];
    if (data.filteredValue){
      data.filteredValue.forEach((row: any) => {
        rows.push([row.no, row.survey_name, row.dimensi, row.subdimensi, row.parametername, row.avgvalue, row.minvalue, row.maxvalue, row.rangevalue]);
      });
    } else {
      data.value.forEach((row: any) => {
        rows.push([row.no, row.survey_name, row.dimensi, row.subdimensi, row.parametername, row.avgvalue, row.minvalue, row.maxvalue, row.rangevalue]);
      });
    }
    this.helper.exportPDF(columns, rows, 'adjust_aspek_dimensi', this.dt);
  }
  exportExcel() {
    const data = this.table;
    const rows = [];
    if (data.filteredValue){
      data.filteredValue.forEach((row: any) => {
        rows.push({
          'No' : row.no,
          'Nama Survey' : row.survey_name,
          'Dimensi' : row.dimensi,
          'Sub Dimensi' : row.subdimensi,
          'Parameter Name' : row.parametername,
          'Avg' : row.avgvalue,
          'Min' : row.minvalue,
          'Max' : row.maxvalue,
          'Range' : row.rangevalue
        });
      });
    } else {
      data.value.forEach((row: any) => {
        rows.push({
          'No' : row.no,
          'Nama Survey' : row.survey_name,
          'Dimensi' : row.dimensi,
          'Sub Dimensi' : row.subdimensi,
          'Parameter Name' : row.parametername,
          'Avg' : row.avgvalue,
          'Min' : row.minvalue,
          'Max' : row.maxvalue,
          'Range' : row.rangevalue
        });
      });
    }
    this.helper.exportExcel(rows, 'adjust_aspek_dimensi');
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
