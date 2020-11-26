import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';

import { CalendarService } from '../../services';
import { ItemGrid } from '../../models';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit, OnDestroy {

  public info = new ItemGrid();

  private calendarSub: Subscription;

  constructor(public service: CalendarService) {
    this.calendarSub = this.service.eventcalendarChanged.subscribe((item: ItemGrid) => {
      if (item) {
        this.info = item;
      } else {
        this.info = new ItemGrid();
      }
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.calendarSub.unsubscribe();
  }

}
