import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Message, MessageService} from 'primeng/api';
import {LookupSurveyComponent} from 'src/app/shared/component/lookup-survey/lookup-survey.component';
import {DialogService} from 'primeng/dynamicdialog';
import {MasterService} from 'src/app/core/services/master.service';

@Component({
  selector: 'app-form-aspek-kinerj',
  templateUrl: './form-aspek-kinerj.component.html',
  styleUrls: ['./form-aspek-kinerj.component.scss']
})
export class FormAspekKinerjComponent implements OnInit, OnDestroy {
  forms: FormGroup;
  msgs: Message[] = [];
  survey_name = '';
  surveySelected: any = null;
  finalRatings = [];
  finalRatingSelected: any;
  kompositRisikos = [];
  kompositRisikoSelected: any;
  constructor(
      private route: Router,
      private fb: FormBuilder,
      public dialog: DialogService,
      private service: MasterService,
      private messageService: MessageService,
  ) {
    this.forms = this.fb.group({
      name: '',
      survey_ids: [0, [Validators.required, Validators.min(1)]],
      aspect_value: [0, [Validators.required, Validators.min(1)]],
      aspect_conversion_value: 0,
      final_rating_weight: [0, [Validators.required, Validators.min(1)]],
      conversion_rating_value: 0,
      composite_risk_levels: [0, [Validators.required, Validators.min(1)]],
      composite_risk_conversion_value: 0,
      composite_risk_weight: [0, [Validators.required, Validators.min(1)]],
      conversion_risk_value: 0,
      total_rating_value: 0,
      score_adjustment: 0
    });
  }


  ngOnInit(): void {
    this.getFinalRating();
    this.getKompositRisiko();
  }
  findSurvey(){
    const ref = this.dialog.open(LookupSurveyComponent, {
      width: '900px',
      header: 'Pilih Survey',
      data: {}
    });
    ref.onClose.subscribe((resp: any) => {
      if (resp){
        this.surveySelected = resp;
        this.survey_name = this.surveySelected.name;
        this.forms.patchValue({
          survey_ids: this.surveySelected.id
        });
      } else {
        this.surveySelected = null;
        this.survey_name = '';
        this.forms.patchValue({
          survey_ids: 0
        });
      }
    });
  }
  getFinalRating(){
    this.service.finalRating().subscribe(resp => {
      if(resp.data.length > 0){
        this.finalRatings = resp.data;
      } else {
        this.finalRatings = [];
      }
    })
  }
  getKompositRisiko(){
    this.service.kompositResiko().subscribe(resp => {
      if(resp.data.length > 0){
        this.kompositRisikos = resp.data;
      } else {
        this.kompositRisikos = [];
      }
    })
  }
  onChangeFinalRating(e: any){
    this.forms.patchValue({
      aspect_value: e.id,
      aspect_conversion_value: e.nilai
    });
    this.calculate();
  }
  onChangeKompositRisiko(e: any){
    this.forms.patchValue({
      composite_risk_levels: e.id,
      composite_risk_conversion_value: e.nilai
    });
    this.calculate();
  }
  calculate(){
    if(this.forms.get('final_rating_weight').valid){
      this.forms.patchValue({
        conversion_rating_value: (this.forms.value.aspect_conversion_value * +this.forms.value.final_rating_weight) / 100
      });
    } else {
      this.forms.patchValue({
        conversion_rating_value: 0
      });
    }
    if(this.forms.get('composite_risk_weight').valid){
      this.forms.patchValue({
        conversion_risk_value: (this.forms.value.composite_risk_conversion_value * +this.forms.value.composite_risk_weight) / 100
      });
    } else {
      this.forms.patchValue({
        conversion_risk_value: 0
      });
    }

    let score_adjustment = 0;
    let total_rating_value = this.forms.value.conversion_rating_value + this.forms.value.conversion_risk_value
    if (0 < this.forms.value.total_rating_value && this.forms.value.total_rating_value <= 50) {
      score_adjustment = -1.00;
    } else if (50 < this.forms.value.total_rating_value && this.forms.value.total_rating_value <= 65) {
      score_adjustment = -0.75;
    } else if (65 < this.forms.value.total_rating_value && this.forms.value.total_rating_value <= 80) {
      score_adjustment = -0.50;
    } else if (80 < this.forms.value.total_rating_value && this.forms.value.total_rating_value <= 90) {
      score_adjustment = -0.25;
    } else {
      score_adjustment = 0.00;
    }
    this.forms.patchValue({
      total_rating_value: total_rating_value,
      score_adjustment: score_adjustment
    });
  }
  back(){
    this.route.navigate(['report/aspek-kinerja']);
  }
  simpan(){
    if(this.forms.valid){
      this.service.postAspekKinerja(this.forms.value).subscribe((resp) => {
        console.log(resp);
      },(error: any) => {
        this.messageService.add({
          key: 'toast-notif',
          severity: 'error',
          summary: 'Error',
          detail: error.error,
        });
      });
    }
  }
  ngOnDestroy(): void {

  }

}
