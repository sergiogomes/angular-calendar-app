import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ItemGrid } from '../../models';

import { InfoComponent } from './info.component';

describe('InfoComponent', () => {
  let component: InfoComponent;
  let fixture: ComponentFixture<InfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoComponent ],
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        BrowserModule,
        FormsModule,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should add an event', () => {
    component.showInfo = true;
    component.showForm = true;
    component.state = 1;

    component.infoForm.patchValue({
      title: 'Software Engineer Interview',
      time: '10:00',
      description: 'Description of the Interview',
      monthDay: 20,
      city: 'Belo Horizonte',
      color: '#add8e6'
    });
    component.create();

    expect(component.showForm).toBeFalse();
  });

  it('should not add a title longer than 30 chars', () => {
    component.showInfo = true;
    component.showForm = true;
    component.state = 1;

    component.infoForm.patchValue({
      title: 'Software Engineer Next Interview',
    });
    component.create();

    expect(component.infoForm.controls.title.errors.maxlength).toBeTruthy();
  });
});
