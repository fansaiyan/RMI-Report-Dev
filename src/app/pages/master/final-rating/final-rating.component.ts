import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MessageService} from 'primeng/api';
import {MasterService} from '../../../core/services/master.service';
import {Table} from 'primeng/table';
import {HelpersService} from 'src/app/core/services/helpers.service';

@Component({
  selector: 'app-final-rating',
  templateUrl: './final-rating.component.html',
  styleUrls: ['./final-rating.component.scss']
})
export class FinalRatingComponent implements OnInit, OnDestroy {
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
    this.service.finalRating().subscribe(resp => {
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
    let csvContent = 'Peringkat Akhir (final Rating);Nilai Konversi\n';
    if (data.filteredValue){
      data.filteredValue.forEach((row: any) => {
        csvContent += `${row.name};${row.nilai}\n`;
      });
    } else {
      data.value.forEach((row: any) => {
        csvContent += `${row.name};${row.nilai}\n`;
      });
    }
    this.helper.exportCSV(csvContent, 'final_rating');
  }
  exportPdf() {
    const data = this.table;
    const columns = ['Peringkat Akhir (final Rating)', 'Nilai Konversi'];
    const rows = [];
    if (data.filteredValue){
      data.filteredValue.forEach((row: any) => {
        rows.push([row.name, row.nilai]);
      });
    } else {
      data.value.forEach((row: any) => {
        rows.push([row.name, row.nilai]);
      });
    }
    this.helper.exportPDF(columns, rows, 'final_rating', this.dt);
  }
  exportExcel() {
    const data = this.table;
    const rows = [];
    if (data.filteredValue){
      data.filteredValue.forEach((row: any) => {
        rows.push({
          'Peringkat Akhir (final Rating)' : row.name,
          'Nilai Konversi' : row.nilai
        });
      });
    } else {
      data.value.forEach((row: any) => {
        rows.push({
          'Peringkat Akhir (final Rating)' : row.name,
          'Nilai Konversi' : row.nilai
        });
      });
    }
    this.helper.exportExcel(rows, 'final_rating');
  }
  ngOnDestroy(): void {
  }
}
