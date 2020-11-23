import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';

import { SearchService } from 'src/app/search/services';
import { QueryParams } from '../../models';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  public searchText: string;
  private routeParamsSub: Subscription;

  constructor(
    private router: Router,
    private service: SearchService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.routeParamsSub = this.route.queryParams.subscribe((params) => {
      this.searchText = params.q ? params.q : this.searchText;
    });
  }

  // Change to Search screen
  public onSearch(): void {
    const objQueryParams: QueryParams = {
      q: this.searchText,
      page: 1
    };

    if (this.searchText) {
      this.router.navigate(['/search'], {
        queryParams: objQueryParams
      });
      this.service.searchChanged$.next(objQueryParams);
    }
  }

  public onClickHome(): void {
    this.router.navigate(['/home']);
  }

  ngOnDestroy(): void {
    this.routeParamsSub.unsubscribe();
  }
}
