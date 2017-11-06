import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ChiliEventService {
  private updateEditorTextSource = new Subject<any>();
  private updateChiliTextSource = new Subject<any>();
  private updateEditorFrameSource = new Subject<any>();
  private updateChiliFrameSource = new Subject<any>();
  private updateFontListSource = new Subject<any>();

  public updateEditorText$ = this.updateEditorTextSource.asObservable();
  public updateChiliText$ = this.updateChiliTextSource.asObservable();
  public updateEditorFrame$ = this.updateEditorFrameSource.asObservable();
  public updateChiliFrame$ = this.updateChiliFrameSource.asObservable();
  public updateFontList$ = this.updateFontListSource.asObservable();

  constructor() { }

  updateEditorText(styles) {
    this.updateEditorTextSource.next(styles);
  }

  updateChiliText(styles) {
    this.updateChiliTextSource.next(styles);
  }

  updateEditorFrame(frame) {
    this.updateEditorFrameSource.next(frame);
  }

  updateChiliFrame(frame) {
    this.updateChiliFrameSource.next(frame);
  }

  updateFontList(fonts) {
    this.updateFontListSource.next(fonts);
  }
}
