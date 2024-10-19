import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IfService } from './if.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(
    private ifService: IfService
  ) { }
    aspekDimensi(params: any){
        return this.ifService.get(`api/report/aspek-dimensi`, params) as Observable<any>;
    }
    adjustAspekDimensi(params: any): Observable<any> {
        return this.ifService.get(`api/report/adjust-aspek-dimensi`, params) as Observable<any>;
    }
    adjustAspekDimensiPerdimensi(params: any): Observable<any> {
        return this.ifService.get(`api/report/adjust-aspek-dimensi-perdimensi`, params) as Observable<any>;
    }
    adjustAspekDimensiPersubdimensi(params: any): Observable<any> {
        return this.ifService.get(`api/report/adjust-aspek-dimensi-persubdimensi`, params) as Observable<any>;
    }
    adjustAspekDimensiDetail(params: any): Observable<any> {
        return this.ifService.get(`api/report/adjust-aspek-dimensi-detail`, params) as Observable<any>;
    }
    adjustAspekDimensiDetailAllRows(params: any): Observable<any> {
        return this.ifService.get(`api/report/adjust-aspek-dimensi-detail-all-rows`, params) as Observable<any>;
    }
	penilaianRMI(params: any): Observable<any>{
		return this.ifService.get(`api/report/hasil-penilaian-rmi`, params) as Observable<any>;
	}
    chart1(params: any): Observable<any>{
        return this.ifService.get(`api/report/chart1`, params) as Observable<any>;
    }
    chart2(params: any): Observable<any>{
        return this.ifService.get(`api/report/chart2`, params) as Observable<any>;
    }
    chart3(params: any): Observable<any>{
        return this.ifService.get(`api/report/chart3`, params) as Observable<any>;
    }
    chart4(params: any): Observable<any>{
        return this.ifService.get(`api/report/chart4`, params) as Observable<any>;
    }
    chart5(params: any): Observable<any>{
        return this.ifService.get(`api/report/chart5`, params) as Observable<any>;
    }
    chart6(params: any): Observable<any>{
        return this.ifService.get(`api/report/chart6`, params) as Observable<any>;
    }
    ofi(params: any): Observable<any>{
        return this.ifService.get(`api/report/ofi`, params) as Observable<any>;
    }
    ofi_detail(params: any): Observable<any>{
        return this.ifService.get(`api/report/ofi-detail`, params) as Observable<any>;
    }
    all_survey(params: any): Observable<any>{
        return this.ifService.get(`api/report/all-survey-data`, params) as Observable<any>;
    }

}
