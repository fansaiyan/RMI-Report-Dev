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
	adjustAspekimensi() : Observable<any>{
		return this.ifService.get(`api/parameter-dimensi`) as Observable<any>;
	}
}
