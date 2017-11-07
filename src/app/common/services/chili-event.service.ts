import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ChiliEventService {
  private updateEditorTextSource = new Subject<any>();
  private updateEditorFrameSource = new Subject<any>();
  private updateFontListSource = new Subject<any>();

  public updateEditorText$ = this.updateEditorTextSource.asObservable();
  public updateEditorFrame$ = this.updateEditorFrameSource.asObservable();
  public updateFontList$ = this.updateFontListSource.asObservable();

  constructor() { }

  updateEditorText(styles) {
    this.updateEditorTextSource.next(styles);
  }

  updateEditorFrame(frame) {
    this.updateEditorFrameSource.next(frame);
  }

  updateFontList(fonts) {
    this.updateFontListSource.next(fonts);
  }
}
