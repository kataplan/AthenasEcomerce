import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  autoTicks = false;
  disabled = false;
  max = 100000;
  min = 0;
  showTicks = false;
  step = 500;
  minValue = 0;
  maxValue = 100000;
    tickInterval = 1;
  getSliderTickInterval(): number | 'auto' {
    if (this.showTicks) {
      return this.autoTicks ? 'auto' : this.tickInterval;
    }

    return 0;
  }
  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }
  moneyFormating(num:number){
    return Intl.NumberFormat('de-DE').format(num);
 }
  constructor() { }

  ngOnInit(): void {
  }

}
