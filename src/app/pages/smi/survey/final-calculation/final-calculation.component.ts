import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DialogService} from 'primeng/dynamicdialog';
import {MessageService} from 'primeng/api';
import {SMIService} from 'src/app/core/services/smi.service';

@Component({
  selector: 'app-final-calculation',
  templateUrl: './final-calculation.component.html',
  styleUrls: ['./final-calculation.component.scss']
})
export class FinalCalculationComponent implements OnInit, OnChanges {
  @Input() survey: null = null;
  @Input() email = null;
  @Input() smi_survey_code: any | null = null;
  loading = false;
  listdata = [];
  msgs: any[] = [];
  constructor(
      public dialog: DialogService,
      private messageService: MessageService,
      private smiService: SMIService
  ) {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.survey && this.email && this.smi_survey_code){
      this.gets();
    }
  }
  ngOnInit(): void {
  }
  gets(){
    const params = {
      'email': this.email,
      'survey_code': this.smi_survey_code
    };
    if (this.loading) { this.loading = true; }
    this.listdata = [];
    this.smiService.get_final_calculation(params).subscribe(resp => {
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
        detail: error.message,
      });
    });
  }
}
