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
  kompositResiko(): Observable<any>{
    return this.ifService.get(`api/komposit-resiko`) as Observable<any>;
  }
  surveyList(param?: any): Observable<any> {
    let qparam = param ? param : {};
    return this.ifService.get(`api/survey-list`, param ? param : {}) as Observable<any>;
  }
  aspekKinerjaList(): Observable<any> {
    return this.ifService.get(`api/aspek-kinerja-list`) as Observable<any>;
  }
  postAspekKinerja(postBody: any): Observable<any>{
    return this.ifService.post(`api/aspek-kinerja-create`, postBody);
  }
}
