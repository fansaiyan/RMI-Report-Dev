import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MasterService } from 'src/app/core/services/master.service';
import { PopupLoadingComponent } from 'src/app/shared/popup-loading/popup-loading.component';

@Component({
  selector: 'app-form-calculate-icr',
  templateUrl: './form-calculate-icr.component.html',
  styleUrls: ['./form-calculate-icr.component.scss']
})
export class FormCalculateIcrComponent implements OnInit, OnDestroy {
  forms: FormGroup;
  initialForm: any;
  msgs: Message[] = [];
  resultICR: any | null = null;
  resultZScore: any | null = null;
  result: any | null = null;

  companyTypes = [
    { label: 'Manufaktur Go Public', value: 1 },
    { label: 'Manufaktur Private', value: 2 },
    { label: 'Jasa', value: 3 },
  ];

  constructor(
    public dialog: DialogService,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private fb: FormBuilder,
    private service: MasterService
  ) {
    this.forms = this.fb.group({
      ebit: ['', [this.decimalPositiveValidator]],
      payment: ['', [this.decimalPositiveValidator]],
      company_type: [null],
      wc: ['', [this.decimalPositiveValidator]],
      re: ['', [this.decimalPositiveValidator]],
      z_ebit: ['', [this.decimalPositiveValidator]],
      mve: ['', [this.decimalPositiveValidator]],
      bve: ['', [this.decimalPositiveValidator]],
      ts: ['', [this.decimalPositiveValidator]],
      ta: ['', [this.decimalPositiveValidator]],
      tl: ['', [this.decimalPositiveValidator]],
    });
    this.initialForm = this.forms.value;
  }

  decimalPositiveValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value === null || value === '') return null;
    if (isNaN(value) || value < 0) {
      return { decimalPositive: true };
    }
    return null;
  }

  ngOnInit(): void {
    if(this.config.data?.lastInput){
      this.forms.patchValue(this.config.data?.lastInput);
    }
  }

  isAnyFormValid() {
    // Tombol aktif kalau ICR valid ATAU Z-Score valid minimal field
    const icrValid = this.forms.get('ebit')?.valid && this.forms.get('payment')?.valid;
    const zScoreValid = this.forms.get('company_type')?.value && this.forms.get('ta')?.valid && this.forms.get('tl')?.valid;
    return icrValid || zScoreValid;
  }

  calculate() {
    if (!this.isAnyFormValid()) {
      return;
    }
    this.result = null;

    const overlay = this.dialog.open(PopupLoadingComponent, { data: { message: 'Calculating...' } });

    const ebit = parseFloat(this.forms.value.ebit);
    const payment = parseFloat(this.forms.value.payment);
    const rate = ebit && payment ? ebit / payment : null;

    const zScorePayload = this.forms.value.company_type ? {
      company_type: this.forms.value.company_type,
      wc: parseFloat(this.forms.value.wc) || 0,
      re: parseFloat(this.forms.value.re) || 0,
      ebit: parseFloat(this.forms.value.z_ebit) || 0,
      mve: parseFloat(this.forms.value.mve) || 0,
      bve: parseFloat(this.forms.value.bve) || 0,
      ts: parseFloat(this.forms.value.ts) || 0,
      ta: parseFloat(this.forms.value.ta) || 0,
      tl: parseFloat(this.forms.value.tl) || 0,
    } : null;

    const payload = {
      'z-score': zScorePayload,
      'icr': rate ? { rate: rate } : null,
    };

    this.service.postCalculateFinalRating(payload).subscribe(
      (resp: any) => {
        overlay.close();
        if(resp?.status == 500){
          this.msgs = [];
          this.msgs.push({ severity: 'error', summary: 'Error', detail: resp?.message });
          return;
        }
        this.resultICR = resp?.data?.result_icr || null;
        this.resultZScore = resp?.data?.result_z_score || null;
        this.result = resp?.data?.final_result;
      },
      (error: any) => {
        overlay.close();
        this.msgs = [];
        this.msgs.push({ severity: 'error', summary: 'Error', detail: error.error });
      }
    );
  }

  ok() {
    this.ref.close({lastInput: this.forms.value, ...this.result});
    this.ngOnDestroy();
  }

  batal() {
    this.ngOnDestroy();
    this.ref.close();
  }

  ngOnDestroy(): void {
    this.forms.reset(this.initialForm);
  }
}
