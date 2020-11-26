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
  public showInfo: boolean;
  public showForm: boolean;

  private calendarSub: Subscription;

  constructor(public service: CalendarService) {
    this.calendarSub = this.service.eventcalendarChanged.subscribe((item: ItemGrid) => {
      if (item) {
        this.info = item;
        this.showInfo = true;
      } else {
        this.showInfo = false;
        this.info = new ItemGrid();
      }
    });
  }

  ngOnInit(): void {
  }
  
  public addInfo(): void {
    this.showForm = true;
  }

  ngOnDestroy(): void {
    this.calendarSub.unsubscribe();
  }

}
