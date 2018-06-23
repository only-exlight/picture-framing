import { Component, OnInit, ElementRef, ViewChild, Input, Output } from '@angular/core';
import { Point, SizeImg } from '../../interfaces';
import { Frame } from '../../classes/Frame.class';
import { EventEmitter } from 'events';

@Component({
  selector: 'lib-scrim',
  templateUrl: './scrim.component.html',
  styleUrls: ['./scrim.component.scss']
})
export class ScrimComponent implements OnInit {

  @ViewChild('wrapper') wrapper: ElementRef<HTMLImageElement>;
  @Input() framseSetting: any;
  @Output() wasCreate = new EventEmitter();
  @Output() wasRemove = new EventEmitter();
  @Output() wasResize = new EventEmitter();
  @Output() wasMoved = new EventEmitter();
  @Output() isMove = new EventEmitter();
  @Output() isResize = new EventEmitter();

  public frames: Array<Frame> = [];
  public imgURL: string;
  private _startPosition: Point;
  private _isCapture = false;
  private _isResize = false;
  private _activeFrame: Frame;

  constructor() { }

  ngOnInit() { }
  /**
   * Move mouse by scrim handler
   * @param e MouseMove event
   */
  public move(e: MouseEvent): void {
    const clRect: any = this.wrapper.nativeElement.getBoundingClientRect();
    if (this._isCapture) {
      this._activeFrame.moveFrame({ x: e.clientX, y: e.clientY }, clRect );
    } else if (this._isResize) {
      this._activeFrame.resize({ x: e.clientX, y: e.clientY }, clRect);
    }
  }
  /**
   * Begin create frame handler
   * @param e MouseDown event
   */
  public startCreateFrame(e: MouseEvent): void {
    if (!this._isCapture && !this._isResize) {
      this._startPosition = { x: e.clientX, y: e.clientY };
    }
  }
  /**
   * End create frame handler
   * @param e MouseUp event
   */
  public endCreateFrame(e: MouseEvent) {
    const endPoint: Point = { x: e.clientX, y: e.clientY };
    const size: SizeImg = {
      width: this.wrapper.nativeElement.width,
      height: this.wrapper.nativeElement.height
    };
    const clRect: any = this.wrapper.nativeElement.getBoundingClientRect();
    if (this._startPosition) {
      this.frames.push(new Frame(this._startPosition, endPoint, size, clRect));
    }
    this._startPosition = null;
  }
  /**
   * Inform scrim about capture frame
   * @param frame
   */
  public capture(frame: Frame): void {
    this._isCapture = true;
    this._activeFrame = frame;
  }
  /**
   * Inform scrim about end capture frame
   */
  public endCapure() {
    this._activeFrame.moveFrameEnd();
    this._isCapture = false;
  }
  /**
   * Inform scrim about start resize frame
   * @param frame Current resize frame
   */
  public resize(frame: Frame): void {
    this._isResize = true;
    this._activeFrame = frame;
  }
  /**
   * Inform scrim about end resize frame
   */
  public endResize() {
    this._isResize = false;
  }
  /**
   * Inform scrim about need remove frame
   * @param frame frame needy in remove
   */
  public remove(frame: Frame): void {
    this.frames = this.frames.filter(fr => fr.id !== frame.id);
  }

}
