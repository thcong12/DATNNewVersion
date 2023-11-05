import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account, TypeAdmin } from '../model/account.model';
import { BaseService } from './base.service';


@Injectable({
  providedIn: 'root',
})
export class AccountAdminService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }
  public accountAdminList():Observable<Account.Admin[]>{
    const me =this;
    const url = `account`
    return me.get(url);
  }
  public getAccountDetail(id:string){
    const me =this;
    const url = `account/${id}`
    return me.get(url);
  }
  public accountUser(){
    const me =this;
    const url = `user/`
    return me.get(url);
  }
  public resetPassword(id:string){
    const me = this;
    const url = `account/resetpassword/${id}`
    return me.get(url)
  }
  public typeAdminList(){
    const me =this;
    const url = `account/typeAdmin`
    return me.get(url);
  }
  public typeAdminDetail(id:string):Observable<any>{
    const me =this;
    const url = `account/typeAdmin/${id}`
    return me.get(url);
  }
  public createNewAdminAccount(newAccount:any){
    const me= this;
    const url = `account/`
    return me.post(url,newAccount)
  }
  public changeUserInfo(id:string,data:any){
    const me =this;
    const url = `account/${id}`
    return me.put(url,data);
  }
}
