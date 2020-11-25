import { Component } from '@angular/core';

import { CalendarService } from '../../services';
import { ItemGrid } from '../../models';
import { stringify } from 'querystring';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent {

  constructor(public service: CalendarService) { }

  public selectDay(day: ItemGrid): void {
    this.service.selectedDay = day.monthDay;
    this.service.calendar$.next(day);
  }

  public getClass(day: ItemGrid): string {
    return day.monthDay === this.service.selectedDay ? 'selected-day' : '';
  }

}
