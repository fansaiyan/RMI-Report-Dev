import { Injectable } from '@angular/core';
import {IfService} from './if.service';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(
      private ifService: IfService
  ) { }
  finalRat(): Observable<any>{
    return this.ifService.get(`api/parameter-dimensi`) as Observable<any>;
  }
  parameterDimensi(): Observable<any>{
    return this.ifService.get(`api/parameter-dimensi`) as Observable<any>;
  }
  parameterGroup(): Observable<any>{
    return this.ifService.get(`api/parameter-group`) as Observable<any>;
  }
  finalRating(): Observable<any>{
    return this.ifService.get(`api/final-rating`) as Observable<any>;
  }
  icr(): Observable<any>{
    return this.ifService.get(`api/interest-coverage-ratio`) as Observable<any>;
  }
  icrByRate(param: any): Observable<any>{
    return this.ifService.get(`api/interest-coverage-ratio-by-rate`, param ? param : {}) as Observable<any>;
  }
  kompositResiko(): Observable<any>{
    return this.ifService.get(`api/komposit-resiko`) as Observable<any>;
  }
  surveyList(param?: any): Observable<any> {
    let qparam = param ? param : {};
    return this.ifService.get(`api/survey-list`, param ? param : {}) as Observable<any>;
  }
  surveyByid(id: number): Observable<any> {
    return this.ifService.get(`api/survey-by-id/${id}`) as Observable<any>;
  }
  aspekKinerjaList(param?: any): Observable<any> {
    return this.ifService.get(`api/aspek-kinerja-list`, param ? param : {}) as Observable<any>;
  }
  aspekKinerjaById(id: number): Observable<any> {
    return this.ifService.get(`api/aspek-kinerja-by-id/${id}`) as Observable<any>;
  }
  postAspekKinerja(postBody: any): Observable<any>{
    return this.ifService.post(`api/aspek-kinerja-create`, postBody);
  }
  postAspekKinerjaDelete(id: any): Observable<any>{
    return this.ifService.delete(`api/aspek-kinerja-delete/${id}`);
  }
  getCompanyUserEmail(): Observable<any>{
    return this.ifService.get(`api/company_user_email`) as Observable<any>;
  }
  surveyGetLink(params: any): Observable<any> {
    return this.ifService.get(`api/survey-get-link`, params) as Observable<any>;
  }
  postCalculateFinalRating(postBody: any): Observable<any>{
    return this.ifService.post(`api/calculate_final_rating`, postBody);
  }
}
