import { Square, Point, SizeImg } from '../interfaces';
import { ResizeType } from '../enums/ResizeType.enum';

export class Frame {
  private _id: string;
  private _width: number;
  private _height: number;
  private _points: Square;
  private _widthResizeBorder = 10;
  private _minSize = 50;
  private _offset: Point;
  private _resizeType: ResizeType;
  private _frameName: string;
  private _imgSize: SizeImg;
  private _isMove: boolean;
  /**
   * Create new Frame
   * @param startPoint clientX, clientY object start point of frame
   * @param endPoint clientX, clientY object end point of frame
   * @param size Size of work space
   * @param clRect Bounding Client Rect
   * @param id Frame ID
   * @param name Frame name
   */
  constructor(startPoint: Point, endPoint: Point, size: SizeImg, clRect: DOMRect, id?: string, name?: string ) {
    const points: [Point, Point] = this._selectPoint(startPoint, endPoint);
    this._calcWidth(points[0], points[1]);
    this._calcHeigth(points[0], points[1]);
    this._calcPoints(points[0], points[1], clRect);
    this._imgSize = size;
    id ? this._id = id : this._generateId();
    name ? this._frameName = name : this._frameName = '';
  }

  get isResize(): boolean {
    if (this._resizeType !== null && this._resizeType !== undefined) {
      return true;
    }
  }

  get isMove(): boolean {
    return this._isMove;
  }

  get width(): number {
    return this._width;
  }

  get height(): number {
    return this._height;
  }

  get a(): Point {
    return this._points.a;
  }

  get b(): Point {
    return this._points.b;
  }

  get c(): Point {
    return this._points.c;
  }

  get d(): Point {
    return this._points.d;
  }

  get id(): string {
    return this._id;
  }

  get frameName(): string {
    return this._frameName;
  }

  set frameName(value: string) {
    this._frameName = value;
  }

  get widthResizeBoreder(): number {
    return this._widthResizeBorder;
  }

