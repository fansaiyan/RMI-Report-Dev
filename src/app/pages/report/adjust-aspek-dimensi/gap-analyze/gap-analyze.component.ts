import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {Table} from 'primeng/table';
import {DialogService} from 'primeng/dynamicdialog';
import {ReportService} from 'src/app/core/services/report.service';
import {MessageService} from 'primeng/api';
import {HelpersService} from 'src/app/core/services/helpers.service';

@Component({
  selector: 'app-gap-analyze',
  templateUrl: './gap-analyze.component.html',
  styleUrls: ['./gap-analyze.component.scss']
})
export class GapAnalyzeComponent implements OnInit, OnDestroy {
  surveySelected = null;
  surveyidsub: Subscription;
  @ViewChild('dt', {static: false}) table: Table;
  @ViewChild('dt', {static: false}) dt: HTMLTableElement;
  constructor(
      private helper: HelpersService
  ) {
    this.surveyidsub = this.helper._surveySelected.subscribe(r => {
      this.surveySelected = r;
    });
  }
  ngOnInit(): void {
  }
  ngOnDestroy(): void {
  }
}
