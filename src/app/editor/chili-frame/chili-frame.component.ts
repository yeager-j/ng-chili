import { Component, OnInit, ViewChild } from '@angular/core';
import { EditorService } from '../../common/services/editor.service';
import { AuthService } from '../../common/services/auth.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-chili-frame',
  templateUrl: './chili-frame.component.html',
  styleUrls: ['./chili-frame.component.scss']
})
export class ChiliFrameComponent implements OnInit {
  @ViewChild('chiliFrame') private chiliFrame;
  editorUrl;
  private frameLoaded = false;

  constructor(public editorService: EditorService, private authService: AuthService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.editorUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.authService.editorUrl);
  }

  onFrameLoad() {
    if (this.frameLoaded === false) {
      this.frameLoaded = true;
      return;
    }

    this.editorService.onFrameLoad(this.chiliFrame.nativeElement.contentWindow);
  }
}