  set widthResizeBoreder(value: number) {
    this._widthResizeBorder = value;
  }
  /**
   * Set offset for move frame
   * @param point clientX, clientY of MouseDown event;
   */
  public setOffset(point: Point): void {
    this._offset = {
      x: point.x - this.a.x,
      y: point.y - this.a.y
    };
  }
  /**
   * Informs frame about start resize
   * @param resizeType Type risize of enum ResizeType
   */
  public startResize(resizeType: ResizeType): void {
    this._resizeType = resizeType;
  }
  /**
   * Informs frame about end resize
   */
  public endResize(): void {
    this._resizeType = null;
  }
  /**
   * Allows resize frame.
   * @param point clientX, clientY of MouseMove event;
   * @param clRect Bounding Client Rect
   */
  public resize(point: Point, clRect: DOMRect): void {
    switch (this._resizeType) {
      case ResizeType.LEFT: {
        this._resizeLeft(point.x, clRect);
        break;
      }
      case ResizeType.RIGTH: {
        this._resizeRigth(point.x, clRect);
        break;
      }
      case ResizeType.TOP: {
        this._resizeTop(point.y, clRect);
        break;
      }
      case ResizeType.BOTTOM: {
        this._resizeBottom(point.y, clRect);
        break;
      }
      case ResizeType.BOTTOM_RIGTH: {
        this._resizeBottomRigth(point, clRect);
        break;
      }
      case ResizeType.BOTTOM_LEFT: {
        this._resizeBottomLeft(point, clRect);
        break;
      }
      case ResizeType.TOP_RIGTH: {
        this._resizeTopRigth(point, clRect);
        break;
      }
      case ResizeType.TOP_LEFT: {
        this._resizeTopLeft(point, clRect);
        break;
      }
    }
  }
  /**
   * Allows move frame by image.
   * @param point clientX, clientY of MouseMove event;
   * @param clRect Bounding Client Rect
   */
  public moveFrame(point: Point, clRect: DOMRect): void {
    this._isMove = true;
    const ax = point.x - this._offset.x;
    const ofx = point.x + this._width - this._offset.x;
    if ( ax > 0 && ofx < this._imgSize.width) {
      this._points.a.x = ax;
    } else {
      if (ax < clRect.x) {
        this._points.a.x = 0;
      } else if (point.x + this._width < this._points.b.x) {
        this._points.a.x = this._imgSize.width - this._width;
      }
    }
    const ay = point.y - this._offset.y;
    const ofy = point.y + this._height - this._offset.y;
    if (ay > 0 && ofy < this._imgSize.height) {
      this._points.a.y = ay;
    } else {
      if (ay < 0) {
        this._points.a.y = 0;
      } else if (ofy > this._imgSize.height) {
        this._points.a.y = this._imgSize.height - this._height;
      }
    }
    this._reCalcPoints();
  }
  /**
   * Inform frame about finsh move
   */
  public moveFrameEnd() {
    this._isMove = false;
  }
  /**
   * Create points for minimal frame
   * @param startPoint clientX, clientY object start point of frame
   * @param endPoint clientX, clientY object end point of frame
   */
  private _minimalFrame(startPoint: Point, endPoint: Point): [Point, Point] {
    const diffX = endPoint.x - startPoint.x;
    const diffY = endPoint.y - startPoint.y;
    const newEndPoint: Point = { ...endPoint };
    if (diffX < this._minSize) {
      newEndPoint.x = endPoint.x + this._minSize - diffX;
    }
    if (diffY < this._minSize) {
      newEndPoint.y = endPoint.y + this._minSize - diffY;
    }
    return [startPoint, newEndPoint];
  }
  /**
   * Select start and end point for begin create frame
   * @param startPoint clientX, clientY object start point of frame
   * @param endPoint clientX, clientY object end point of frame
   */
  private _selectPoint(startPoint: Point, endPoint: Point): [Point, Point] {
    if (endPoint.x > startPoint.x && endPoint.y > startPoint.y) {
      return this._minimalFrame(startPoint, endPoint);
    } else if (startPoint.x > endPoint.x && startPoint.y > endPoint.y) {
      const newStartPoint = endPoint;
      const newEndPoint = startPoint;
      return this._minimalFrame(newStartPoint, newEndPoint);
    } else if (startPoint.x > endPoint.x && startPoint.y < endPoint.y) {
      const newStartPoint: Point = {
        x: endPoint.x,
        y: startPoint.y
      };
      const newEndPoint: Point = {
        x: startPoint.x,
        y: endPoint.y
      };
      return this._minimalFrame(newStartPoint, newEndPoint);
    } else if (startPoint.x < endPoint.x && startPoint.y > endPoint.y) {
      const newStartPoint: Point = {
        x: startPoint.x,
        y: endPoint.y
      };
      const newEndPoint: Point = {
        x: endPoint.x,
        y: startPoint.y
      };
      return this._minimalFrame(newStartPoint, newEndPoint);
    } else { // ??
      return this._minimalFrame(startPoint, endPoint);
    }
  }
  /**
   * Handler left resize.
   * @param x clientX position cursor.
   * @param clRect Bounding Client Rect.
   */
  private _resizeLeft(x: number, clRect: DOMRect): void {
    const width = x - this.a.x + this._widthResizeBorder - clRect.x;
    if (width > this._minSize) {
      this._width = width;
      this._reCalcPoints();
    }
  }
  /**
   * Handler rigth resize
   * @param x clientX position cursor
   * @param clRect Bounding Client Rect.
   */
  private _resizeRigth(x: number, clRect: DOMRect): void {
    const a = x - clRect.x;
    if (this._points.b.x > a) {
      const width = this._points.b.x - a;
      if (width > this._minSize) {
        this._points.a.x = a;
        this._width = this._points.b.x - this._points.a.x;
        this._reCalcPoints();
      }
    }
  }
  /**
   * Handler top resize.
   * @param y clientY position cursor.
   * @param clRect Bounding Client Rect.
   */
  private _resizeTop(y: number, clRect: DOMRect): void {
    if (this._points.d.y > y - clRect.y) {
      const a = y - clRect.y - this._widthResizeBorder / 2;
      const height = this._points.d.y - a;
      if (height > this._minSize) {
        this._points.a.y = a;
        this._height = height;
        this._reCalcPoints();
      }
    }
  }
  /**
   * Handler bottom resize.
   * @param y clientY position cursor.
   * @param clRect Bounding Client Rect.
   */
  private _resizeBottom(y: number, clRect: DOMRect): void {
    const height = y - this.a.y + this._widthResizeBorder / 2 - clRect.y;
    if (height > this._minSize) {
      this._height = height;
      this._reCalcPoints();
    }
  }
  /**
   * Handler bottom-rigth resize.
   * @param point clientX, clientY of MouseMove event;
   * @param clRect Bounding Client Rect.
   */
  private _resizeBottomRigth(point: Point, clRect: DOMRect): void {
    const height = point.y - this.a.y + this._widthResizeBorder / 2 - clRect.y;
    const width = point.x - this.a.x + this._widthResizeBorder / 2 - clRect.x;
    if (height > this._minSize) {
      this._height = height;
    }
    if (width > this._minSize) {
      this._width = width;
    }
    this._reCalcPoints();
  }
  /**
   * Handler bottom-left resize.
   * @param point clientX, clientY of MouseMove event;
   * @param clRect Bounding Client Rect.
   */
  private _resizeBottomLeft(point: Point, clRect: DOMRect): void {
    if (this._points.b.x > point.x - clRect.x) {
      const a = point.x - this._widthResizeBorder / 2 - clRect.x;
      const width = this._points.c.x - a;
      const height = point.y - this.a.y + this._widthResizeBorder / 2 - clRect.y;
      if (width > this._minSize) {
        this._points.a.x = a;
        this._width = width;
      }
      if (height > this._minSize) {
        this._height = point.y - this.a.y + this._widthResizeBorder / 2 - clRect.y;
      }
      this._reCalcPoints();
    }
  }
  /**
   * Handler top-rigth resize.
   * @param point clientX, clientY of MouseMove event;
   * @param clRect Bounding Client Rect.
   */
  private _resizeTopRigth(point: Point, clRect: DOMRect): void {
    if (point.x - clRect.x > this._points.a.x && point.y - clRect.y < this._points.d.y) {
      const aY = point.y - clRect.top;
      const width = point.x - this._points.a.x + this._widthResizeBorder - clRect.x;
      const height = this._points.d.y - aY;
      if (width > this._minSize) {
        this._width = width;
      }
      if (height > this._minSize) {
        this._points.a.y = aY;
        this._height = height;
      }
      this._reCalcPoints();
    }
  }
  /**
   * Handler top-left resize.
   * @param point clientX, clientY of MouseMove event;
   * @param clRect Bounding Client Rect.
   */
  private _resizeTopLeft(point: Point, clRect: DOMRect): void {
    if (point.y - clRect.y < this._points.d.y && point.x - clRect.x < this._points.b.x) {
      const aX = point.x - clRect.x;
      const aY = point.y - clRect.y;
      const width = this._points.b.x - aX;
      const height = this._points.d.y - aY;
      if (width > this._minSize) {
        this._points.a.x = aX;
        this._width = width;
      }
      if (height > this._minSize) {
        this._points.a.y = aY;
        this._height = height;
      }
      this._reCalcPoints();
    }
  }
  /**
   * Calculate width of frame
   * @param startPoint clientX, clientY object start point of frame
   * @param endPoint clientX, clientY object end point of frame
   */
  private _calcWidth(startPoint: Point, endPoint: Point): void {
    this._width = endPoint.x - startPoint.x;
  }

