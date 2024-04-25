import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MessageService} from 'primeng/api';
import {MasterService} from '../../../core/services/master.service';
import {HelpersService} from 'src/app/core/services/helpers.service';
import {Table} from 'primeng/table';

@Component({
  selector: 'app-parameter-group',
  templateUrl: './parameter-group.component.html',
  styleUrls: ['./parameter-group.component.scss']
})
export class ParameterGroupComponent implements OnInit, OnDestroy {
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
    this.service.parameterGroup().subscribe(resp => {
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
    let csvContent = 'Dimensi;Group\n';
    if (data.filteredValue){
      data.filteredValue.forEach((row: any) => {
        csvContent += `${row.dimensi_name};${row.name}\n`;
      });
    } else {
      data.value.forEach((row: any) => {
        csvContent += `${row.dimensi_name};${row.name}\n`;
      });
    }
    this.helper.exportCSV(csvContent, 'parameter_group');
  }
  exportPdf() {
    const data = this.table;
    const columns = ['Dimensi', 'Group'];
    const rows = [];
    if (data.filteredValue){
      data.filteredValue.forEach((row: any) => {
        rows.push([row.dimensi_nama, row.name]);
      });
    } else {
      data.value.forEach((row: any) => {
        rows.push([row.dimensi_name, row.name]);
      });
    }
    this.helper.exportPDF(columns, rows, 'parameter_group', this.dt);
  }
  exportExcel() {
    const data = this.table;
    const rows = [];
    if (data.filteredValue){
      data.filteredValue.forEach((row: any) => {
        rows.push({
          Dimensi: row.dimensi_name,
          Group: row.name
        });
      });
    } else {
      data.value.forEach((row: any) => {
        rows.push({
          Dimensi: row.dimensi_name,
          Group: row.name
        });
      });
    }
    this.helper.exportExcel(rows, 'parameter_group');
  }
  ngOnDestroy(): void {
  }
}
