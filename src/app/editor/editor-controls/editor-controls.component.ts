import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ChiliEventService } from '../../common/services/chili-event.service';
import { EditorService } from '../../common/services/editor.service';

@Component({
  selector: 'app-editor-controls',
  templateUrl: './editor-controls.component.html',
  styleUrls: ['./editor-controls.component.scss']
})
export class EditorControlsComponent implements OnInit {
  public frame: any = {};

  constructor(private chiliEvent: ChiliEventService, private changeDetect: ChangeDetectorRef, private editorService: EditorService) {
    this.chiliEvent.updateEditorFrame$.subscribe(frame => {
      this.frame = frame;
      this.changeDetect.detectChanges();
    });
  }

  ngOnInit() {
  }

  setFrame(event) {
    this.editorService.setFrameProperty(event);
  }
}
