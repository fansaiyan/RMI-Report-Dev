import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {Table} from 'primeng/table';
import {HelpersService} from 'src/app/core/services/helpers.service';
import {ReportService} from 'src/app/core/services/report.service';
import {filterMin, generateRandomRGB, getUniqueDimensiIds} from 'src/app/core/utils';
import {MessageService} from 'primeng/api';
import {PopupLoadingComponent} from 'src/app/shared/popup-loading/popup-loading.component';
import {DialogService} from 'primeng/dynamicdialog';

@Component({
  selector: 'app-ofi',
  templateUrl: './ofi.component.html',
  styleUrls: ['./ofi.component.scss']
})
export class OfiComponent implements OnInit, OnDestroy {
  surveySelected = null;
  surveyidsub: Subscription;
  listdata: any[] = []
  listdata_detail: any [];
  loading = false;
  loading_detail = false;
  msgs: any[] = [];
  @ViewChild('dt', {static: false}) table: Table;
  @ViewChild('dt', {static: false}) dt: HTMLTableElement;
  @ViewChild('dt2', {static: false}) table2: Table;
  @ViewChild('dt2', {static: false}) dt2: HTMLTableElement;
  constructor(
      private helper: HelpersService,
      private service: ReportService,
      private messageService: MessageService,
      public dialog: DialogService
  ) {
    this.surveyidsub = this.helper._surveySelected.subscribe(r => {
      this.surveySelected = r;
      if(this.surveySelected){
        this.get();
      } else {
        this.listdata = [];
      }
    });
  }
  ngOnInit(): void {
  }
  get(){
    this.listdata = [];
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
  exportCSV(isDetail?: boolean) {
    if(isDetail){
      const data = this.table2;
      let csvContent = 'No;Parameter;Level\n';
      if (data.filteredValue){
        data.filteredValue.forEach((row: any) => {
          csvContent += `${row.no};${row.parameter};${row.level}\n`;
        });
      } else {
        data.value.forEach((row: any) => {
          csvContent += `${row.no};${row.parameter};${row.level}\n`;
        });
      }
      this.helper.exportCSV(csvContent, 'Opportunity For Improvement Detail');
    } else {
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
  }
  exportPdf(isDetail?: boolean) {
    if(isDetail){
      const data = this.table2;
      const columns = ['No', 'Parameter', 'Level'];
      const rows = [];
      if (data.filteredValue){
        data.filteredValue.forEach((row: any) => {
          rows.push([row.no, row.parameter,row.level]);
        });
      } else {
        data.value.forEach((row: any) => {
          rows.push([row.no, row.parameter,row.level]);
        });
      }
      this.helper.exportPDF(columns, rows, 'Opportunity For Improvement Detail', this.dt2);
    } else {
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
  }
  exportExcel(isDetail?: boolean) {
    if(isDetail){
      const data = this.table2;
      const rows = [];
      if (data.filteredValue){
        data.filteredValue.forEach((row: any) => {
          rows.push({
            'No' : row.no,
            'Parameter' : row.parameter,
            'Level' : row.level
          });
        });
      } else {
        data.value.forEach((row: any) => {
          rows.push({
            'No' : row.no,
            'Parameter' : row.parameter,
            'Level' : row.level
          });
        });
      }
      this.helper.exportExcel(rows, 'Opportunity For Improvement Detail');
    } else {
      const data = this.table;
      const rows = [];
      const overlay = this.dialog.open(PopupLoadingComponent, {
        data : {
          message: 'Exporting Data'
        }
      });
      const params = {
        parameter_name: "",
        jenis_industri: "",
        level: []
      };
      if(data.filteredValue){
        data.filteredValue.forEach((row: any) => {
          params.parameter_name += `${row.parametername.trim()}:`;
          params.jenis_industri = row.jenis_industri;
          params.level.push(row.minvalue < 3 ? 3 : row.minvalue + 1)
        });
      } else {
        data.value.forEach((row: any) => {
          params.parameter_name += `${row.parametername.trim()}:`;
          params.jenis_industri = row.jenis_industri;
          params.level.push(row.minvalue < 3 ? 3 : row.minvalue + 1)
        });
      }
      this.service.ofi_detail_batch(params).subscribe({
        next:(resp) => {
          let row2 = [];
          if(resp.data.length > 0){
            resp.data.forEach((f: any) => {
              row2.push({
                'No' : f.no,
                'Dimensi Name' : f.dimensi_name,
                'Dimensi Group' : f.subdimensi_groupname,
                'Parameter Name' : f.parameter_name,
                'Parameter' : f.parameter,
                'Level' : f.level,
                'Jenis Industri': f.jenisindustri
              });
            });
          }
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
          overlay.close(true);
          this.helper.exportExcel(rows, 'Opportunity For Improvement', true, row2);
        },
        error:(error) => {
          overlay.close(true);
          this.loading_detail = false;
          this.messageService.add({
            key: 'toast-notif',
            severity: 'error',
            summary: 'Error',
            detail: error.error,
          });
        }
      });
    }
  }
  onclickExpand(e: any){
    this.loading_detail = true;
    this.listdata_detail = [];
    const params = {
      paramter_name: e.parametername.trim(),
      jenis_industri: e.jenis_industri,
      level: e.minvalue < 3 ? 3 : e.minvalue + 1
    }
    this.service.ofi_detail(params).subscribe({
      next:(resp) => {
        if(resp.data.length > 0){
          this.listdata_detail = resp.data;
        } else {
          this.messageService.add({
            key: 'toast-notif',
            severity: 'info',
            summary: 'Informasi',
            detail: 'Data Tidak Tesedia'
          });
        }
        this.loading_detail = false;
      },
      error:(error) => {
        this.loading_detail = false;
        this.messageService.add({
          key: 'toast-notif',
          severity: 'error',
          summary: 'Error',
          detail: error.error,
        });
      }
    });
  }
  ngOnDestroy(): void {
    this.listdata = [];
    this.listdata_detail = [];
  }
}
