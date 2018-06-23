import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxPictureFramingModule } from '../../projects/ngx-picture-framing/src/lib/ngx-picture-framing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxPictureFramingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
