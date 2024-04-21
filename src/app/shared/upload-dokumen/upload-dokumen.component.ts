import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FileUploadControl, FileUploadValidators } from '@iplab/ngx-file-upload';
import { DialogService } from 'primeng/dynamicdialog';
import { IfService } from 'src/app/core/services/if.service';
import { PopupLoadingComponent } from '../popup-loading/popup-loading.component';
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
    private ifService: IfService
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
    if(this.forms.valid){
      let files = this.forms.value.files[0];
      let formPost = new FormData();
      if(files){
        formPost.append('FileSelected', files);
        formPost.append('Direktory', this.direktori);
        const overlay = this.dialog.open(PopupLoadingComponent, {
          data : {
            message: 'Uploading File...'
          }
        });
        this.ifService.post(`RepoFile`, formPost).subscribe((resp: any) => {
          overlay.close(true);
          if(resp.idfile){
            this.callback.emit(resp);
          }
        }, (error) => {
          overlay.close(true);
        })
      }  
    }
    
    
  }
}
