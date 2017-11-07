import { Injectable } from '@angular/core';
import * as SoapClient from '../../../assets/lib/soapclient';


@Injectable()
export class NgSoapService {

  constructor() { }

  public post(url, method, params): Promise<any> {
    return new Promise(((resolve, reject) => {
      // Create SOAPClientParameters

      let soapParams = new SoapClient.SOAPClientParameters();
      for (let param in params) {
        if (params.hasOwnProperty(param)) {
          soapParams.add(param, params[param]);
        }
      }

      // Create Callback

      let soapCallback = function(e){
        if (e.constructor.toString().indexOf('function Error()') !== -1) {
          reject(e);
        } else {
          resolve(e);
        }
      };

      SoapClient.SOAPClient.invoke(url, method, soapParams, true, soapCallback);
    }));
  }

  public setCredentials(username, password) {
    SoapClient.SOAPClient.username = username;
    SoapClient.SOAPClient.password = password;
  }
}
