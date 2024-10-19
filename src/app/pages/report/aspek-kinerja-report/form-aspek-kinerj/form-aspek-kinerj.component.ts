import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Message, MessageService} from 'primeng/api';
import {LookupSurveyComponent} from 'src/app/shared/component/lookup-survey/lookup-survey.component';
import {DialogService} from 'primeng/dynamicdialog';
import {MasterService} from 'src/app/core/services/master.service';
import {AuthenticationService} from 'src/app/core/services/auth.service';
import {
  FormCalculateIcrComponent
} from 'src/app/pages/report/aspek-kinerja-report/form-calculate-icr/form-calculate-icr.component';

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
  id = "";
  constructor(
      private route: Router,
      private fb: FormBuilder,
      public dialog: DialogService,
      private service: MasterService,
      private messageService: MessageService,
      private auth: AuthenticationService,
      private activatedRoute: ActivatedRoute

  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.forms = this.fb.group({
      id: this.id ? +this.id : 0,
      uid: this.auth.getTokenInfo()["uid"],
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
    this.getKinerja();
  }


  ngOnInit(): void {
  }
  getKinerja(){
    if (this.id){
      this.service.aspekKinerjaById(+this.id).subscribe(resp => {
        if(resp.data.length > 0){
          let data = resp.data[0];
          this.forms.patchValue({
            id: data['id'],
            uid: data['create_uid'],
            name: data['name'],
            survey_ids: data['survey_ids'],
            aspect_value: data['aspect_values'],
            aspect_conversion_value: data['aspect_conversion_value'],
            final_rating_weight: data['final_rating_weight'],
            conversion_rating_value: data['conversion_rating_value'],
            composite_risk_levels: data['composite_risk_levels'],
            composite_risk_conversion_value: data['composite_risk_conversion_value'],
            composite_risk_weight: data['composite_risk_weight'],
            conversion_risk_value: data['conversion_risk_value'],
            total_rating_value: data['total_rating_value'],
            score_adjustment: data['score_adjustment']
          });
          this.getSurvey(this.forms.value.survey_ids);
          this.getFinalRating();
          this.getKompositRisiko();
        }
      });
    } else {
      this.getFinalRating();
      this.getKompositRisiko();
    }
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
  calculateIcr(){
    const ref = this.dialog.open(FormCalculateIcrComponent, {
      width: '900px',
      header: 'Calculate Interest Coverage Ratio',
      data: {}
    });
    ref.onClose.subscribe((resp: any) => {
      if (resp){
        if(resp.data?.length > 0){
          this.finalRatingSelected = this.finalRatings.find(f => f.name == resp.data[0].name);
          this.onChangeFinalRating({id: this.finalRatingSelected.id, nilai: this.finalRatingSelected.nilai});
        } else {
          this.finalRatingSelected = null;
          this.messageService.add({
            key: 'toast-notif',
            severity: 'warn',
            summary: 'Warnning',
            detail: 'Nilai Tidak Ditemukan',
          });
        }
      }
    });
  }
  getSurvey(survey_id: number){
    this.service.surveyByid(survey_id).subscribe(resp => {
      if(resp.data.length > 0){
        this.surveySelected = resp.data[0];
        this.survey_name = this.surveySelected.name;
        this.forms.patchValue({
          survey_ids: this.surveySelected.id
        });
      }
    })
  }
  getFinalRating(){
    this.service.finalRating().subscribe(resp => {
      if(resp.data.length > 0){
        this.finalRatings = resp.data;
        if(this.id){
          this.finalRatingSelected = this.finalRatings.find((f => f.id == this.forms.value.aspect_value));
          this.onChangeFinalRating({id: this.finalRatingSelected.id, nilai: this.finalRatingSelected.nilai});
        }
      } else {
        this.finalRatings = [];
      }
    })
  }
  getKompositRisiko(){
    this.service.kompositResiko().subscribe(resp => {
      if(resp.data.length > 0){
        this.kompositRisikos = resp.data;
        if(this.id){
          this.kompositRisikoSelected = this.kompositRisikos.find((f => f.id == this.forms.value.composite_risk_levels));
          this.onChangeKompositRisiko({id: this.kompositRisikoSelected.id, nilai: this.kompositRisikoSelected.nilai});
        }
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
    if(this.forms.get('aspect_conversion_value').valid && this.forms.get('final_rating_weight').valid){
      this.forms.patchValue({
        conversion_rating_value: (this.forms.value.aspect_conversion_value * +this.forms.value.final_rating_weight) / 100
      });
    } else {
      this.forms.patchValue({
        conversion_rating_value: 0
      });
    }
    if(this.forms.get('composite_risk_conversion_value').valid && this.forms.get('composite_risk_weight').valid){
      this.forms.patchValue({
        conversion_risk_value: (this.forms.value.composite_risk_conversion_value * +this.forms.value.composite_risk_weight) / 100
      });
    } else {
      this.forms.patchValue({
        conversion_risk_value: 0
      });
    }

    let score_adjustment = 0;
    let total_rating_value = this.forms.value.conversion_rating_value + this.forms.value.conversion_risk_value;
    if (total_rating_value <= 50) {
      score_adjustment = -1.00;
    } else if (total_rating_value <= 65) {
      score_adjustment = -0.75;
    } else if (total_rating_value <= 80) {
      score_adjustment = -0.50;
    } else if (total_rating_value <= 90) {
      score_adjustment = -0.25;
    } else {
      score_adjustment = 0.00;
    }
    this.forms.patchValue({
      total_rating_value: total_rating_value,
      score_adjustment: score_adjustment
    });
    if(isNaN(this.forms.value.conversion_rating_value) || isNaN(this.forms.value.conversion_risk_value)){
      this.calculate();
    }
  }
  back(){
    this.route.navigate(['report/aspek-kinerja']);
  }
  simpan(){
    if(this.forms.valid){
      this.service.postAspekKinerja(this.forms.value).subscribe((resp) => {
        if(resp.status == 200){
          this.messageService.add({
            key: 'toast-notif',
            severity: 'success',
            summary: 'Berhasil',
            detail: 'Data Berhasil Input'
          });
          this.route.navigate(['report/aspek-kinerja']);
        }
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
