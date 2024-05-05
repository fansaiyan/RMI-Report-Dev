import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {Table} from 'primeng/table';
import {DialogService} from 'primeng/dynamicdialog';
import {ReportService} from 'src/app/core/services/report.service';
import {MessageService} from 'primeng/api';
import {HelpersService} from 'src/app/core/services/helpers.service';
import {
  AdjustAspekDimensiDetailComponent
} from 'src/app/pages/report/adjust-aspek-dimensi/adjust-aspek-dimensi-detail/adjust-aspek-dimensi-detail.component';

@Component({
  selector: 'app-ad-dimensi',
  templateUrl: './ad-dimensi.component.html',
  styleUrls: ['./ad-dimensi.component.scss']
})
export class AdDimensiComponent implements OnInit, OnDestroy {
  surveySelected = null;
  surveyidsub: Subscription;
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
  ) {
    this.surveyidsub = this.helper._surveySelected.subscribe(r => {
      this.surveySelected = r;
      if(this.surveySelected){
        this.gets();
      } else {
        this.listdata = [];
      }
    });
  }

  ngOnInit(): void {
  }
  gets(){
    if (this.surveySelected){
      this.service.adjustAspekDimensiPerdimensi({survey_id: this.surveySelected.id}).subscribe((resp) => {
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
    let csvContent = 'No;Nama Survey;Dimensi;Avg\n';
    if (data.filteredValue){
      data.filteredValue.forEach((row: any) => {
        csvContent += `${row.no};${row.survey_name};${row.dimensi};${row.avg}\n`;
      });
    } else {
      data.value.forEach((row: any) => {
        csvContent += `${row.no};${row.survey_name};${row.dimensi};${row.avg}\n`;
      });
    }
    this.helper.exportCSV(csvContent, 'adjust_aspek_dimensi(Dimensi)');
  }
  exportPdf() {
    const data = this.table;
    const columns = ['No', 'Nama Survey', 'Dimensi', 'Avg'];
    const rows = [];
    if (data.filteredValue){
      data.filteredValue.forEach((row: any) => {
        rows.push([row.no, row.survey_name, row.dimensi, row.avg]);
      });
    } else {
      data.value.forEach((row: any) => {
        rows.push([row.no, row.survey_name, row.dimensi, row.avg]);
      });
    }
    this.helper.exportPDF(columns, rows, 'adjust_aspek_dimensi(Dimensi)', this.dt);
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
          'Avg' : row.avg,
        });
      });
    } else {
      data.value.forEach((row: any) => {
        rows.push({
          'No' : row.no,
          'Nama Survey' : row.survey_name,
          'Dimensi' : row.dimensi,
          'Avg' : row.avg,
        });
      });
    }
    this.helper.exportExcel(rows, 'adjust_aspek_dimensi(Dimensi)');
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
  ngOnDestroy() {
    this.surveyidsub.unsubscribe();
  }
}
