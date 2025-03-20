import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SMIService {

  constructor(
      private http: HttpClient,
  ) { }
  surveys(params: any): Observable<any> {
    return this.http.get(`${environment.url_smi}api/surveys`, {params: params}) as Observable<any>;
  }
  upload_file(body: any): Observable<any> {
    return this.http.post(`${environment.url_smi}api/upload_file`, body).pipe(map( resp => <any>resp)) as Observable<any>;
  }
  uploaded_files(params: any): Observable<any> {
    return this.http.get(`${environment.url_smi}api/uploaded_files`, {params: params}) as Observable<any>;
  }
  downloadFile(dokumenId: number): Observable<Blob> {
    const url = `${environment.url_smi}api/download_file?dokumen_id=${dokumenId}`;
    return this.http.get(url, { responseType: 'blob' });
  }
  get_final_calculation(params: any): Observable<any> {
    return this.http.get(`${environment.url_smi}api/final_calculation`, {params: params}) as Observable<any>;
  }
  put_final_calculation(params: any): Observable<any> {
    return this.http.post(`${environment.url_smi}api/update_final_calculation`, params, {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: false
    }).pipe(map( resp => <any>resp)) as Observable<any>;
  }
  get_email_entry_survey(params: any): Observable<any> {
    return this.http.get(`${environment.url_smi}api/email_entry_survey`, {params: params}) as Observable<any>;
  }
}
