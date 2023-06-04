import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'bk-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() pageText = 'page';
  @Input() totalPages = 0;
  @Input() page = 0;

  @Input() disablePrevious = false;
  @Input() disableNext = false;

  @Output() change = new EventEmitter();
  pageUpdate$ = new Subject();
  subs = new Subscription();

  ngOnInit(): void {
    this.subs.add(this.pageUpdate$.pipe(debounceTime(150)).subscribe(v => this.change.emit(v)))
  }

  onNext() {
    this.change.emit(this.page + 1);
  }

  onPrevious() {
    this.change.emit(this.page - 1);
  }

  onPageChange(event: any) {
    if (isNaN(+event.target.value)) {
      return;
    }

    if (event.target.value > this.totalPages) {
      return;
    } 

    this.pageUpdate$.next(event.target.value);
  }

  onFocusOut(event: any) {
    if (event.target.value > this.totalPages) {
      event.target.value = 1;
      this.pageUpdate$.next(1);
    } 
  }
}
