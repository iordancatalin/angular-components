import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 't-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnComponent<K> implements OnInit {
  @Input() public name: string = '';
  @Input() public property!: K;
  @Input() public sortable: boolean = true;

  constructor() {}

  ngOnInit(): void {}
}
