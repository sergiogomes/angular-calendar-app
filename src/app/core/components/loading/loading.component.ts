import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';

import { BaseService } from '../../services/base.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit, OnDestroy {
  public count = 0;
  public display = 'd-none';

  private loadingSub: Subscription;

  constructor(private base: BaseService) {
    this.loadingSub = this.base.eventLoadingChanged.subscribe((res) => {
      if (res) {
        this.show();
      } else {
        this.hide();
      }
    });
  }

  ngOnInit(): void {}

  public show(): void {
    this.count++;

    if (this.count > 0) {
      this.display = 'd-flex';
    }
  }

  public hide(): void {
    if (this.count === 0) {
      this.count = 0;
    } else {
      this.count--;
    }

    if (this.count === 0) {
      this.display = 'd-none';
    }
  }

  ngOnDestroy(): void {
    this.loadingSub.unsubscribe();
  }
}
