import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';

import { CalendarService } from '../../services';
import { FormState, Info, ItemGrid } from '../../models';
import { handleTime, sortByTime } from '../../../core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit, OnDestroy {

  public info = new ItemGrid();
  public showInfo: boolean;
  public showForm: boolean;
  private state: FormState;

  public infoForm: FormGroup;
  public infoFbGroup = {
    title: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    time: new FormControl('', Validators.required),
    color: new FormControl(''),
    description: new FormControl(''),
    id: new FormControl(''),
    monthDay: new FormControl('')
  };

  private calendarSub: Subscription;

  constructor(
    public service: CalendarService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.infoForm = this.formBuilder.group(this.infoFbGroup);
    this.calendarSub = this.service.eventcalendarChanged.subscribe((item: ItemGrid) => {
      if (item) {
        this.info = item;
        this.showInfo = true;
      } else {
        this.showInfo = false;
        this.showForm = false;
        this.info = new ItemGrid();
        this.infoForm.reset();
      }
    });
  }

  public handleTime(time: string): string {
    return handleTime(time, true);
  }

  public sortByTime(data: ItemGrid[]): ItemGrid[] {
    return sortByTime(data);
  }

  public addInfo(): void {
    this.showForm = true;
    this.state = 1;
  }

  public create($event: HTMLFormElement): void {
    $event.preventDefault();

    if (!this.infoForm.valid) {
      Object.keys(this.infoForm.controls).forEach(key => {
        this.infoForm.controls[key].markAsTouched();
      });
      return;
    }

    if (this.state === 1) {
      const id = this.service.getIdByDate(new Date());
      const monthDay = this.info.monthDay;
      this.infoForm.patchValue({ id, monthDay });
      this.service.createEvent(this.infoForm.value);
    } else {
      this.service.updateEvent(this.infoForm.value);
    }

    this.infoForm.reset();
    this.showForm = false;
  }

  public delete(item: Info): void {
    this.service.deleteEvent(item);
  }

  public edit(item: Info): void {
    this.showForm = true;
    this.state = 2;
    this.infoForm.patchValue({
      id: item.id,
      title: item.title,
      time: item.time,
      description: item.description,
      monthDay: item.monthDay
    });
  }

  ngOnDestroy(): void {
    this.calendarSub.unsubscribe();
  }
}
