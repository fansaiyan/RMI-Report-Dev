import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_customEvents from 'highcharts-custom-events';
HC_customEvents(Highcharts);

@Component({
  selector: 'app-chart-pie-non-rupiah',
  templateUrl: './chart-pie-non-rupiah.component.html',
  styleUrls: ['./chart-pie-non-rupiah.component.scss']
})
export class ChartPieNonRupiahComponent implements OnInit, OnChanges {
  @Input() title: string = '';
  @Input() data: any;
  @Input() disposisiLegend: boolean; //if true, posisi legeng di kanan, else bawah
  chart: typeof Highcharts = Highcharts;
  chartUpdate: boolean = false;
  chartOptions = {   
      chart : {
         plotBorderWidth: null,
         plotShadow: false
      },
      legend: {},
      title : {
         text: ``   
      },
      tooltip : {
         formatter: function() {
            return '<b>'+ this.point.name +'</b>: '+ this.point.y;
         }
      },
      plotOptions : {
         pie: {
            center: [],
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
               enabled: false,
               formatter: function() {
                  return '<b>'+ this.point.name +'</b>: '+ this.point.y ;
               },
               style: {
               }
            },
            showInLegend: true
         }
      },
      series : [],
      credits: {
        enabled: false
      }
   };
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    this.title = changes.title ? changes.title.currentValue : this.title;
    this.data = changes.data ? changes.data.currentValue : [];
    if(changes.disposisiLegend){
       if(changes.disposisiLegend.currentValue){
         this.chartOptions.plotOptions.pie.center = [350, 200]; //set posisi chart
         this.chartOptions.legend =  { //set posisi legend
            align: 'right',
            verticalAlign: 'top',
            x: 220,
            y: 60,
            floating: true
         }
       } else {
         this.chartOptions.legend = {};
       }
       
    }
    this.updateChart(this.title, this.data);
  }
  ngOnInit() {
  }
  updateChart(title: string, data: any){
    this.chartOptions.title.text = title;
    this.chartOptions.series = [{ type: 'pie' , name: 'Nilai', data: data}];
    this.chartUpdate = true;
  }
}
