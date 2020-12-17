import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { AES, enc } from 'crypto-js';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private secretKey : string = "umachavealeatoria20204444";

  constructor() { }

  save(key : string, value : any) : Promise<void> {
    const stringified = JSON.stringify(value);
    const encrypted = AES.encrypt(stringified, this.secretKey);
    return new Promise((resolve) => {
      Storage.set({key, value : encrypted.toString()}).then(() => resolve());
    })
  }

  load(key : string) : Promise<any> {
    return new Promise((resolve) => {
      Storage.get({ key }).then(res => {
        if(res.value != null){
          const decrypted = AES.decrypt(res.value, this.secretKey);
          const object = JSON.parse(decrypted.toString(enc.Utf8));
          resolve(object);
        }
        resolve(null);
      })
    })
  }

  remove(key : string) : Promise<void> {
    return new Promise((resolve) => {
      Storage.remove({ key }).then(() => {
        resolve();
      })
    })
  }
}
