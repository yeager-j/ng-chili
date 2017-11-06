import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ChiliFrameComponent } from './editor/chili-frame/chili-frame.component';
import { EditorComponent } from './editor/editor.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { NgSoapService } from './common/services/ng-soap.service';
import { WindowRefService } from './common/services/window-ref.service';
import { ChiliEventService } from './common/services/chili-event.service';
import { EditorService } from './common/services/editor.service';
import { Globals } from './common/globals';
import { EditorControlsComponent } from './editor/editor-controls/editor-controls.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRouter } from './app.router';
import { AuthGuard } from './auth.guard';
import { AuthService } from './common/services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    ChiliFrameComponent,
    EditorComponent,
    AuthenticationComponent,
    EditorControlsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    AppRouter
  ],
  providers: [NgSoapService, WindowRefService, ChiliEventService, EditorService, Globals, AuthGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
