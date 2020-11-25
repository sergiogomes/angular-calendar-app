import { Component, OnInit } from '@angular/core';

import { CalendarService } from './calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  public days = [
    { id: 0, letter: 'S', threeWord: 'Sun', day: 'Sunday' },
    { id: 1, letter: 'M', threeWord: 'Mon', day: 'Monday' },
    { id: 2, letter: 'T', threeWord: 'Tue', day: 'Tuesday' },
    { id: 3, letter: 'W', threeWord: 'Wed', day: 'Wednesday' },
    { id: 4, letter: 'T', threeWord: 'Thu', day: 'Thursday' },
    { id: 5, letter: 'F', threeWord: 'Fri', day: 'Friday' },
    { id: 6, letter: 'S', threeWord: 'Sat', day: 'Saturday' }
  ];
  public grid = [];

  constructor(private service: CalendarService) { }

  ngOnInit(): void {
    const date = new Date();
    const month = date.getMonth();
    const year = date.getFullYear();

    const monthDays = this.service.getDaysInMonth(month, year);
    const weekDay = this.days[date.getDay()];

    const firstDate = new Date(year, month, 1);
    const lastDate = new Date(year, month + 1, 0);

    const weekFirstDay = this.days[firstDate.getDay()];
    const weekLastDay = this.days[lastDate.getDay()];

    for (let i = 0; i < 42; i ++) {
      this.grid.push({id: i});
    }
  }
}
