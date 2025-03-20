import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Message, MessageService} from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import {SMIService} from 'src/app/core/services/smi.service';
import {PopupLoadingComponent} from 'src/app/shared/popup-loading/popup-loading.component';
import {AuthenticationService} from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-form-calculation',
  templateUrl: './form-calculation.component.html',
  styleUrls: ['./form-calculation.component.scss'],
  providers: [MessageService]
})
export class FormCalculationComponent implements OnInit, OnDestroy {
  forms: FormGroup;
  initialForm: any;
  msgs: Message[] = [];
  constructor(
      public dialog: DialogService,
      public config: DynamicDialogConfig,
      public ref: DynamicDialogRef,
      private fb: FormBuilder,
      private service: SMIService,
      private authService: AuthenticationService,
  ) {
    this.forms = this.fb.group({
      id: [0, [Validators.required, Validators.min(1)]],
      email: [0, [Validators.required, Validators.min(1)]],
      final_result: [0, Validators.required],
      asesor_email: ["", Validators.required],
      asesor_name: ["", Validators.required],
      remark: ""
    });
    this.initialForm = this.forms.value;
  }

  ngOnInit(): void {
    this.forms.patchValue({
      id: this.config.data.id,
      email: this.config.data.email,
      final_result: this.config.data.final_result,
      asesor_email: this.config.data.asesor_email ? this.config.data.asesor_email : this.authService.email(),
      asesor_name: this.config.data.asesor_name ? this.config.data.asesor_name : this.authService.name(),
      remark: this.config.data.remark
    });
  }
  simpan(){
    if (this.forms.valid){
      const overlay = this.dialog.open(PopupLoadingComponent, {
        data: {
          message: 'Menyimpan Data'
        }
      });
      this.service.put_final_calculation(this.forms.value).subscribe((resp: any) => {
        overlay.close(true);
        this.ref.close({...resp});
      }, (error: any) => {
        overlay.close(true);
        this.msgs = [];
        if (Array.isArray(error.error.error)){
          for (let i = 0; i < error.error.error.length; i++){
            this.msgs.push({ severity: 'error', summary: 'error', detail: error.error.error[i] });
          }
        } else {
          this.msgs.push({ severity: 'error', summary: 'error', detail: error.error });
        }
      });
    }
  }
  batal(){
    this.ngOnDestroy();
    this.ref.close();
  }
  ngOnDestroy(): void {
    this.forms.reset(this.initialForm);
  }
}
