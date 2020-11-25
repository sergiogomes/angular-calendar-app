import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  public days: any;

  constructor() { }

  public getDaysInMonth(month: number, year: number) {
    return new Date(year, month+1, 0).getDate();
  }
}
