import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ReportService} from 'src/app/core/services/report.service';
import {MessageService} from 'primeng/api';
import {HelpersService} from 'src/app/core/services/helpers.service';
import {Subscription} from 'rxjs';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-aspek-dimensi-detail',
  templateUrl: './aspek-dimensi-detail.component.html',
  styleUrls: ['./aspek-dimensi-detail.component.scss']
})
export class AspekDimensiDetailComponent implements OnInit, OnDestroy {
  id: any = null;
  skeletonVisible = false;
  listdata = [];
  msgs = [];
  avgDimensi = 0;
  avgMax = 5;
  radarData: any;
  radarOptions: any;
  surveySelected: any;
  infoSurveySubs : Subscription
  constructor(
      private activeRoute: ActivatedRoute,
      private service: ReportService,
      private messageService: MessageService,
      private route: Router,
      private helper: HelpersService
  ) {
    this.infoSurveySubs = this.helper._infoSurvey.subscribe((s) => {
      this.surveySelected = s;
      console.log(this.surveySelected);
    });
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
            // this.avgMax += f.skor_max;
          });
          if (this.avgDimensi > 0) {
            this.avgDimensi = this.avgDimensi / resp.data.length;
          }
          this.avgDimensi = parseFloat(this.avgDimensi.toFixed(2));
          if (this.avgMax > 0) {
            // this.avgMax = this.avgMax / resp.data.length;
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
    this.route.navigate(['rmi/report/aspek-dimensi']);
  }
  print(){
    const data = document.getElementById('printArea');
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const heightLeft = imgHeight;
      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('hasil-penilaian-RMI.pdf'); // Generated PDF
    });
  }
  ngOnDestroy(): void {
    this.infoSurveySubs.unsubscribe();
  }
}
