import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ReportService} from 'src/app/core/services/report.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-aspek-kinerja-detail',
  templateUrl: './aspek-kinerja-detail.component.html',
  styleUrls: ['./aspek-kinerja-detail.component.scss']
})
export class AspekKinerjaDetailComponent implements OnInit {
  id: any = null;
  surveyId: any = null;
  skeletonVisible = false;
  summary = null || {};
  listdatadimensi = [];
  listdatakinerja = [];
  msgs = [];
  totalSkorDimensi = 0;
  totalKonversi = 0;
  penyesuaianSkor = 0;
  skorRMI = 0;
  constructor(
      private activeRoute: ActivatedRoute,
      private service: ReportService,
      private messageService: MessageService,
      private route: Router
  ) {
    this.id = this.activeRoute.snapshot.paramMap.get('id');
    this.surveyId = this.activeRoute.snapshot.paramMap.get('survey_id');
    this.get();
  }

  ngOnInit(): void {
  }
  get(){
    if (this.id){
      this.skeletonVisible = true;
      this.service.penilaianRMI({'aspek_id': this.id, 'survey_id': this.surveyId}).subscribe((resp) => {
        if (resp.data.kinerja.length > 0){
          this.listdatakinerja = resp.data.kinerja;
          this.listdatakinerja.forEach((f: any) => {
            this.totalKonversi += f.nilai_konversi;
            if (this.totalKonversi <= 50) {
              this.penyesuaianSkor = -1.00;
            } else if (this.totalKonversi > 50 && this.totalKonversi <= 65) {
              this.penyesuaianSkor = -0.75;
            } else if (this.totalKonversi > 65 && this.totalKonversi <= 80) {
              this.penyesuaianSkor = -0.50;
            } else if (this.totalKonversi > 80 && this.totalKonversi <= 90) {
              this.penyesuaianSkor = -0.25;
            } else {
              this.penyesuaianSkor = 0.00;
            }
          });
        }
        if (resp.data.dimensi.length > 0){
          this.listdatadimensi = resp.data.dimensi;
          this.listdatadimensi.forEach((f: any) => {
            this.totalSkorDimensi += f.skordimensi;
          });
          if (this.totalSkorDimensi > 0) {
            this.totalSkorDimensi = this.totalSkorDimensi / resp.data.dimensi.length;
            this.skorRMI = this.totalSkorDimensi + this.penyesuaianSkor;
          }
          console.log(this.totalSkorDimensi);
        }
        if (resp.data.summary.length > 0){
          this.summary = resp.data.summary[0];
        }
        console.log(this.summary);
        console.log(resp);
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
    this.route.navigate(['report/aspek-kinerja']);
  }
}
