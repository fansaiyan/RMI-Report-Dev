import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {DialogService} from 'primeng/dynamicdialog';
import {ReportService} from 'src/app/core/services/report.service';
import {MessageService} from 'primeng/api';
import {HelpersService} from 'src/app/core/services/helpers.service';
import {generateRandomRGB} from 'src/app/core/utils';

@Component({
  selector: 'app-chart1',
  templateUrl: './chart1.component.html',
  styleUrls: ['./chart1.component.scss']
})
export class Chart1Component implements OnInit, OnChanges, OnDestroy {
  title: string | '';
  @Input() survey: any | null;
  msgs: any[] = [];
  loading = false;
  radarData: any;
  radarOptions: any;
  listdata: any[] = [];
  constructor(
      public dialog: DialogService,
      private service: ReportService,
      private messageService: MessageService,
      private helper: HelpersService
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.survey;
    this.get();
  }

  ngOnInit(): void {
  }
  get(){
    if(this.survey){
      this.title = `Index Maturity ${this.survey.company_name} terhadap Maksimum Industri ${this.survey.jenis_industri}, Maksimum keseluruhan data, dan Nilai Maximum`;
      const params = {
        survey_id: this.survey.id,
        periode: this.survey.periode,
        jenis_industri: this.survey.jenis_industri
      };
      this.service.chart1(params).subscribe({
        next:(resp) => {
          if(resp.data.length > 0){
            this.listdata = resp.data;
            const labels = [
              'Budaya dan Kapabilitas Risiko',
              'Organisasi dan Tata Kelola Risiko',
              'Kerangka Risiko dan Kepatuhan',
              'Proses dan Kontrol Risiko',
              'Model - Data dan Teknologi Risiko'
            ];
            this.radarData = {
              labels: labels,
              datasets: []
            };

            this.listdata.forEach((f: any) => {
              this.radarData.datasets.push({
                label: f.survey_name.toUpperCase(),
                backgroundColor: `rgba(${generateRandomRGB()},0.2)`,
                borderColor: `rgba(${generateRandomRGB()},1)`,
                data: [f['dimensi_1'],f['dimensi_2'],f['dimensi_3'],f['dimensi_4'],f['dimensi_5']]
              });
            });

            this.radarOptions = {
              plugins: {
                legend: {
                  labels: {
                    fontColor: '#A0A7B5'
                  }
                }
              },
              scales: {
                r: {
                  min: 0,  // Set the minimum value of the scale to 1
                  max: 5,
                  ticks: {
                    stepSize: 1,  // Set the step size to 1
                    beginAtZero: true,
                    fontColor: '#A0A7B5'  // Adjust the font color of the ticks
                  },
                  grid: {
                    color: 'rgba(160, 167, 181, .3)'
                  }
                }
              }
            };
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
  }
  ngOnDestroy(): void {

  }
}
