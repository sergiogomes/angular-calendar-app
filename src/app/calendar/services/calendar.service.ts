import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';

import { Info, ItemGrid } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  public selectedDay: number;
  public currentYear: number;
  public currentMonth: number;
  public currentDay: number;
  public currentHour: number;

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
  public grid: ItemGrid[] = [];
  public days: any;

  public calendar$: Subject<ItemGrid> = new Subject<ItemGrid>();
  get eventcalendarChanged(): Observable<any> {
    return this.calendar$.asObservable();
  }

  constructor() { }

  public getDaysInMonth(month: number, year: number): number {
    return new Date(year, month + 1, 0).getDate();
  }

  public getIdByDate(date: Date): number {
    let id: string;

    id = String(date.getFullYear())
        + this.lpad(String(date.getMonth() + 1), 2, '0')
        + this.lpad(String(date.getDate()), 2, '0')
        + this.lpad(String(date.getHours()), 2, '0')
        + this.lpad(String(date.getMinutes()), 2, '0')
        + this.lpad(String(date.getSeconds()), 2, '0');

    return Number(id);
  }

  private lpad(text: string, size: number, compl: string): string {
    const arr = text.split('');
    while (arr.length < size) {
      arr.unshift(compl);
    }
    return arr.join('');
  }

  public createEvent(infoEvent: Info): void {
    const gridIndex = this.grid.findIndex((grid) => grid.monthDay === infoEvent.monthDay);
    if (gridIndex > -1) {
      this.grid[gridIndex].events.push(infoEvent);
    }
  }
}
