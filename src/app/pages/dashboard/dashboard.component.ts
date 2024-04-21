import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  datapengusul: any;
  dataChart1: any[] = [];
  dataChart2: any[] = [];
  dataChart3: any;
  listGrid1: any[] = [];
  loadingGrid1: boolean;
  listGrid2: any[] = [];
  loadingGrid2: boolean;
  params: any = {};
  constructor(
  ) { }

  ngOnInit(): void {
    this.gets();
  }
  gets(){
  }
}
