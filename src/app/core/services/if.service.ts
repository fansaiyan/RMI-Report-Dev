import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IfService {
  headers: HttpHeaders | undefined;
  bodyUrl: URLSearchParams | undefined;
  roleid: string = "";
  menulink: string = '';
  constructor(
    private http: HttpClient,
    private authService: AuthenticationService) {}

  getHeaders(headers?: any): HttpHeaders {
    const headerObj: any = {
      'Content-Type' : 'application/json'
      // Authorization: 'Bearer ' + this.authService.getAccessToken(),
      // Roleid: this.roleid,
      // Menulink: this.menulink
    };
    if (headers) {
      headers.forEach((value: string, key: string) => {
        headerObj[key] = value;
      });
    }

    return this.headers = new HttpHeaders(headerObj);

  }

  getSearchParams(body: any): URLSearchParams {

    const bodyUrl = new Map();
    const newBody: any = {};

    // tslint:disable-next-line: forin
    for (const param in body) {
      if (Array.isArray(body[param])) {

        body[param].forEach((value: any, key: string) => {
          // tslint:disable-next-line: forin
          for (const item in value) {
            const obj = typeof value[item] === 'boolean' ? `${param}[${key}][${item}]` : `${param}[${key}][${item}][value]`;
            bodyUrl.set(obj, value[item]);
          }
        });

      } else {
        bodyUrl.set(param, body[param]);
      }
    }

    bodyUrl.forEach((value: any, key: string) => {
      newBody[key] = value;
    });

    return this.bodyUrl = new URLSearchParams(newBody);

  }

  get(url: string, params?: any, reqOpts?: any): Observable<any> {

    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }

    if (params) {

      reqOpts.params = new HttpParams();

      // tslint:disable-next-line: forin
      for (const reqParams in params) {
        reqOpts.params = reqOpts.params.set(reqParams, params[reqParams]);
      }

    }
    // reqOpts.headers = this.getHeaders();
    // if (this.authService.getAccessToken()) {
    //   reqOpts.headers = this.getHeaders();
    // }

    reqOpts.withCredentials = true;

    return this.http.get<any>(environment.url + url, reqOpts)
      .pipe(map( resp => <any> resp)) as Observable<any>;

  }

  // tslint:disable-next-line: max-line-length
  post(url: string, body: any, reqOpts?: any, searchParam?: any): Observable<any> {
    if (reqOpts) {
      reqOpts.withCredentials = true;
    } else {
      reqOpts = {
        withCredentials: true
      };
    }

    if (this.authService.getAccessToken()) {
      reqOpts.headers = this.getHeaders(reqOpts.headers);
    }

    if (searchParam) {
      const bodyUrl = this.getSearchParams(searchParam).toString();
      body = body ? body.concat(bodyUrl) : bodyUrl;
    }

    return this.http.post<any>(environment.url + url, body, reqOpts)
      .pipe(map( resp => <any>resp)) as Observable<any>;

  }

  // tslint:disable-next-line: max-line-length
  patch(url: string, body: any, reqOpts?: any, params?: any): Observable<any> {

    if (reqOpts) {
      reqOpts.withCredentials = true;
    } else {
      reqOpts = {
        withCredentials: true
      };
    }

    if (this.authService.getAccessToken()) {
      reqOpts.headers = this.getHeaders(reqOpts.headers);
    }

    if (params) {
      reqOpts.params = new HttpParams();
      // tslint:disable-next-line: forin
      for (const reqParams in params) {
        reqOpts.params = reqOpts.params.set(reqParams, params[reqParams]);
      }
    }

    return this.http.patch<any>(environment.url + url, body, reqOpts)
    .pipe(map( resp => <any>resp)) as Observable<any>;;
  }

  put(url: string, body: any, reqOpts?: any): Observable<any> {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }

    if (this.authService.getAccessToken()) {
      reqOpts.headers = this.getHeaders();
    }

    return this.http.put<any>(environment.url + url, body, reqOpts)
      .pipe(map( resp => <any>resp)) as Observable<any>;;

  }

  delete(url: string, bodyData?: any, reqOpts?: any): Observable<any> {
    if (reqOpts) {
      reqOpts.withCredentials = true;
    } else {
      reqOpts = {
        withCredentials: true
      };
    }

    if (this.authService.getAccessToken()) {
      reqOpts.body = bodyData;
      reqOpts.headers = this.getHeaders();
    }

    return this.http.delete<any>(environment.url + url, reqOpts)
      .pipe(map( resp => <any>resp)) as Observable<any>;
  }

  checkConnection(): boolean {
    return navigator.onLine;
  }
  // postPrint(body: any){
  //   return this.http.post(environment.urlReport, body, { responseType: 'blob' });
  //
  // }
}
