import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';

import { ItemGrid } from '../models';

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
}
