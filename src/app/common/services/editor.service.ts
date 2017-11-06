import { Injectable } from '@angular/core';
import { parseString } from 'xml2js';
import { NgSoapService } from './ng-soap.service';
import { Globals } from '../globals';
import { EventHandler } from '../classes/event-handler';
import { WindowRefService } from './window-ref.service';

@Injectable()
export class EditorService {
  public editor: any;

  constructor(private windowRef: WindowRefService) { }

  onFrameLoad(frameWindow) {
    frameWindow.GetEditor(jsInterface => {
      this.editor = frameWindow.editorObject;

      let eventHandler = new EventHandler(this.editor, this);

      console.log(this.editor);

      this.windowRef.nativeWindow.OnEditorEvent = (type, targetID) => {
        eventHandler.handleEvent(type, targetID);
      };
    });
  }

  getInfo() {
    let obj = this.editor.GetObject('document.selectedFrame');
    console.log(obj);
  }

  private setSelection(path, attribute) {
    let selection = this.editor.GetObject(path);

    let propName = attribute.property;
    let propValue = attribute.value || !(selection[attribute.property] === 'true');

    this.editor.SetProperty(path, propName, propValue);
  }

  setTextFormat(style) {
    this.setSelection('document.selectedText.textFormat', style);
  }

  setFrameProperty(property) {
    this.setSelection('document.selectedFrame', property);
  }

  executeFunction(event) {
    this.editor.ExecuteFunction(`document.allFrames[${event.frame.id}]`, event.func, event.args);
  }
}
