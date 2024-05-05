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
}
