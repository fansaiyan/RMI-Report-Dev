import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MessageService} from "primeng/api";
import {MasterService} from "../../../core/services/master.service";

@Component({
  selector: 'app-komposit-resiko',
  templateUrl: './komposit-resiko.component.html',
  styleUrls: ['./komposit-resiko.component.scss']
})
export class KompositResikoComponent implements OnInit, OnDestroy {
  loading: boolean;
  listdata: any[] = [];
  msgs: any[] = [];
  @ViewChild('dt', {static: false}) dt: any;
  constructor(
      private messageService: MessageService,
      private service: MasterService
  ) {
  }

  ngOnInit(): void {
    this.gets();
  }
  gets(){
    if (this.loading) { this.loading = true; }
    this.listdata = [];
    this.service.kompositResiko().subscribe(resp => {
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
        detail: error.error,
      });
    });
  }
  ngOnDestroy(): void {
  }
}
