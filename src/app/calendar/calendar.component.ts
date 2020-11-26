import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';

import { ItemGrid } from './models';
import { CalendarService } from './services';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnDestroy {

  public sideBarOpened: boolean;

  private calendarSub: Subscription;

  constructor(public service: CalendarService) { }

  ngOnInit(): void {
    this.initializeDates();
    this.calendarSub = this.service.eventcalendarChanged.subscribe((item: ItemGrid) => {
      if (item) {
        this.sideBarOpened = true;
      } else {
        this.sideBarOpened = false;
      }
    });
  }

  // initialize date variables
  private initializeDates(): void {
    const date = new Date();
    const month = date.getMonth();
    const year = date.getFullYear();

    const monthDays = this.service.getDaysInMonth(month, year);
    const weekDay = this.service.weekDays[date.getDay()];

    const firstDate = new Date(year, month, 1);
    const lastDate = new Date(year, month + 1, 0);

    const weekFirstDay = this.service.weekDays[firstDate.getDay()];
    const weekLastDay = this.service.weekDays[lastDate.getDay()];

    this.service.currentYear = year;
    this.service.currentMonth = month;
    this.service.currentDay = date.getDate();

    this.createStructure(this.service.weekDays.length, weekFirstDay.id);
    this.fillMonthDays(weekFirstDay.id, monthDays);
  }

  // create 42 or 35 grid squares for the calendar
  private createStructure(weekDays: number, weekFirstDay: number): void {
    let limit: number;
    if (weekFirstDay === 6 || weekFirstDay === 7) {
      limit = 42;
    } else {
      limit = 35;
    }

    for (let i = 0; i < limit; i ++) {
      this.service.grid.push({
        id: i,
        week: Math.floor(i / weekDays),
        weekDay: i % weekDays,
        monthDay: 0,
        events: []
      });
    }
  }

  private fillMonthDays(weekFirstDay: number, monthDays: number): void {
    let countBegan: boolean;
    let dayCount = weekFirstDay;
    for (const item of this.service.grid) {
      if (dayCount === weekFirstDay) {
        countBegan = true;
      }
      if (countBegan) {
        item.monthDay = dayCount + 1;
        item.events = [{
          title: 'Interview',
          color: 'lightblue',
          description: 'Interview description.',
          hour: '09:30',
          monthDay: item.monthDay,
          id: 20201126010000
        }, {
          title: 'Second Interview',
          color: 'coral',
          description: '',
          hour: '02:30',
          monthDay: item.monthDay,
          id: 20201126011000
        },
      ];
        dayCount ++;
      }
      if (dayCount > monthDays) {
        break;
      }
    }
  }

  public closeSideBar(): void {
    this.service.calendar$.next(false);
    this.service.selectedDay = undefined;
    this.sideBarOpened = false;
  }

  ngOnDestroy(): void {
    this.calendarSub.unsubscribe();
  }
}
