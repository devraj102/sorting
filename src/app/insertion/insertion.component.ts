import { GraphData } from "../data/GraphData";
import { ChartColors } from "./../data/ChartColors";
import { Component, OnInit } from "@angular/core";
import { MatSliderChange } from "@angular/material/slider";
import { range  } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { take, tap } from 'rxjs/operators';

@Component({
  selector: "app-insertion",
  templateUrl: "./insertion.component.html",
  styleUrls: ["./insertion.component.css"]
})
export class InsertionComponent implements OnInit {
  // Class for Getting Color and Grap x and y axis data
  chartColors = new ChartColors();
  graphData = new GraphData();
  data = this.graphData.graphData;

  // Slider Property
  autoTicks = false;
  disabled = false;
  invert = false;
  max = 200;
  min = 10;
  showTicks = false;
  step = 20;
  thumbLabel = false;
  value = 200;
  vertical = false;
  // --------END
  // Sorting Speed
  sortingTimer: number = this.value;
  // DataLength
  chartLength: number = this.value;
  // Graph Property
  single: any[] = this.data;
  multi: any[];
  view: any[] = [980, 400];
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = '';
  yAxisLabel = '';
  showYAxisLabel = true;
  colorScheme = {
    domain: this.chartColors.colors
  };
  constructor() {
    Object.assign(this, this.single.slice(0, this.chartLength));
  }
  ngOnInit() {}
  handleClick(event: Event) {
    this.load();
  }
  resetClick(event: Event) {
    location.reload();
  }
  onSelect(event: Event) {
    console.log(event);
  }
  onTimeSliderChange(event: MatSliderChange) {
    this.sortingTimer = event.value;
    this.load();
  }
  onDataSliderChange(event: MatSliderChange) {
    this.chartLength = event.value;
    this.load();
  }
  timer(ms) {
    return new Promise(res => setTimeout(res, ms));
  }
  async load() {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.chartLength; i++) {
      for (let j = 0; j < this.chartLength - 1; j++) {
        if (this.single[j].value > this.single[j + 1].value) {
          const temp = this.single[j].value;
          this.single[j].value = this.single[j + 1].value;
          this.single[j + 1].value = temp;
          const name = this.single[j].name;
          this.single[j].name = this.single[j + 1].name;
          this.single[j + 1].name = name;
          this.single = [...this.single];
          await this.timer(500);
        }
      }
    }
  }
}
