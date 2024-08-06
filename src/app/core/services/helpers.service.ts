import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {BehaviorSubject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HelpersService {
  private infoSurvey = new BehaviorSubject({});
  public _infoSurvey = this.infoSurvey.asObservable();

  private surveySelected = new BehaviorSubject(<any>null);
  public _surveySelected = this.surveySelected.asObservable();
  constructor() { }
  setSurveySelected(e: number){
    this.surveySelected.next(e);
  }
  setInfoSurvey(e: any): void{
    this.infoSurvey.next(e);
  }
  exportCSV(csvContent: any,  filename: string){
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `${filename}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
  exportExcel(rows: any, filename: string){
    import('xlsx-js-style').then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(rows);

      // Define the red style
      const redCellStyle = { fill: { type: 'pattern', patternType: 'solid', fgColor: { rgb: 'FF0000' }, bgColor: { rgb: 'FF0000' } } };

      // Iterate through rows and apply style if filename is empty
      const range = xlsx.utils.decode_range(worksheet['!ref'] || 'A1');
      for (let rowNum = range.s.r + 1; rowNum <= range.e.r; rowNum++) {
        const row = worksheet[xlsx.utils.encode_cell({ r: rowNum, c: 9 })]; // Assuming filename is in the first column
        if (row && !row.v) {
          for (let colNum = range.s.c; colNum <= range.e.c; colNum++) {
            const cell = xlsx.utils.encode_cell({ r: rowNum, c: colNum });
            if (!worksheet[cell]) continue; // Skip empty cells
            worksheet[cell].s = redCellStyle;
          }
        }
      }
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, `${filename}`);
    });
  }
  saveAsExcelFile(buffer: any, fileName: string): void {
    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
  exportPDF(columns: any, rows: any, filename: string, table: HTMLTableElement){
    const doc = new jsPDF();
    autoTable(doc, { html: table });
    autoTable(doc, {
      head: [columns],
      body: rows
    });
    doc.save(`${filename}.pdf`);
  }
}
