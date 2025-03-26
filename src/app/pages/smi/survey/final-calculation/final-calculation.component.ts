import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {DialogService} from 'primeng/dynamicdialog';
import {MessageService} from 'primeng/api';
import {SMIService} from 'src/app/core/services/smi.service';
import {DetailFilesComponent} from 'src/app/pages/smi/survey/final-calculation/detail-files/detail-files.component';
import {
  FormCalculationComponent
} from 'src/app/pages/smi/survey/final-calculation/form-calculation/form-calculation.component';
import {Table} from 'primeng/table';
import {HelpersService} from 'src/app/core/services/helpers.service';

@Component({
  selector: 'app-final-calculation',
  templateUrl: './final-calculation.component.html',
  styleUrls: ['./final-calculation.component.scss']
})
export class FinalCalculationComponent implements OnInit, OnChanges {
  @Input() survey: null = null;
  @Input() email = null;
  @Input() smi_survey_code: any | null = null;
  @Input() isAsesor: boolean;
  @Input() companyEmailSelected: any  | null = null;
  loading = false;
  listdata = [];
  msgs: any[] = [];
  @ViewChild('dt', {static: false}) table: Table;
  @ViewChild('dt', {static: false}) dt: HTMLTableElement;
  constructor(
      public dialog: DialogService,
      private messageService: MessageService,
      private smiService: SMIService,
      private helper: HelpersService
  ) {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.survey && this.email && this.smi_survey_code){
      this.gets();
    }
  }
  ngOnInit(): void {
  }
  gets(){
    const params = {
      'email': this.email,
      'survey_code': this.smi_survey_code
    };
    if (this.loading) { this.loading = true; }
    this.listdata = [];
    this.smiService.get_final_calculation(params).subscribe(resp => {
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
        detail: error.error.message
      });
    });
  }
  edit(e: any){
    const ref = this.dialog.open(FormCalculationComponent, {
      width: '50%',
      header: 'Update Final Result',
      data: {...e}
    });
    ref.onClose.subscribe((resp: any) => {
      if(resp){
        this.messageService.add({
          key: 'toast-notif',
          severity: 'success',
          summary: 'Success',
          detail: `${resp.message}`
        });
        this.gets();
      }
    });
  }
  detail(e: any){
    const ref = this.dialog.open(DetailFilesComponent, {
      width: '80%',
      header: 'Uploaded Files',
      data: {
        email: this.email,
        survey_code: this.smi_survey_code,
        criteria: e.sub_dimensi_name
      }
    });
    ref.onClose.subscribe((resp: any) => {
    });
  }
  exportCSV() {
    let csvContent = '';
    if (this.isAsesor && this.companyEmailSelected) {
      csvContent += `Company Name;${this.companyEmailSelected.company_name}\n`;
    }
    const data = this.table;
    csvContent += 'Criteria;Self Assessment;Uploaded Doc;Diff;Final Result;Remark\n';
    if (data.filteredValue){
      data.filteredValue.forEach((row: any) => {
        csvContent += `${row.sub_dimensi_name};${row.self_asesment};${row.uploaded_doc};${row.diff};${row.final_result};${row.remark}\n`;
      });
    } else {
      data.value.forEach((row: any) => {
        csvContent += `${row.sub_dimensi_name};${row.self_asesment};${row.uploaded_doc};${row.diff};${row.final_result};${row.remark}\n`;
      });
    }
    this.helper.exportCSV(csvContent, 'Self-Assessment');
  }
  exportPdf() {
    const data = this.table;
    const columns = ['Criteria', 'Self Assessment', 'Uploaded Doc', 'Diff', 'Final Result', 'Remark'];
    const rows = [];
    if (data.filteredValue){
      data.filteredValue.forEach((row: any) => {
        rows.push([row.sub_dimensi_name, row.self_asesment, row.uploaded_doc, row.diff, row.final_result, row.remark]);
      });
    } else {
      data.value.forEach((row: any) => {
        rows.push([row.sub_dimensi_name, row.self_asesment, row.uploaded_doc, row.diff, row.final_result, row.remark]);
      });
    }
    if (this.isAsesor && this.companyEmailSelected){
      this.helper.exportPDF2(columns, rows, 'Self-Assessment', this.dt, this.companyEmailSelected.company_name);
    } else {
      this.helper.exportPDF(columns, rows, 'Self-Assessment', this.dt);
    }

  }
  exportExcel() {
    const data = this.table;
    const rows = [];
    if (data.filteredValue){
      data.filteredValue.forEach((row: any) => {
        rows.push({
          'Criteria' : row.sub_dimensi_name,
          'Self Assessment' : row.self_asesment,
          'Uploaded Doc' : row.uploaded_doc,
          'Diff' : row.diff,
          'Final Result' : row.final_result,
          'Remark' : row.remark
        });
      });
    } else {
      data.value.forEach((row: any) => {
        rows.push({
          'Criteria' : row.sub_dimensi_name,
          'Self Assessment' : row.self_asesment,
          'Uploaded Doc' : row.uploaded_doc,
          'Diff' : row.diff,
          'Final Result' : row.final_result,
          'Remark' : row.remark
        });
      });
    }
    if (this.isAsesor && this.companyEmailSelected){
      this.helper.exportExcel2(rows, 'Self-Assessment', false, null, this.companyEmailSelected.company_name);
    } else {
      this.helper.exportExcel(rows, 'Self-Assessment');
    }
  }
}
