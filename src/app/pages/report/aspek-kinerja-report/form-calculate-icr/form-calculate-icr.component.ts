import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Message} from 'primeng/api';
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {MasterService} from 'src/app/core/services/master.service';
import {PopupLoadingComponent} from 'src/app/shared/popup-loading/popup-loading.component';

@Component({
  selector: 'app-form-calculate-icr',
  templateUrl: './form-calculate-icr.component.html',
  styleUrls: ['./form-calculate-icr.component.scss']
})
export class FormCalculateIcrComponent implements OnInit, OnDestroy {
  forms: FormGroup;
  initialForm: any;
  msgs: Message[] = [];
  constructor(
      public dialog: DialogService,
      public config: DynamicDialogConfig,
      public ref: DynamicDialogRef,
      private fb: FormBuilder,
      private service: MasterService
  ) {
    this.forms = this.fb.group({
      ebit: ['', [Validators.required, this.decimalPositiveValidator]],
      payment: ['', [Validators.required, this.decimalPositiveValidator]],
    });
    this.initialForm = this.forms.value;
  }
  decimalPositiveValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (isNaN(value) || value === 0 || value < 0) {
      return { decimalPositive: true };
    }

    return null;
  }
  ngOnInit(): void {
  }
  simpan(){
    if (this.forms.valid){
      const overlay = this.dialog.open(PopupLoadingComponent, {
        data: {
          message: 'Calculate Data'
        }
      });
      const ebit = parseFloat(this.forms.value.ebit);
      const payment = parseFloat(this.forms.value.payment);
      const rate = ebit / payment;
      this.service.icrByRate({rate: rate}).subscribe((resp: any) => {
        overlay.close(resp);
        this.ref.close({...resp});
      }, (error: any) => {
        overlay.close(true);
        this.msgs = [];
        if (Array.isArray(error.error.error)) {
          for (let i = 0; i < error.error.error.length; i++) {
            this.msgs.push({severity: 'error', summary: 'error', detail: error.error.error[i]});
          }
        } else {
          this.msgs.push({severity: 'error', summary: 'error', detail: error.error});
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
