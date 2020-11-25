import { Component, OnInit } from '@angular/core';

import { CalendarService } from '../../services';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  constructor(public service: CalendarService) { }

  ngOnInit(): void {
  }

}
