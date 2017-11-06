import { EditorService } from '../services/editor.service';

export class EventHandler {
  private editor: any;
  private eventMap = {
    'DocumentFullyLoaded': EventHandler.DocumentFullyLoaded,
    'TextSelectionChanged': EventHandler.TextSelectionChanged,
    'SelectedFrameChanged': EventHandler.FrameModified,
    'FrameMoved': EventHandler.FrameModified,
    'FrameRotated': EventHandler.FrameModified
  };

  constructor(private _editor: any, private editorService: EditorService) {
    this.editor = _editor;

    for (let key in this.eventMap) {
      if (this.eventMap.hasOwnProperty(key)) {
        this.editor.AddListener(key);
      }
    }
  }

  private static DocumentFullyLoaded(instance: any) {
    let numFonts = instance.editor.GetObject('document.fonts').length;
    let fontList = [];

    for (let i = 0; i < numFonts; i++) {
      let font = instance.editor.GetObject(`document.fonts[${i}]`);
      fontList.push(font);
    }

    instance.editorService.updateFontList(fontList);
  }

  private static TextSelectionChanged(instance: any) {
    let frame = instance.editor.GetObject('document.selectedFrame');

    if (frame) {
      return;
    }

    let selectedText = instance.editor.GetObject('document.selectedText.textFormat');

    if (!selectedText) { return; }

    instance.editorService.updateEditorText(selectedText);
  }

  private static FrameModified(instance: any) {
    let selectedFrame = instance.editor.GetObject('document.selectedFrame');

    if (!selectedFrame) { return; }

    instance.editorService.updateEditorFrame(selectedFrame);
  }

  handleEvent(type: string, targetID: any) {
    this.eventMap[type](this);
  }
}
