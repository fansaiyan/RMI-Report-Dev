import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Message } from 'primeng/api';
import { MasterService } from 'src/app/core/services/master.service';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PopupLoadingComponent } from 'src/app/shared/popup-loading/popup-loading.component';

@Component({
  selector: 'app-form-calculate-komposit-risiko',
  templateUrl: './form-calculate-komposit-risiko.component.html',
  styleUrls: ['./form-calculate-komposit-risiko.component.scss']
})
export class FormCalculateKompositRisikoComponent implements OnInit, OnDestroy {
  forms: FormGroup;
  initialForm: any;
  msgs: Message[] = [];
  result: any | null = null;
  resultQualityMrLabels = {
    achievement_exposure: 'Pencapaian Eksposure Risiko',
    achievement_treatment: 'Pencapaian Perlakuan Risiko',
    absorption_cost: 'Penyerapan Biaya Perlakuan Risiko',
    process_accuracy: 'Ketepatan Proses Risiko',
    total_quality_mr: 'Total Kualitas Penerapan MR',
    quality_mr_kinerja: 'Nilai Kualitas Penerapan MR'
  };

  resultPerformanceLabels = {
    total_performance: 'Total Pencapaian Kinerja',
    performance_kinerja: 'Nilai Pencapaian Kinerja'
  };

  resultCompositeLabels = {
    nilai_kualitas_penerapan_mr: 'Nilai Kualitas Penerapan MR',
    nilai_pencapaian_kinerja: 'Nilai Pencapaian Kinerja',
    komposit_risiko: 'Komposit Risiko',
    peringkat_komposit_risiko: 'Peringkat Komposit Risiko',
    konversi_nilai: 'Konversi Nilai'
  };
  // Output key helpers
  qualityMrResultKeys = ['achievement_exposure', 'achievement_treatment', 'absorption_cost', 'process_accuracy', 'total_quality_mr', 'quality_mr_kinerja'];
  performanceResultKeys = ['total_performance', 'performance_kinerja'];
  compositeResultKeys = ['nilai_kualitas_penerapan_mr', 'nilai_pencapaian_kinerja', 'komposit_risiko', 'peringkat_komposit_risiko', 'konversi_nilai'];

  // Field structure
  qualityMrFields = [
    { name: 'actual_residual', label: 'Actual Eksposure Risiko Residual' },
    { name: 'target_residual', label: 'Target Eksposure Risiko Residual' },
    { name: 'actual_treatment', label: 'Actual Pelaksanaan Perlakuan Risiko' },
    { name: 'target_treatment', label: 'Target Perlakuan Risiko' },
    { name: 'realized_cost', label: 'Realisasi Biaya Perlakuan Risiko' },
    { name: 'budget_cost', label: 'Budget Biaya Perlakuan Risiko' },
    { name: 'process_accuracy', label: 'Ketepatan Proses Risiko' },
  ];

  performanceFields = [
    { name: 'performance_collegial', label: 'Capaian Kinerja Kolegial(%)' },
    { name: 'performance_finance', label: 'Capaian Kinerja Keuangan(%)' },
    { name: 'performance_operational', label: 'Capaian Kinerja Operasi/Produksi Utama(%)' },
    { name: 'weight_collegial', label: 'Bobot Kolegial(%)' },
    { name: 'weight_finance', label: 'Bobot Finance(%)' },
    { name: 'weight_operational', label: 'Bobot Operational(%)' },
  ];

  constructor(
    private fb: FormBuilder,
    private service: MasterService,
    public dialog: DialogService,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef
  ) {
    this.forms = this.fb.group({});
    this.qualityMrFields.forEach(f => {
      this.forms.addControl(f.name, this.fb.control('', [this.decimalPositiveValidator]));
    });
    this.performanceFields.forEach(f => {
      this.forms.addControl(f.name, this.fb.control('', [this.decimalPositiveValidator]));
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

  ngOnInit(): void {}

  calculate() {
    if (!this.forms.valid) {
      return;
    }

    this.result = null;
    const overlay = this.dialog.open(PopupLoadingComponent, { data: { message: 'Calculating...' } });

    const payload = {
      quality_mr: {
        actual_residual: parseFloat(this.forms.value.actual_residual) || 0,
        target_residual: parseFloat(this.forms.value.target_residual) || 0,
        actual_treatment: parseFloat(this.forms.value.actual_treatment) || 0,
        target_treatment: parseFloat(this.forms.value.target_treatment) || 0,
        realized_cost: parseFloat(this.forms.value.realized_cost) || 0,
        budget_cost: parseFloat(this.forms.value.budget_cost) || 0,
        process_accuracy: parseFloat(this.forms.value.process_accuracy) || 0,
      },
      performance: {
        performance_collegial: parseFloat(this.forms.value.performance_collegial) || 0,
        performance_finance: parseFloat(this.forms.value.performance_finance) || 0,
        performance_operational: parseFloat(this.forms.value.performance_operational) || 0,
        weight_collegial: parseFloat(this.forms.value.weight_collegial) || 0,
        weight_finance: parseFloat(this.forms.value.weight_finance) || 0,
        weight_operational: parseFloat(this.forms.value.weight_operational) || 0,
      }
    };

    this.service.postCalculateKompositRisiko(payload).subscribe(
      (resp: any) => {
        overlay.close();
        if (resp?.status == 500) {
          this.msgs = [];
          this.msgs.push({ severity: 'error', summary: 'Error', detail: resp?.message });
          return;
        }
        this.result = resp?.data || null;
      },
      (error: any) => {
        overlay.close();
        this.msgs = [];
        this.msgs.push({ severity: 'error', summary: 'Error', detail: error.error });
      }
    );
  }
  ok() {
    this.ngOnDestroy();
    this.ref.close(this.result);
  }
  batal() {
    this.ngOnDestroy();
    this.ref.close();
  }

  ngOnDestroy(): void {
    this.forms.reset(this.initialForm);
  }
}
