import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {DialogService} from 'primeng/dynamicdialog';
import {ReportService} from 'src/app/core/services/report.service';
import {MessageService} from 'primeng/api';
import {HelpersService} from 'src/app/core/services/helpers.service';
import {generateRandomRGB} from 'src/app/core/utils';

@Component({
  selector: 'app-chart6',
  templateUrl: './chart6.component.html',
  styleUrls: ['./chart6.component.scss']
})
export class Chart6Component implements OnInit, OnDestroy, OnChanges {
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
      this.title = `DIMENSI MODEL DATA DAN TEKNOLOGI RISIKO`;
      const params = {
        survey_id: this.survey.id,
        periode: this.survey.periode,
        jenis_industri: this.survey.jenis_industri
      };
      this.service.chart5(params).subscribe({
        next:(resp) => {
          if(resp.data.length > 0){
            this.listdata = resp.data;
            const labels = this.listdata.map(item => item.survey_name.toUpperCase());
            this.radarData = {
              labels: labels,
              datasets: [
                {
                  label: 'Data Risiko',
                  backgroundColor: `rgba(${generateRandomRGB()},0.2)`,
                  borderColor: `rgba(${generateRandomRGB()},1)`,
                  data: [
                    this.listdata[0]['parameter_1'],
                    this.listdata[1]['parameter_1'],
                    this.listdata[2]['parameter_1'],
                    this.listdata[3]['parameter_1']
                  ]
                },
                {
                  label: 'Permodelan dan Teknologi Risiko',
                  backgroundColor: `rgba(${generateRandomRGB()},0.2)`,
                  borderColor: `rgba(${generateRandomRGB()},1)`,
                  data: [
                    this.listdata[0]['parameter_2'],
                    this.listdata[1]['parameter_2'],
                    this.listdata[2]['parameter_2'],
                    this.listdata[3]['parameter_2']
                  ]
                }
              ]
            };

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
