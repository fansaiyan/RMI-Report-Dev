import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FileUploadControl, FileUploadValidators } from '@iplab/ngx-file-upload';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PopupLoadingComponent } from '../popup-loading/popup-loading.component';
import {SMIService} from 'src/app/core/services/smi.service';
@Component({
  selector: 'app-upload-dokumen',
  templateUrl: './upload-dokumen.component.html',
  styleUrls: ['./upload-dokumen.component.scss']
})
export class UploadDokumenComponent implements OnInit, OnChanges {
  @Input() direktori: string;
  @Input() fileSelected: any;
  @Input() fileType: string;
  public animation: boolean = true;
  public multiple: boolean = false;
  public fileUploadControl = new FileUploadControl({
    accept: [], 
    discardInvalid: true},
    []);
  forms: FormGroup;
  @Output() callback = new EventEmitter;
  constructor(
    private fb: FormBuilder,
    public dialog: DialogService,
    private smiService: SMIService,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef
  ) {
    this.forms = this.fb.group({
      files: [null, Validators.required]
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.fileType){
      this.fileUploadControl.acceptFiles(this.fileType);
      this.forms.controls['files'].setValidators(FileUploadValidators.accept([this.fileType]));
    }
    if(this.fileSelected){
      this.forms.patchValue({
        files: [new File([''], this.fileSelected.namafile)]
      })
    }
    this.forms.valueChanges.subscribe(resp => {
      if(resp.files.length == 0){
        this.callback.emit({removed: true});
      }
    });
  }
  ngOnInit() {
    
  }
  selectFiles(){
    if(this.forms.valid) {
      let files = this.forms.value.files[0];
      let formPost = new FormData();
      if (files) {
        formPost.append('file', files);
        formPost.append('email', this.config.data.email);
        formPost.append('userid', this.config.data.userid);
        formPost.append('dokumen_id', this.config.data.dokumen_id);
        const overlay = this.dialog.open(PopupLoadingComponent, {
          data: {
            message: 'Uploading File...'
          }
        });
        this.smiService.upload_file(formPost).subscribe((resp: any) => {
          overlay.close(true);
          if (resp) {
            this.ref.close(resp)
          }
        }, (error) => {
          overlay.close(true);
        })
      }
    }
  }
}
