import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {DialogService} from 'primeng/dynamicdialog';
import {ReportService} from 'src/app/core/services/report.service';
import {MessageService} from 'primeng/api';
import {HelpersService} from 'src/app/core/services/helpers.service';
import {generateRandomRGB} from 'src/app/core/utils';

@Component({
  selector: 'app-chart5',
  templateUrl: './chart5.component.html',
  styleUrls: ['./chart5.component.scss']
})
export class Chart5Component implements OnInit, OnChanges, OnDestroy {
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
      this.title = `DIMENSI PROSES DAN KONTROL RISIKO`;
      const params = {
        survey_id: this.survey.id,
        periode: this.survey.periode,
        jenis_industri: this.survey.jenis_industri
      };
      this.service.chart5(params).subscribe({
        next:(resp) => {
          if(resp.data.length > 0){
            this.listdata = resp.data;
            const labels = [
              "Identifikasi Risiko utama",
              "Pengukuran Risiko",
              "Kerangka proses pengukuran Risiko untuk prioritisasi Risiko",
              "Integrasi atas seluruh Risiko utama",
              "Aktivitas perlakuan terhadap Risiko utama",
              "Identifikasi dan pengelolaan eksposur Risiko yang berada diatas selera risiko",
              "Pelaporan Risiko melaporkan Risiko secara real-time"
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
                data: [
                  f['parameter_1'],
                  f['parameter_2'],
                  f['parameter_3'],
                  f['parameter_4'],
                  f['parameter_5'],
                  f['parameter_6'],
                  f['parameter_7']
                ]
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
