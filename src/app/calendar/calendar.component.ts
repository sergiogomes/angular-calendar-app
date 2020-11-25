import { Component, OnInit } from '@angular/core';
import { isBreakOrContinueStatement } from 'typescript';

import { CalendarService } from './calendar.service';
import { ItemGrid } from './models';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  public weekDays = [
    { id: 0, letter: 'S', threeWord: 'Sun', day: 'Sunday' },
    { id: 1, letter: 'M', threeWord: 'Mon', day: 'Monday' },
    { id: 2, letter: 'T', threeWord: 'Tue', day: 'Tuesday' },
    { id: 3, letter: 'W', threeWord: 'Wed', day: 'Wednesday' },
    { id: 4, letter: 'T', threeWord: 'Thu', day: 'Thursday' },
    { id: 5, letter: 'F', threeWord: 'Fri', day: 'Friday' },
    { id: 6, letter: 'S', threeWord: 'Sat', day: 'Saturday' }
  ];
  public months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  public currentYear: number;
  public currentMonth: number;
  public currentDay: number;
  public currentHour: number;

  public grid: ItemGrid[] = [];

  constructor(private service: CalendarService) { }

  ngOnInit(): void {
    this.initializeDates();
  }

  // initialize date variables
  private initializeDates(): void {
    const date = new Date();
    const month = date.getMonth();
    const year = date.getFullYear();

    const monthDays = this.service.getDaysInMonth(month, year);
    const weekDay = this.weekDays[date.getDay()];

    const firstDate = new Date(year, month, 1);
    const lastDate = new Date(year, month + 1, 0);

    const weekFirstDay = this.weekDays[firstDate.getDay()];
    const weekLastDay = this.weekDays[lastDate.getDay()];

    this.currentYear = year;
    this.currentMonth = month;

    this.createStructure(this.weekDays.length, weekFirstDay.id);
    this.fillMonthDays(weekFirstDay.id, monthDays);
  }

  // create 42 grid squares for the calendar
  private createStructure(weekDays: number, weekFirstDay: number): void {
    let limit: number;
    if (weekFirstDay === 6 || weekFirstDay === 7) {
      limit = 42;
    } else {
      limit = 35;
    }

    for (let i = 0; i < limit; i ++) {
      this.grid.push({
        id: i,
        week: Math.floor(i / weekDays),
        weekDay: i % weekDays,
        monthDay: 0
      });
    }
  }

  private fillMonthDays(weekFirstDay: number, monthDays: number): void {
    let countBegan: boolean;
    let dayCount = weekFirstDay;
    for (const item of this.grid) {
      if (dayCount === weekFirstDay) {
        countBegan = true;
      }
      if (countBegan) {
        item.monthDay = dayCount + 1;
        dayCount ++;
      }
      if (dayCount > monthDays) {
        break;
      }
    }
  }
}
