import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_customEvents from 'highcharts-custom-events';
HC_customEvents(Highcharts);

@Component({
  selector: 'app-chart-column1',
  templateUrl: './chart-column1.component.html',
  styleUrls: ['./chart-column1.component.scss']
})
export class ChartColumn1Component implements OnInit, OnChanges {
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
    plotOptions: {
        column: {
            colorByPoint: true
        }
    },
    colors: [
        '#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9', 
        '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1'
    ],
    xAxis: {
        type: 'category',
        labels: {
            rotation: -45,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: ''
        }
    },
    legend: {
        enabled: false
    },
    tooltip: {
        formatter: function () {
            return `
            <b>${this.point.name}</b>
            <br>${this.series.name} : 
            <b>${this.y}</b>
            `;
        }
    },
    series: [{
        name: '',
        data: [],
        dataLabels: {
            enabled: true,
            rotation: -90,
            color: '#FFFFFF',
            align: 'right',
            format: '{point.y}', // one decimal
            y: 10, // 10 pixels down from the top
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    }],
    credits: {
        enabled: false
    },
  };
  constructor() { }

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
        this.chartOptions.series[0].name = this.data.name;
        this.chartOptions.series[0].data = this.data.series;
    }
    this.chartUpdate = true;
  }
}

