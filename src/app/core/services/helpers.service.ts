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
  exportExcel(rows: any, filename: string, skip_red?: boolean, rows2?: any){
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
            if(!skip_red){
              worksheet[cell].s = redCellStyle;
            }
          }
        }
      }
      let workbook = {
        Sheets: {
          'data': worksheet
        },
        SheetNames: ['data']
      };
      if(rows2){
        const worksheet2 = xlsx.utils.json_to_sheet(rows2);
        const range2 = xlsx.utils.decode_range(worksheet2['!ref'] || 'A1');
        for (let rowNum = range2.s.r + 1; rowNum <= range2.e.r; rowNum++) {
          const row = worksheet2[xlsx.utils.encode_cell({ r: rowNum, c: 9 })]; // Assuming filename is in the first column
          if (row && !row.v) {
            for (let colNum = range2.s.c; colNum <= range2.e.c; colNum++) {
              const cell = xlsx.utils.encode_cell({ r: rowNum, c: colNum });
              if (!worksheet2[cell]) continue; // Skip empty cells
              if(!skip_red){
                worksheet2[cell].s = redCellStyle;
              }
            }
          }
        }
        workbook.Sheets['OFI'] = worksheet2;
        workbook.SheetNames.push('OFI');
      }
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, `${filename}`);
    });
  }
  exportExcel2(rows: any, filename: string, skip_red?: boolean, rows2?: any, companyName?: string) {
    import('xlsx-js-style').then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet([]);

      // Jika ada companyName, tambahkan di A1 dan B1
      let startRow = 0;
      if (companyName) {
        xlsx.utils.sheet_add_json(worksheet, [{ 'A': 'Company', 'B': companyName }], { skipHeader: true, origin: 'A1' });
        startRow = 3; // Jeda 2 baris, sehingga tabel mulai dari baris ke-4
      }

      // Tambahkan data mulai dari baris berikutnya setelah header (A4 jika companyName ada, A1 jika tidak)
      xlsx.utils.sheet_add_json(worksheet, rows, { origin: `A${startRow + 1}` });

      // --- Gaya merah untuk sel kosong ---
      const redCellStyle = {
        fill: {
          type: 'pattern',
          patternType: 'solid',
          fgColor: { rgb: 'FF0000' },
          bgColor: { rgb: 'FF0000' }
        }
      };

      // Iterasi untuk menerapkan gaya merah jika filename kosong
      const range = xlsx.utils.decode_range(worksheet['!ref'] || 'A1');
      for (let rowNum = range.s.r + 1; rowNum <= range.e.r; rowNum++) {
        const row = worksheet[xlsx.utils.encode_cell({ r: rowNum, c: 9 })]; // Kolom ke-9 (J)
        if (row && !row.v) {
          for (let colNum = range.s.c; colNum <= range.e.c; colNum++) {
            const cell = xlsx.utils.encode_cell({ r: rowNum, c: colNum });
            if (!worksheet[cell]) continue; // Skip sel kosong
            if (!skip_red) {
              worksheet[cell].s = redCellStyle;
            }
          }
        }
      }

      let workbook = {
        Sheets: { 'data': worksheet },
        SheetNames: ['data']
      };

      // --- Jika ada rows2 (lembar kerja kedua) ---
      if (rows2) {
        const worksheet2 = xlsx.utils.json_to_sheet([]);
        let startRow2 = 0;

        if (companyName) {
          xlsx.utils.sheet_add_json(worksheet2, [{ 'A': 'Company', 'B': companyName }], { skipHeader: true, origin: 'A1' });
          startRow2 = 3; // Jeda 2 baris sebelum tabel
        }

        xlsx.utils.sheet_add_json(worksheet2, rows2, { origin: `A${startRow2 + 1}` });

        workbook.Sheets['OFI'] = worksheet2;
        workbook.SheetNames.push('OFI');
      }

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
  exportPDF2(columns: any, rows: any, filename: string, table: HTMLTableElement, companyName?: string) {
    const doc = new jsPDF();

    if (companyName) {
      // Tambahkan nama perusahaan di atas tabel
      doc.setFontSize(10);
      doc.text('Company :', 14, 15);
      doc.setFontSize(12);
      doc.text(companyName, 35, 15);

      // Jeda 2 baris sebelum tabel
      autoTable(doc, {
        head: [],
        body: [],
        startY: 25, // Mulai tabel dari posisi Y yang lebih rendah
      });
    }

    // Render tabel utama
    autoTable(doc, {
      head: [columns],
      body: rows,
      startY: companyName ? 35 : 15, // Jika ada Company Name, mulai lebih ke bawah
    });

    doc.save(`${filename}.pdf`);
  }

}
