import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MessageService} from 'primeng/api';
import {MasterService} from 'src/app/core/services/master.service';
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {AuthenticationService} from 'src/app/core/services/auth.service';
import {SMIService} from 'src/app/core/services/smi.service';

@Component({
  selector: 'app-detail-files',
  templateUrl: './detail-files.component.html',
  styleUrls: ['./detail-files.component.scss'],
  providers: [MessageService]
})
export class DetailFilesComponent implements OnInit, OnDestroy {
  loading: boolean;
  listdata: any[] = [];
  msgs: any[] = [];
  @ViewChild('dt', {static: false}) dt: any;

  constructor(
      private messageService: MessageService,
      private service: MasterService,
      public dialog: DialogService,
      public config: DynamicDialogConfig,
      public ref: DynamicDialogRef,
      private authService: AuthenticationService,
      public smiService: SMIService
  ) {
  }

  ngOnInit(): void {
    this.gets();
  }

  gets() {
    const params = {
      'email': this.config.data.email,
      'survey_code': this.config.data.survey_code,
      'criteria': this.config.data.criteria
    };
    if (this.loading) { this.loading = true; }
    this.listdata = [];
    this.msgs = [];
    this.smiService.uploaded_files(params).subscribe(resp => {
      if (resp.data.length > 0) {
        this.listdata = resp.data;
      } else {
        this.msgs.push({ severity: 'info', summary: 'Informasi', detail: 'Data Tidak Tesedia' });
      }
      this.loading = false;
    }, (error: any) => {
      this.loading = false;
      if (Array.isArray(error.error.error)){
        for (let i = 0; i < error.error.error.length; i++){
          this.msgs.push({ severity: 'error', summary: 'error', detail: error.error.error[i] });
        }
      } else {
        this.msgs.push({ severity: 'error', summary: 'error', detail: error.error });
      }
    });
  }

  pilih(e: any) {
    this.ref.close({...e});
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
      if (Array.isArray(error.error.error)){
        for (let i = 0; i < error.error.error.length; i++){
          this.msgs.push({ severity: 'error', summary: 'error', detail: error.error.error[i] });
        }
      } else {
        this.msgs.push({ severity: 'error', summary: 'error', detail: error.error });
      }
    });
  }
  ngOnDestroy(): void {
    this.msgs = [];
    this.listdata = [];
  }
}
