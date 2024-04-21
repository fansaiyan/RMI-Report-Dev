import { Injectable } from '@angular/core';
import {IfService} from './if.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(
      private ifService: IfService
  ) { }
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
}
