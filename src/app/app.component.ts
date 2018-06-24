import { Component } from '@angular/core';
import { FrameStyle, ScrimEventInterface } from 'projects/ngx-picture-framing/src/lib/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  public frameStyle: FrameStyle = {
    background: 'rgba(53, 102, 214, 0.2)',
    borderColor: 'rgba(247, 0, 247, 0.7)',
    borderActive: 'rgba(0,30,247, 0.7)',
    borderStyle: 'groove',
    borderSize: 5
  };

  public showCreated(scrimEvent: ScrimEventInterface): void {
    console.log(scrimEvent);
  }

  public showRemoved(scrimEvent: ScrimEventInterface): void {
    console.log(scrimEvent);
  }

  public showResized(scrimEvent: ScrimEventInterface): void {
    console.log(scrimEvent);
  }

  public showMoved(scrimEvent: ScrimEventInterface): void {
    console.log(scrimEvent);
  }

  public showMove(scrimEvent: ScrimEventInterface): void {
    console.log(scrimEvent);
  }

  public showResize(scrimEvent: ScrimEventInterface): void {
    console.log(scrimEvent);
  }

  public active(): void {
    console.log();
  }
}
