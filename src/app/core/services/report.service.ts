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
  execPrint(param: any){
    const params = {
			reportName: param.FileName,
			formatType: param.Type,
			parameters: param.Params
		};
    return this.ifService.postPrint(params);
  }
  extractData(res: any, type: number, filename: string) {
		const fileType =
			type === 1 ? 'application/pdf' : type === 2 ? 'application/msword' : 'application/vnd.ms-excel';
		const extention = type === 1 ? '.pdf' : type === 2 ? '.doc' : '.xls';
		const fileName = filename.replace('.rpt', '') + extention;
		const myBlob: Blob = new Blob([ res ], { type: fileType });
		const fileURL = URL.createObjectURL(myBlob);
		const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;
		if (type === 1) {
			window.open(fileURL);
		}
		a.href = fileURL;
		a.download = fileName;
		document.body.appendChild(a);
		a.click();

		document.body.removeChild(a);
		URL.revokeObjectURL(fileURL);
		// window.open(fileURL);
	}
}
