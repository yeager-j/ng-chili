import { Injectable } from '@angular/core';
import { parseString } from 'xml2js';
import { NgSoapService } from './ng-soap.service';
import { Globals } from '../globals';
import { EventHandler } from '../classes/event-handler';
import { WindowRefService } from './window-ref.service';

@Injectable()
export class EditorService {
  private _editor: any;

  constructor(private windowRef: WindowRefService, private eventHandler: EventHandler) { }

  onFrameLoad(frameWindow) {
    frameWindow.GetEditor(jsInterface => {
      this.editor = frameWindow.editorObject;

      this.eventHandler.editor = this.editor;

      this.windowRef.nativeWindow.OnEditorEvent = (type, targetID) => {
        this.eventHandler.handleEvent(type, targetID);
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

  setTextFormat(property) {
    this.setSelection('document.selectedText.textFormat', property);
  }

  setFrameProperty(property) {
    this.setSelection('document.selectedFrame', property);
  }

  executeFunction({frame, func, args = null}) {
    if (args) {
      this.editor.ExecuteFunction(`document.allFrames[${frame.id}]`, func, args);
    } else {
      this.editor.ExecuteFunction(`document.allFrames[${frame.id}]`, func);
    }
  }

  get editor() {
    if (!this._editor) {
      throw new Error('The editor object hasn\'t been instantiated yet!');
    }

    return this._editor;
  }

  set editor(editor) {
    this._editor = editor;
  }
}
