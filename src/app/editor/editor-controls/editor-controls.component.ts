import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ChiliEventService } from '../../common/services/chili-event.service';
import { EditorService } from '../../common/services/editor.service';

@Component({
  selector: 'app-editor-controls',
  templateUrl: './editor-controls.component.html',
  styleUrls: ['./editor-controls.component.scss']
})
export class EditorControlsComponent implements OnInit {
  public editorLoaded = false;
  public fontList: any;
  public frame: any = {};
  public textFormat: any = {};

  constructor(private chiliEvent: ChiliEventService, private changeDetect: ChangeDetectorRef, private editorService: EditorService) {
  }

  ngOnInit() {
    this.chiliEvent.updateEditorText$.subscribe(styles => {
      for (let key in styles) {
        if (styles.hasOwnProperty(key)) {
          if (!isNaN(styles[key])) {
            styles[key] = +styles[key];
          }

          if (styles[key] === 'true' || styles[key] === 'false') {
            styles[key] = (styles[key] === 'true');
          }
        }
      }

      this.textFormat = styles;

      this.changeDetect.detectChanges();
    });

    this.chiliEvent.updateEditorFrame$.subscribe(frame => {
      this.frame = frame;
      this.changeDetect.detectChanges();
    });

    this.chiliEvent.updateFontList$.subscribe(fonts => {
      this.editorLoaded = true;

      this.fontList = fonts;
      this.textFormat.font = this.fontList[0];
      this.changeDetect.detectChanges();
    });
  }

  setFrame(event) {
    this.editorService.setFrameProperty(event);
  }

  setFontStyle(event) {
    this.editorService.setTextFormat(event);
  }

  deleteFrame() {
    if (this.frame) {
      console.log(this.frame);
      this.editorService.deleteFrame(this.frame);
    }
  }

  addFrame() {
    this.editorService.insertFrame();
  }
}
