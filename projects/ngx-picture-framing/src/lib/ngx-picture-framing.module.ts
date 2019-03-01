import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrimComponent } from './components/scrim/scrim.component';
import { PictureFrameComponent } from './components/picture-frame/picture-frame.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    ScrimComponent,
    PictureFrameComponent,
  ],
  exports: [ScrimComponent]
})
export class NgxPictureFramingModule { }
