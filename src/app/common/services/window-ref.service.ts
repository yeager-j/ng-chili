import { Injectable } from '@angular/core';

function _window(): any {
  return window;
}

@Injectable()
export class WindowRefService {

  constructor() { }

  get nativeWindow() {
    return _window();
  }
}
