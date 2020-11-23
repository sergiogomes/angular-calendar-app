import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';

import { Article } from '../../models';
import { SearchService } from 'src/app/search/services';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnDestroy {

  public open: boolean;
  public article = new Article();

  private modalSub: Subscription;

  constructor(private service: SearchService) {
    this.modalSub = this.service.eventModalHandle.subscribe((res: {open: boolean, article: Article}) => {
      if (res.open) {
        this.open = res.open;
        this.article = res.article;
      } else {
        this.open = false;
        this.article = new Article();
      }
    });
  }

  public closeModal(): void {
    this.open = false;
    this.article = new Article();
  }

  ngOnDestroy(): void {
    this.modalSub.unsubscribe();
  }
}
