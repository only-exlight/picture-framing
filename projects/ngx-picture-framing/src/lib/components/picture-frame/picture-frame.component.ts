import { Component, OnInit, EventEmitter, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { Frame } from '../../classes/Frame.class';
import { ResizeType } from '../../enums/ResizeType.enum';
import { FrameStyle } from '../../interfaces';

@Component({
  selector: 'lib-picture-frame',
  templateUrl: './picture-frame.component.html',
  styleUrls: ['./picture-frame.component.scss']
})
export class PictureFrameComponent implements OnInit {

  @ViewChild('frameName') frameName: ElementRef<HTMLDivElement>;
  @Input() frame: Frame;
  @Input() frameStyle: FrameStyle;
  @Output() setActive = new EventEmitter<Frame>();
  @Output() capture = new EventEmitter<Frame>();
  @Output() captureEnd = new EventEmitter();
  @Output() resize = new EventEmitter<Frame>();
  @Output() resizeEnd = new EventEmitter();
  @Output() remove = new EventEmitter<Frame>();
  public resizeT = ResizeType;
  public frameNameWidth: number;

  ngOnInit() {
    console.log(this.frameStyle);
   }
  /**
   * Informs scrim about start move
   * @param e MouseDown event
   */
  public moveStart(e: MouseEvent): void {
    if (e.button === 0) {
      this.frame.setOffset({x: e.clientX, y: e.clientY});
      this.capture.emit(this.frame);
    }
  }
  /**
   * Informs scrim about end move
   * @param e MouseUp event
   */
  public moveEnd(e: MouseEvent): void {
    this.captureEnd.emit();
  }
  /**
   * Informs frame about start resize
   * @param e MouseDown event
   * @param type Type of resize (ResizeType enum)
   */
  public resizeStart(e: MouseEvent, type: ResizeType): void {
    if (e.button === 0) {
      this.frameNameWidth = this.frameName.nativeElement.clientWidth;
      this.frame.startResize(type);
      this.resize.emit(this.frame);
    }
  }
  /**
   * Informs scrim about end resize
   * @param e MouseUp event
   */
  public endResize(e: MouseEvent): void {
    this.resizeEnd.emit();
    this.frame.endResize();
  }
  /**
   * Remove this frame
   * @param e ContextMenu event
   */
  public removeFrame(e: MouseEvent): void {
    e.preventDefault();
    this.remove.emit(this.frame);
  }

  public activate() {
    this.frame.active = true;
    if (!this.frame.name) {
      this.frame.name = 'Введите название';
    }
    console.log('activate');
  }

}
