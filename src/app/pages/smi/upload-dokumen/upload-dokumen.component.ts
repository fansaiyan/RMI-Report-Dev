import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from 'src/app/core/services/auth.service';
import {SMIService} from 'src/app/core/services/smi.service';
import {DialogService} from 'primeng/dynamicdialog';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {HelpersService} from 'src/app/core/services/helpers.service';
import {UploadDokumenComponent as up} from 'src/app/shared/upload-dokumen/upload-dokumen.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-upload-dokumen',
  templateUrl: './upload-dokumen.component.html',
  styleUrls: ['./upload-dokumen.component.scss']
})
export class UploadDokumenComponent implements OnInit {
  loading = false;
  listdata = [];
  msgs: any[] = [];
  constructor(
      public dialog: DialogService,
      private messageService: MessageService,
      private router: Router,
      private authService: AuthenticationService,
      private helper: HelpersService,
      private smiService: SMIService
  ) {
  }

  ngOnInit(): void {
    this.gets();
  }
  gets(){
    const params = {
      'email': this.authService.email(),
      'survey_code': environment.smi_survey_code
    };
    if (this.loading) { this.loading = true; }
    this.listdata = [];
    this.smiService.uploaded_files(params).subscribe(resp => {
      if (resp.data.length > 0){
        this.listdata = resp.data;
      } else {
        this.messageService.add({
          key: 'toast-notif',
          severity: 'info',
          summary: 'Informasi',
          detail: 'Data Tidak Tesedia'
        });
      }
      this.loading = false;
    }, (error: any) => {
      this.loading = false;
      this.messageService.add({
        key: 'toast-notif',
        severity: 'error',
        summary: 'Error',
        detail: error.error.message
      });
    });
  }
  upload(e: any){
    const ref = this.dialog.open(up, {
      width: '900px',
      header: 'Upload Document',
      data: {
        email : this.authService.email(),
        userid: 1,
        dokumen_id: e.dokumen_id
      }
    });
    ref.onClose.subscribe((resp: any) => {
      if(resp && resp.data.length > 0){
        this.listdata = this.listdata.map(item => item.dokumen_id === resp.data[0].dokumen_id ? resp.data[0] : item);
        this.messageService.add({
          key: 'toast-notif',
          severity: 'success',
          summary: 'Success',
          detail: 'Document uploaded successfully.'
        });
      }
    });
  }
  download(e: any){
    this.smiService.downloadFile(e.dokumen_id).subscribe(blob => {
      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(blob);
      a.href = objectUrl;
      a.download = `${e.file_name}`;
      a.click();
      URL.revokeObjectURL(objectUrl);
    }, error => {
      console.error('Download failed:', error);
    });
  }
}
