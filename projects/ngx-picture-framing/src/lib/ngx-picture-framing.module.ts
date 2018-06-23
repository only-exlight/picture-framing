import { NgModule } from '@angular/core';
import { ScrimComponent } from './components/scrim/scrim.component';
import { PictureFrameComponent } from './components/picture-frame/picture-frame.component';

@NgModule({
  imports: [
  ],
  declarations: [
    ScrimComponent,
    PictureFrameComponent
  ],
  exports: [ScrimComponent]
})
export class NgxPictureFramingModule { }
