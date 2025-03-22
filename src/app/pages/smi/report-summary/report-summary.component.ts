import {Component, OnInit, ViewChild} from '@angular/core';
import {MasterService} from 'src/app/core/services/master.service';
import { environment } from 'src/environments/environment';
import {SMIService} from 'src/app/core/services/smi.service';
import {MessageService} from 'primeng/api';
import {HelpersService} from 'src/app/core/services/helpers.service';
import {Table} from 'primeng/table';
const defaultSurveyData = {
  strategy: 0,
  partnership: 0,
  motivation: 0,
  competencies: 0,
  communication: 0,
  technology: 0,
  operation: 0,
  total_score: 0
};
interface GroupedResult {
  company_id: number;
  company_name: string;
  strategy: number;
  partnership: number;
  motivation: number;
  competencies: number;
  communication: number;
  technology: number;
  operation: number;
  total_score: number;
}
@Component({
  selector: 'app-report-summary',
  templateUrl: './report-summary.component.html',
  styleUrls: ['./report-summary.component.scss']
})
export class ReportSummaryComponent implements OnInit {
  msgs: any[] = [];
  loading = false;
  listdata = [];
  @ViewChild('dt', {static: false}) table: Table;
  @ViewChild('dt', {static: false}) dt: HTMLTableElement;
  constructor(
      private service: MasterService,
      private smiService: SMIService,
      private messageService: MessageService,
      private helper: HelpersService
  ) { }

