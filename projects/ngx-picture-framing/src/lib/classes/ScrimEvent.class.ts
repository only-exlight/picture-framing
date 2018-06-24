import { ScrimEventInterface, Point } from '../interfaces';
import { Frame } from './Frame.class';

export class ScrimEvent implements ScrimEventInterface {

  public type: 'WAS_CREATED' | 'WAS_DELETED' | 'WAS_MOVE' | 'WAS_RESIZED' | 'RESIZE' | 'MOVE';
  public id: string;
  public name: string;
  public position: Point;
  public width: number;
  public heigth: number;
  constructor(frame: Frame,
    type: 'WAS_CREATED' | 'WAS_DELETED' | 'WAS_MOVE' | 'WAS_RESIZED' | 'RESIZE' | 'MOVE') {
    this.type = type;
    this.id = frame.id;
    this.name = frame.frameName;
    this.position = {...frame.a };
    this.width = frame.width;
    this.heigth = frame.height;
    this.setId = frame.setFrameId;
    this.setName = frame.setFrameName;
  }

  public setId(value: string): void { }
  public setName(value: string): void { }

}
