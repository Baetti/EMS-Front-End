import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-inline-calendar',
  templateUrl: './inline-calendar.component.html',
  styleUrls: ['./inline-calendar.component.css'],
})
export class InlineCalendarComponent {
  selected: Date | null = new Date();
}