  ngOnInit(): void {
    this.gets();
  }
  gets(){
    if (this.loading) { this.loading = true; }
    this.listdata = [];
    this.service.getCompanyUserEmail().subscribe(resp => {
      if (resp.data.length > 0){
        const company_email = resp.data;
        this.smiService.get_summary_report_final_result({survey_code: environment.smi_survey_code}).subscribe(resp2 => {
          if (resp2.data.length > 0){
            const surveys = resp2.data;
            const resultMapping: any[] = company_email.map((ce) => {
              const matchedSurvey = surveys.find(survey => survey.email === ce.user_email);
              const { company, access_token, email, ...surveyData } = matchedSurvey ? matchedSurvey : defaultSurveyData;
              return { ...ce, ...surveyData };
            });
            // Grouping berdasarkan company_id
            const groupedResults: any = Object.values(
                resultMapping.reduce((acc, curr) => {
                  if (!acc[curr.company_id]) {
                    acc[curr.company_id] = {
                      company_id: curr.company_id,
                      company_name: curr.company_name,
                      strategy: 0,
                      partnership: 0,
                      motivation: 0,
                      competencies: 0,
                      communication: 0,
                      technology: 0,
                      operation: 0,
                      total_score: 0,
                      validCount: 0
                    };
                  }

                  // Periksa apakah ada setidaknya satu nilai lebih dari 0
                  const hasValidValues =
                      curr.strategy > 0 || curr.partnership > 0 || curr.motivation > 0 ||
                      curr.competencies > 0 || curr.communication > 0 || curr.technology > 0 ||
                      curr.operation > 0 || curr.total_score > 0;

                  // Jika ada minimal satu nilai yang lebih dari 0, masukkan dalam perhitungan
                  if (hasValidValues) {
                    acc[curr.company_id].strategy += curr.strategy;
                    acc[curr.company_id].partnership += curr.partnership;
                    acc[curr.company_id].motivation += curr.motivation;
                    acc[curr.company_id].competencies += curr.competencies;
                    acc[curr.company_id].communication += curr.communication;
                    acc[curr.company_id].technology += curr.technology;
                    acc[curr.company_id].operation += curr.operation;
                    acc[curr.company_id].total_score += curr.total_score;
                    acc[curr.company_id].validCount++;
                  }

                  return acc;
                }, {} as Record<number, GroupedResult & { validCount: number }>)

              // Pastikan semua `company_id` tetap masuk dalam hasil akhir, meskipun validCount = 0
            ).map(({ validCount, ...group }) => ({
              ...group,
              strategy: validCount > 0 ? group.strategy / validCount : 0,
              partnership: validCount > 0 ? group.partnership / validCount : 0,
              motivation: validCount > 0 ? group.motivation / validCount : 0,
              competencies: validCount > 0 ? group.competencies / validCount : 0,
              communication: validCount > 0 ? group.communication / validCount : 0,
              technology: validCount > 0 ? group.technology / validCount : 0,
              operation: validCount > 0 ? group.operation / validCount : 0,
              total_score: validCount > 0 ? group.total_score / validCount : 0
            }));
            this.listdata = groupedResults;
          }
        }, (err: any) => {
          if (Array.isArray(err.error.error)){
            for (let i = 0; i < err.error.error.length; i++){
              this.messageService.add({
                key: 'toast-notif',
                severity: 'error',
                summary: 'Error',
                detail: err.error.error[i]
              });
            }
          } else {
            this.messageService.add({
              key: 'toast-notif',
              severity: 'error',
              summary: 'Error',
              detail: err.error.message
            });
          }
        });
      } else {
        this.messageService.add({
          key: 'toast-notif',
          severity: 'info',
          summary: 'Informasi',
          detail: 'Data Tidak Tesedia'
        });
      }
    }, (error: any) => {
      this.loading = false;
      if (Array.isArray(error.error.error)){
        for (let i = 0; i < error.error.error.length; i++){
          this.messageService.add({
            key: 'toast-notif',
            severity: 'error',
            summary: 'Error',
            detail: error.error.error[i]
          });
        }
      } else {
        this.messageService.add({
          key: 'toast-notif',
          severity: 'error',
          summary: 'Error',
          detail: error.error.message
        });
      }
    });
  }
  exportCSV() {
    const data = this.table;
    let csvContent = 'Company;Communication;Competencies;Motivation;Operation;Partnership;Strategy;Technology;Total Score\n';
    if (data.filteredValue){
      data.filteredValue.forEach((row: any) => {
        csvContent += `${row.company_name};${row.communication};${row.competencies};${row.motivation};${row.operation};${row.partnership};${row.strategy};${row.technology};${row.total_score}\n`;
      });
    } else {
      data.value.forEach((row: any) => {
        csvContent += `${row.company_name};${row.communication};${row.competencies};${row.motivation};${row.operation};${row.partnership};${row.strategy};${row.technology};${row.total_score}\n`;
      });
    }
    this.helper.exportCSV(csvContent, 'Report Summary Final Result');
  }
  exportPdf() {
    const data = this.table;
    const columns = ['Company','Communication','Competencies','Motivation','Operation','Partnership','Strategy','Technology','Total Score'];
    const rows = [];
    if (data.filteredValue){
      data.filteredValue.forEach((row: any) => {
        rows.push([row.company_name,row.communication,row.competencies,row.motivation,row.operation,row.partnership,row.strategy,row.technology,row.total_score]);
      });
    } else {
      data.value.forEach((row: any) => {
        rows.push([row.company_name,row.communication,row.competencies,row.motivation,row.operation,row.partnership,row.strategy,row.technology,row.total_score]);
      });
    }
    this.helper.exportPDF(columns, rows, 'Report Summary Final Result', this.dt);
  }
  exportExcel() {
    const data = this.table;
    const rows = [];
    if (data.filteredValue){
      data.filteredValue.forEach((row: any) => {
        rows.push({
          'Company' : row.company_name,
          'Communication' : row.communication,
          'Competencies Doc' : row.competencies,
          'Motivation' : row.motivation,
          'Operation' : row.operation,
          'Partnership' : row.partnership,
          'Strategy' : row.strategy,
          'Technology' : row.technology,
          'Total Score' : row.total_score
        });
      });
    } else {
      data.value.forEach((row: any) => {
        rows.push({
          'Company' : row.company_name,
          'Communication' : row.communication,
          'Competencies Doc' : row.competencies,
          'Motivation' : row.motivation,
          'Operation' : row.operation,
          'Partnership' : row.partnership,
          'Strategy' : row.strategy,
          'Technology' : row.technology,
          'Total Score' : row.total_score
        });
      });
    }
    this.helper.exportExcel(rows, 'Report Summary Final Result');
  }
}
