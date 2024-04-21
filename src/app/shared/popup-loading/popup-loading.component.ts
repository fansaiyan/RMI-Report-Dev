import { Component, OnDestroy, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-popup-loading',
  templateUrl: './popup-loading.component.html',
  styleUrls: ['./popup-loading.component.scss']
})
export class PopupLoadingComponent implements OnInit, OnDestroy {
  data: any;
  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) {
    if(!this.config.closable) this.config.closable = false;
  }
  ngOnInit(): void {
    this.data = this.config.data;
  }
  ngOnDestroy(): void {
    this.ref.close(true);
  }
}
