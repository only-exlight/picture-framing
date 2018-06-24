import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrimComponent } from './components/scrim/scrim.component';
import { PictureFrameComponent } from './components/picture-frame/picture-frame.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ScrimComponent,
    PictureFrameComponent
  ],
  exports: [ScrimComponent]
})
export class NgxPictureFramingModule { }
