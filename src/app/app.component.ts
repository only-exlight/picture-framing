import { Component } from '@angular/core';
import { FrameStyle, ScrimEventInterface } from 'projects/ngx-picture-framing/src/lib/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  public createEvent: ScrimEventInterface;
  public removeEvent: ScrimEventInterface;
  public resizedEvent: ScrimEventInterface;
  public movedEvent: ScrimEventInterface;
  public moveEvent: ScrimEventInterface;
  public resizeEvent: ScrimEventInterface;
  public frameStyle: FrameStyle = {
    background: 'rgba(53, 102, 214, 0.2)',
    borderColor: 'rgba(247, 0, 247, 0.7)',
    borderActive: 'rgba(0,30,247, 0.7)',
    borderStyle: 'groove',
    borderSize: 5
  };

  public showCreated(scrimEvent: ScrimEventInterface): void {
    this.createEvent = scrimEvent;
  }

  public showRemoved(scrimEvent: ScrimEventInterface): void {
    this.removeEvent = scrimEvent;
  }

  public showResized(scrimEvent: ScrimEventInterface): void {
    this.resizedEvent = scrimEvent;
  }

  public showMoved(scrimEvent: ScrimEventInterface): void {
    this.movedEvent = scrimEvent;
  }

  public showMove(scrimEvent: ScrimEventInterface): void {
    this.moveEvent = scrimEvent;
    console.log(this.moveEvent);
  }

  public showResize(scrimEvent: ScrimEventInterface): void {
    this.resizeEvent = scrimEvent;
  }

  public active(): void {
    console.log();
  }
}
