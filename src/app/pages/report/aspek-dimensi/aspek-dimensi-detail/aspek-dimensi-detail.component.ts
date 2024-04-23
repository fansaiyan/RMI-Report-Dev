import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ReportService} from 'src/app/core/services/report.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-aspek-dimensi-detail',
  templateUrl: './aspek-dimensi-detail.component.html',
  styleUrls: ['./aspek-dimensi-detail.component.scss']
})
export class AspekDimensiDetailComponent implements OnInit {
  id: any = null;
  skeletonVisible = false;
  listdata = [];
  msgs = [];
  avgDimensi = 0;
  avgMax = 0;
  radarData: any;
  radarOptions: any;
  constructor(
      private activeRoute: ActivatedRoute,
      private service: ReportService,
      private messageService: MessageService,
      private route: Router
  ) {
    this.id = this.activeRoute.snapshot.paramMap.get('survey_id');
    this.get();
  }

  ngOnInit(): void {

  }
  get(){
    if (this.id){
      this.skeletonVisible = true;
      this.service.aspekDimensi({'survey_id': this.id}).subscribe((resp) => {
        if (resp.data.length > 0){
          this.listdata = resp.data;
          this.listdata.forEach((f: any) => {
            this.avgDimensi += f.skordimensi;
            this.avgMax += f.skor_max;
          });
          if (this.avgDimensi > 0) {
            this.avgDimensi = this.avgDimensi / resp.data.length;
          }
          if (this.avgMax > 0) {
            this.avgMax = this.avgMax / resp.data.length;
          }
          const labels = this.listdata.map(item => item.deskripsi);
          const scores = this.listdata.map(item => item.skordimensi);
          this.radarData = {
            labels: labels,
            datasets: [
              {
                label: 'Skor Dimensi',
                backgroundColor: 'rgba(54, 162, 235,0.2)',
                borderColor: 'rgba(54, 162, 235,1)',
                data: scores
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
                min: 1,  // Set the minimum value of the scale to 1
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
          console.log(this.listdata);
        }
        this.skeletonVisible = false;
      }, (error: any) => {
        this.skeletonVisible = false;
        this.messageService.add({
          key: 'toast-notif',
          severity: 'error',
          summary: 'Error',
          detail: error.error,
        });
      });
    }
  }
  back(){
    this.route.navigate(['report/aspek-dimensi']);
  }
}
