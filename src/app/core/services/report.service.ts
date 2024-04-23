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
    adjustAspekDimensi(params: any): Observable<any> {
        return this.ifService.get(`api/report/adjust-aspek-dimensi`, params) as Observable<any>;
    }
    adjustAspekDimensiDetail(params: any): Observable<any> {
        return this.ifService.get(`api/report/adjust-aspek-dimensi-detail`, params) as Observable<any>;
    }
    aspekKinerjaDetail(id: any): Observable<any>{
        return this.ifService.get(`api/aspek-kinerja/${id}`) as Observable<any>;
    }
	penilaianRMI(params: any): Observable<any>{
		return this.ifService.get(`api/report/hasil-penilaian-rmi`, params) as Observable<any>;
	}
}
