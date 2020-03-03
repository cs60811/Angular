import { Injectable, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { ApiReturnRecord } from './place.service';

export interface AccountRecord {
  ID: string;
  SID: string;
  Source: string;
  Name: string;
  Sex: string;
  Email: string;
  Last_Login_Date: Date;
  Create_Date: Date;
  Role: string[];
}

@Injectable({
  providedIn: 'root'
})


export class AccountService {
  ApiUrl = 'https://script.google.com/macros/s/AKfycbwC3XKfgUHRy_NbBHMwfrEwALyAwLKAciPeg5k775uIIjf4SG0x/exec';
  @Input() UserInfo: AccountRecord = {} as AccountRecord;

  constructor(private httpClient: HttpClient) {
    this.UserInfo.Name = '訪客';
  }

  getUserInfo() {
    return this.UserInfo;
  }

  setUserInfo(Data: AccountRecord) {
    this.UserInfo.ID = Data.ID;
    this.UserInfo.SID = Data.SID;
    this.UserInfo.Name = Data.Name;
    this.UserInfo.Sex = Data.Sex;
    this.UserInfo.Source = Data.Source;
    this.UserInfo.Email = Data.Email;
    this.UserInfo.Last_Login_Date = Data.Last_Login_Date;
    this.UserInfo.Create_Date = Data.Create_Date;

    // 取得人員權限
    this.getUserRole(Data.ID)
    .subscribe({
      next: (x: string) => console.log('Observer got a next value: ' + x),
      error: (err: string) => console.error('Observer got an error: ' + err),
      complete: () => console.log('Observer got a complete notification'),
      }
    );
  }

  clearUserInfo(){
    this.UserInfo.ID = null;
    this.UserInfo.SID = null;
    this.UserInfo.Name = '訪客';
    this.UserInfo.Sex = null;
    this.UserInfo.Source = null;
    this.UserInfo.Email = null;
    this.UserInfo.Last_Login_Date = null;
    this.UserInfo.Create_Date = null;
    window.location.reload();
  }

  getUserRole(ID: string) {
    const Paramater = '?PID=Search&AID=GetUserRole&ID=' + ID;
    return this.httpClient.get<ApiReturnRecord>(this.ApiUrl + Paramater).pipe(
      tap(_ => console.log(_)),
      // map( data => data = JSON.parse(data.toString())),
      tap( data => {
        if (!data.status) {
          console.error('讀取人員角色發生錯誤!');
        }
      }),
      map( data => data = JSON.parse(data.data) ),
      tap(_ => console.log('fetched getUserRole'))
    );
  }
}
