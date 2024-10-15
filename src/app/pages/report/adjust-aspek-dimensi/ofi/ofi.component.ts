import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {Table} from 'primeng/table';
import {HelpersService} from 'src/app/core/services/helpers.service';
import {ReportService} from 'src/app/core/services/report.service';
import {filterMin, generateRandomRGB, getUniqueDimensiIds} from 'src/app/core/utils';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-ofi',
  templateUrl: './ofi.component.html',
  styleUrls: ['./ofi.component.scss']
})
export class OfiComponent implements OnInit, OnDestroy {
  surveySelected = null;
  surveyidsub: Subscription;
  listdata: any[] = [];
  loading = false;
  msgs: any[] = [];
  @ViewChild('dt', {static: false}) table: Table;
  @ViewChild('dt', {static: false}) dt: HTMLTableElement;
  constructor(
      private helper: HelpersService,
      private service: ReportService,
      private messageService: MessageService
  ) {
    this.surveyidsub = this.helper._surveySelected.subscribe(r => {
      this.surveySelected = r;
      if(this.surveySelected){
        this.get();
      }
    });
  }
  ngOnInit(): void {
  }
  get(){
    const params = {
      survey_id: this.surveySelected.id,
      periode: this.surveySelected.periode,
      jenis_industri: this.surveySelected.jenis_industri
    };
    this.service.ofi(params).subscribe({
      next:(resp) => {
        if(resp.data.length > 0){
          const templist = resp.data;
          const dimensi_ids = getUniqueDimensiIds(templist);
          if(dimensi_ids.length > 0){
            for(let i of dimensi_ids){
              const dimensi = templist.filter((f: any) => f.dimensi_id == i);
              const min = filterMin(dimensi)
              this.listdata.push(min);
            }
          }
          this.listdata = this.listdata.reduce((acc, curr) => acc.concat(curr), []);
        } else {
          this.messageService.add({
            key: 'toast-notif',
            severity: 'info',
            summary: 'Informasi',
            detail: 'Data Tidak Tesedia'
          });
        }
      },
      error:(error) => {
        this.messageService.add({
          key: 'toast-notif',
          severity: 'error',
          summary: 'Error',
          detail: error.error,
        });
      }
    });
  }
  exportCSV() {
    const data = this.table;
    let csvContent = 'No;Nama Survey;Periode,Jenis Industri,Dimensi;Sub Dimensi;Parameter Name;Current Level\n';
    if (data.filteredValue){
      data.filteredValue.forEach((row: any) => {
        csvContent += `${row.no};${row.survey_name};${row.periode};${row.jenis_industri};${row.dimensi};${row.subdimensi};${row.parametername};${row.minvalue}\n`;
      });
    } else {
      data.value.forEach((row: any) => {
        csvContent += `${row.no};${row.survey_name};${row.periode};${row.jenis_industri};${row.dimensi};${row.subdimensi};${row.parametername};${row.minvalue}\n`;
      });
    }
    this.helper.exportCSV(csvContent, 'Opportunity For Improvement');
  }
  exportPdf() {
    const data = this.table;
    const columns = ['No', 'Nama Survey', 'Periode','Jenis Industri', 'Dimensi', 'Sub Dimensi','Parameter Name', 'Current Level'];
    const rows = [];
    if (data.filteredValue){
      data.filteredValue.forEach((row: any) => {
        rows.push([row.no, row.survey_name,row.periode,row.jenis_industri, row.dimensi, row.subdimensi, row.parametername, row.minvalue]);
      });
    } else {
      data.value.forEach((row: any) => {
        rows.push([row.no, row.survey_name,row.periode,row.jenis_industri, row.dimensi, row.subdimensi, row.parametername, row.minvalue]);
      });
    }
    this.helper.exportPDF(columns, rows, 'Opportunity For Improvement', this.dt);
  }
  exportExcel() {
    const data = this.table;
    const rows = [];
    if (data.filteredValue){
      data.filteredValue.forEach((row: any) => {
        rows.push({
          'No' : row.no,
          'Nama Survey' : row.survey_name,
          'Periode' : row.periode,
          'Jenis Industri' : row.jenis_industri,
          'Dimensi' : row.dimensi,
          'Sub Dimensi' : row.subdimensi,
          'Parameter': row.parametername,
          'Current Level' : row.minvalue
        });
      });
    } else {
      data.value.forEach((row: any) => {
        rows.push({
          'No' : row.no,
          'Nama Survey' : row.survey_name,
          'Periode' : row.periode,
          'Jenis Industri' : row.jenis_industri,
          'Dimensi' : row.dimensi,
          'Sub Dimensi' : row.subdimensi,
          'Parameter': row.parametername,
          'Current Level' : row.minvalue
        });
      });
    }
    this.helper.exportExcel(rows, 'Opportunity For Improvement');
  }
  ngOnDestroy(): void {
  }
}
