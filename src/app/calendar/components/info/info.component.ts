import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';

import { CalendarService } from '../../services';
import { FormState, Info, ItemGrid, WeatherAPI } from '../../models';
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
  public state: FormState;

  public infoForm: FormGroup;
  public infoFbGroup = {
    id: new FormControl(''),
    time: new FormControl('', Validators.required),
    monthDay: new FormControl('', Validators.required),
    title: new FormControl('', [ Validators.required, Validators.maxLength(30) ]),
    color: new FormControl(''),
    description: new FormControl(''),
    city: new FormControl('', Validators.maxLength(30))
  };

  private calendarSub: Subscription;

  constructor(
    public service: CalendarService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.infoForm = this.formBuilder.group(this.infoFbGroup);
    this.calendarSub = this.service.eventcalendarChanged.subscribe((item: ItemGrid) => {
      if (item && item.monthDay) {
        this.info = item;
        this.infoForm.patchValue({ monthDay: item.monthDay });
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

  public filterMonthDays(data: ItemGrid[]): ItemGrid[] {
    return data.filter((grid) => grid.monthDay);
  }

  public addInfo(): void {
    this.showForm = true;
    this.state = 1;
    this.infoForm.patchValue({ monthDay: this.info.monthDay });
  }

  public create($event?: HTMLFormElement): void {
    $event?.preventDefault();

    if (!this.infoForm.valid) {
      Object.keys(this.infoForm.controls).forEach(key => {
        this.infoForm.controls[key].markAsTouched();
      });
      return;
    }

    if (this.state === 1) {
      const id = this.service.getIdByDate(new Date());
      this.infoForm.patchValue({ id });
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

  public deleteAllEvents(): void {
    this.service.deleteAllDayEvents(this.service.selectedDay);
  }

  public edit(item: Info): void {
    this.showForm = true;
    this.state = 2;
    this.infoForm.patchValue({
      id: item.id,
      title: item.title,
      time: item.time,
      description: item.description,
      monthDay: item.monthDay,
      city: item.city,
      color: item.color
    });
  }

  public checkWeather(item: Info): void {
    const city = item.city.replace(/ /g, '%20');
    this.service.getWeatherData(city).then((answer: WeatherAPI) => {
      item.success = true;
      item.weather = answer;
      item.error = '';
      this.service.updateEventWeather(item);
    }, (e) => {
      if (e && e.error && e.error.message) {
        item.error = e.error.message;
        this.service.updateEventWeather(item);
      }
    });
  }

  ngOnDestroy(): void {
    this.calendarSub.unsubscribe();
  }
}
