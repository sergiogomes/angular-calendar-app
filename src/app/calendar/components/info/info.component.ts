import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';

import { CalendarService } from '../../services';
import { Info, ItemGrid } from '../../models';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit, OnDestroy {

  public info = new ItemGrid();
  public showInfo: boolean;
  public showForm: boolean;

  public infoForm: FormGroup;
  public infoFbGroup = {
    title: new FormControl('', Validators.required),
    hour: new FormControl('', Validators.required),
    color: new FormControl(''),
    description: new FormControl(''),
    id: new FormControl('')
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
        this.info = new ItemGrid();
      }
    });
    // this.createForm(new Info());
  }

  private createForm(info: Info): void {
    this.infoForm = this.formBuilder.group({
      title: [info.title],
      description: [info.description],
      color: [info.color],
      hour: [info.hour],
      id: [info.id],
      monthDay: [info.monthDay],
    });
  }

  public addInfo(): void {
    this.showForm = true;
  }

  public create($event: HTMLFormElement): void {
    $event.preventDefault();
    const id = new Date();
    this.infoForm.patchValue({ id });
    console.log(this.infoForm.value);
  }

  ngOnDestroy(): void {
    this.calendarSub.unsubscribe();
  }
}
