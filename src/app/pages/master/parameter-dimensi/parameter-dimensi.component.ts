import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MessageService} from 'primeng/api';
import {MasterService} from '../../../core/services/master.service';
import {Table} from 'primeng/table';
import {HelpersService} from 'src/app/core/services/helpers.service';

@Component({
  selector: 'app-parameter-dimensi',
  templateUrl: './parameter-dimensi.component.html',
  styleUrls: ['./parameter-dimensi.component.scss']
})
export class ParameterDimensiComponent implements OnInit, OnDestroy {
  loading: boolean;
  listdata: any[] = [];
  msgs: any[] = [];
  @ViewChild('dt', {static: false}) table: Table;
  @ViewChild('dt', {static: false}) dt: HTMLTableElement;
  constructor(
      private messageService: MessageService,
      private service: MasterService,
      private helper: HelpersService
  ) {
  }

  ngOnInit(): void {
    this.gets();
  }
  gets(){
    if (this.loading) { this.loading = true; }
    this.listdata = [];
    this.service.parameterDimensi().subscribe(resp => {
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
  exportCSV() {
    const data = this.table;
    let csvContent = 'ID;Name\n';
    if (data.filteredValue){
      data.filteredValue.forEach((row: any) => {
        csvContent += `${row.param_dimensi_id};${row.name}\n`;
      });
    } else {
      data.value.forEach((row: any) => {
        csvContent += `${row.param_dimensi_id};${row.name}\n`;
      });
    }
    this.helper.exportCSV(csvContent, 'parameter_dimensi');
  }
  exportPdf() {
    const data = this.table;
    const columns = ['ID', 'name'];
    const rows = [];
    if (data.filteredValue){
      data.filteredValue.forEach((row: any) => {
        rows.push([row.param_dimensi_id, row.name]);
      });
    } else {
      data.value.forEach((row: any) => {
        rows.push([row.param_dimensi_id, row.name]);
      });
    }
    this.helper.exportPDF(columns, rows, 'parameter_dimensi', this.dt);
  }
  exportExcel() {
    const data = this.table;
    const rows = [];
    if (data.filteredValue){
      data.filteredValue.forEach((row: any) => {
        rows.push({
          ID: row.param_dimensi_id,
          Name: row.name
        });
      });
    } else {
      data.value.forEach((row: any) => {
        rows.push({
          ID: row.param_dimensi_id,
          Name: row.name
        });
      });
    }
    this.helper.exportExcel(rows, 'parameter_dimensi');
  }
  ngOnDestroy(): void {
  }
}
