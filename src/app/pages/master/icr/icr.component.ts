import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Table} from 'primeng/table';
import {MessageService} from 'primeng/api';
import {MasterService} from 'src/app/core/services/master.service';
import {HelpersService} from 'src/app/core/services/helpers.service';

@Component({
  selector: 'app-icr',
  templateUrl: './icr.component.html',
  styleUrls: ['./icr.component.scss']
})
export class IcrComponent implements OnInit, OnDestroy {
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
    this.service.icr().subscribe(resp => {
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
    let csvContent = 'Peringkat;Min;Max\n';
    if (data.filteredValue){
      data.filteredValue.forEach((row: any) => {
        csvContent += `${row.name};${row.min};${row.max}\n`;
      });
    } else {
      data.value.forEach((row: any) => {
        csvContent += `${row.name};${row.min};${row.max}\n`;
      });
    }
    this.helper.exportCSV(csvContent, 'interest_coverage_ration');
  }
  exportPdf() {
    const data = this.table;
    const columns = ['Peringkat', 'Min', 'Max'];
    const rows = [];
    if (data.filteredValue){
      data.filteredValue.forEach((row: any) => {
        rows.push([row.name, row.min, row.max]);
      });
    } else {
      data.value.forEach((row: any) => {
        rows.push([row.name, row.min, row.max]);
      });
    }
    this.helper.exportPDF(columns, rows, 'interest_coverage_ration', this.dt);
  }
  exportExcel() {
    const data = this.table;
    const rows = [];
    if (data.filteredValue){
      data.filteredValue.forEach((row: any) => {
        rows.push({
          'Peringkat' : row.name,
          'Min' : row.min,
          'Max' : row.max
        });
      });
    } else {
      data.value.forEach((row: any) => {
        rows.push({
          'Peringkat' : row.name,
          'Min' : row.min,
          'Max' : row.max
        });
      });
    }
    this.helper.exportExcel(rows, 'interest_coverage_ration');
  }
  ngOnDestroy(): void {
  }
}
