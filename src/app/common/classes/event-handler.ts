import { ChiliEventService } from '../services/chili-event.service';
import { Injectable } from '@angular/core';

@Injectable()
export class EventHandler {
  private _editor: any;

  private eventMap = {
    'DocumentFullyLoaded': EventHandler.DocumentFullyLoaded,
    'TextSelectionChanged': EventHandler.TextSelectionChanged,
    'SelectedFrameChanged': EventHandler.FrameModified,
    'FrameMoved': EventHandler.FrameModified,
    'FrameRotated': EventHandler.FrameModified
  };

  constructor(private chiliEvent: ChiliEventService) {
  }

  private static DocumentFullyLoaded(instance: any) {
    let numFonts = instance.editor.GetObject('document.fonts').length;
    let fontList = [];

    for (let i = 0; i < numFonts; i++) {
      let font = instance.editor.GetObject(`document.fonts[${i}]`);
      fontList.push(font);
    }

    instance.chiliEvent.updateFontList(fontList);
  }

  private static TextSelectionChanged(instance: any) {
    let frame = instance.editor.GetObject('document.selectedFrame');

    if (frame) {
      return;
    }

    let selectedText = instance.editor.GetObject('document.selectedText.textFormat');

    if (!selectedText) { return; }

    instance.chiliEvent.updateEditorText(selectedText);
  }

  private static FrameModified(instance: any) {
    let selectedFrame = instance.editor.GetObject('document.selectedFrame');

    if (!selectedFrame) { return; }

    instance.chiliEvent.updateEditorFrame(selectedFrame);
  }

  handleEvent(type: string, targetID: any) {
    if (!this.editor) {
      throw new Error('You must set the editor object!');
    }

    this.eventMap[type](this);
  }

  get editor() {
    return this._editor;
  }

  set editor(editor) {
    this._editor = editor;

    for (let key in this.eventMap) {
      if (this.eventMap.hasOwnProperty(key)) {
        this.editor.AddListener(key);
      }
    }
  }
}
