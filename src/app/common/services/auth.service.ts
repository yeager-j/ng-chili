import { Injectable } from '@angular/core';
import { NgSoapService } from './ng-soap.service';
import { parseString } from 'xml2js';
import { Globals } from '../globals';

@Injectable()
export class AuthService {
  public apiKey: string;
  public editorUrl: string;

  constructor(private ngSoap: NgSoapService, private globals: Globals) { }

  async getApiKey(username: string, password: string): Promise<string> {
    let response = await this.ngSoap.post(this.globals.url, 'GenerateApiKey', {
      environmentNameOrURL: 'http://54.227.17.122/CHILI/Admin/interface.aspx',
      userName: username,
      password: password
    });

    return new Promise<string>((resolve, reject) => {
      parseString(response, (err, result) => {
        if (err) { reject(err); }

        if (result.apiKey.$.succeeded === 'false') {
          reject(result.apiKey.$.errorMessage);
        }

        this.apiKey = result.apiKey.$.key;
        resolve(result.apiKey.$.key);
      });
    });
  }

  async getEditorUrl(username: string, password: string, itemID: string): Promise<string> {
    try {
      this.apiKey = await this.getApiKey(username, password);
    } catch (e) {
      throw new Error(e);
    }

    let response;

    try {
      response = await this.ngSoap.post(this.globals.url, 'DocumentGetEditorURL', {
        apiKey: this.apiKey,
        itemID: itemID
      });
    } catch (e) {
      throw new Error(e);
    }

    return new Promise<string>((resolve, reject) => {
      parseString(response, (err, result) => {
        if (err) { console.log(err); }

        this.editorUrl = result.urlInfo.$.url;
        resolve(result.urlInfo.$.url);
      });
    });
  }
}
