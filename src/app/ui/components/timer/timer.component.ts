import { CommonModule } from '@angular/common';
import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'dt-timer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss',
})
export class TimerComponent implements OnInit, OnDestroy {
  @Input() duration = 30;
  @Output() timerEnd = new EventEmitter<void>();

  @ContentChild(TemplateRef, { static: false })
  messageTemplate!: TemplateRef<any>;

  timeLeft!: number;
  intervalId: any;

  ngOnInit() {
    this.startTimer();
  }

  ngOnDestroy() {
    this.clearTimer();
  }

  private startTimer() {
    this.clearTimer();
    this.timeLeft = this.duration;
    this.intervalId = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.clearTimer();
        this.timerEnd.emit();
      }
    }, 1000);
  }

  resetTimer() {
    this.startTimer();
  }

  private clearTimer() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  get formattedTime(): string {
    const minutes = Math.floor(this.timeLeft / 60);
    const seconds = this.timeLeft % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
}