  private _calcHeigth(startPoint: Point, endPoint: Point): void {
    this._height = endPoint.y - startPoint.y;
  }
  /**
   * Calculate positions all points of frame (a, b, c, d)
   * @param startPoint clientX, clientY object start point of frame
   * @param endPoint clientX, clientY object end point of frame
   * @param clRect Bounding Client Rect.
   */
  private _calcPoints(startPoint: Point, endPoint: Point, clRect: DOMRect): void {
    this._points = {
      a: {
        x: startPoint.x - clRect.x,
        y: startPoint.y - clRect.y
      },
      b: {
        x: startPoint.x + endPoint.x - startPoint.x - clRect.x,
        y: startPoint.y - clRect.y
      },
      c: {
        x: startPoint.x + endPoint.x - startPoint.x - clRect.x,
        y: startPoint.y + endPoint.y - startPoint.y - clRect.y,
      },
      d: {
        x: startPoint.x - clRect.x,
        y: startPoint.y + endPoint.y - startPoint.y - clRect.y
      }
    };
  }
  /**
   * Recalculate all poinst of frame (a, b, c, d)
   */
  private _reCalcPoints(): void {
    // Считать по окончанию?
    this._points.b.x = this._points.a.x + this._width;
    this._points.b.y = this._points.a.y;
    this._points.c.x = this._points.b.x;
    this._points.c.y = this._points.b.y + this._height;
    this._points.d.x = this._points.a.x;
    this._points.d.y = this._points.a.y + this._height;
  }
  /**
   * Generate id for frame
   */
  private _generateId(): void {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    for (let i = 0; i < 5; i++) {
      id += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    this._id = id;
  }
}
