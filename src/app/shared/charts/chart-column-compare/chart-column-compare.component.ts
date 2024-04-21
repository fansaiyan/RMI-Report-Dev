import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import Rupiah, { CurrencyIDR, RupiahSort } from 'src/app/core/helper/rupiah';
import * as Highcharts from 'highcharts';
import HC_customEvents from 'highcharts-custom-events';
HC_customEvents(Highcharts);

@Component({
  selector: 'app-chart-column-compare',
  templateUrl: './chart-column-compare.component.html',
  styleUrls: ['./chart-column-compare.component.scss']
})
export class ChartColumnCompareComponent implements OnInit, OnChanges {
  chart: typeof Highcharts = Highcharts;
  chartUpdate: boolean = false;
  @Input() data: any;

  chartOptions = {
    chart: {
      type: 'column'
    },
    title: {
        text: ''
    },
    subtitle: {
        text: ''
    },
    xAxis: {
        categories: [],
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: ''
        },
        labels: {
          formatter: function () {
              let rupiahSort = new RupiahSort();
              return `${rupiahSort.formatCount(this.value, true)}`;
          }
      }
    },
    tooltip: {
        formatter: function () {
            let rupiah = new CurrencyIDR();
            return `
            <b>${this.key}</b>
            <br>${this.series.name} : 
            <b>${rupiah.format(this.y)}</b>
            `;
        }
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [
      {
        name: 'ANGGARAN',
        data: []
      },
      {
        name: 'REALISASI',
        data: []
      }
    ],
    credits: {
      enabled: false
    }
  };
  constructor() {
  }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.data = changes.data ? changes.data.currentValue : {};
    this.updateChart();
  }
  updateChart(){
    if(this.data){
        this.chartOptions.title.text = this.data.title ? this.data.title : 'Title Not Set';
        this.chartOptions.yAxis.title.text = this.data.ytitle ? this.data.ytitle : 'Title Not Set';
        this.chartOptions.xAxis.categories = this.data.categories;
        this.chartOptions.series = this.data.series;
        this.chartUpdate = true;
    }
  }
}