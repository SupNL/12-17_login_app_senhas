import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  private authenticated : boolean;

  constructor(
    private storage : StorageService
  ) { }

  login(username : string, password : string) : Promise<boolean> {
    return new Promise(resolve => {
      this.storage.load("account").then(account => {
        if(account) {
          if(account.username == username && account.password === password){
            this.authenticated = true;
            resolve(true);
          }
        }
        resolve(false);
      })
    })
  }

  logout() {
    this.authenticated = false;
  }

  isAuthenticated() : boolean {
    return this.authenticated;
  }

  registerAccount(account : any) : Promise<void> {
    return new Promise(resolve => {
      this.isRegistered().then(isRegistered => {
        // so registrar se nao estiver registrado
        if(!isRegistered) {
          this.storage.save("account", account);
          resolve();
        }
      })
    })
  }

  isRegistered() : Promise<boolean> {
    return new Promise(
      (resolve) => {
        this.storage.load("account").then(res => {
          resolve(!!res);
        })
      }
    )
  }

  reset() : Promise<void> {
    return new Promise(
      (resolve) => {
        this.storage.remove("account").then(() => {
          this.authenticated = false;
          resolve();
        })
      }
    )
  }

}
