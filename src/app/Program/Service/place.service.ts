import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


export interface PlaceMap {
  ID: string;
  Place: string;
  Date: Date;
  Time: string;
  Owner: string;
  Max: number;
  Accept: string;
  CreateDate: Date;
}

export interface PlaceDetail {
  ID: string;
  Name: string;
  NickName: string;
  Email: string;
  Phone: string;
  Sex: string;
  PlaceID: string;
  PeopleCount: number;
  CreateDate: Date;
  Accept: string;
}

export interface ApiReturnRecord {
  status: boolean;
  msg: string;
  data: string;
}

@Injectable({
  providedIn: 'root'
})
export class PlaceService {
  ApiUrl = 'https://script.google.com/macros/s/AKfycbwC3XKfgUHRy_NbBHMwfrEwALyAwLKAciPeg5k775uIIjf4SG0x/exec';

  constructor( private httpClient: HttpClient ) { }


  public test() {
    console.log('Test Service OK!');
  }

  /**
   * 取得場地表清單，原始資料
   */
  getPlaceMaps(): Observable<PlaceMap[]> {
    const Paramater = '?PID=Place&AID=GetPlaceMap';
    return this.httpClient.get<PlaceMap[]>(this.ApiUrl + Paramater).pipe(
          // tap(_ => console.log(_)),
          tap(_ => console.log('fetched Places')),
          catchError(this.handleError<PlaceMap[]>('getPlaceMaps', []))
        );
  }

  /**
   * 取得場地報名清單
   * @param PlaceID 場地唯一碼
   */
  getPlaceDetail(PlaceID: string) {
    const Paramater = '?PID=Search&AID=GetPlaceDetail&PlaceID=' + PlaceID;
    return this.httpClient.get<ApiReturnRecord>(this.ApiUrl + Paramater).pipe(
      tap(_ => console.log(_)),
      // map( data => data = JSON.parse(data.toString())),
      tap( data => {
        if (!data.status) {
          console.error('讀取場地人員清單發生錯誤!');
        }
      }),
      map( data => data = JSON.parse(data.data) ),
      tap(_ => console.log('fetched PlacesDetail')),
      catchError(this.handleError<ApiReturnRecord[]>('getPlaceDetail', []))
    );
  }

  /**
   * 取得場地詳細資訊
   * @param PlaceID 場地ID
   */
  getPlaceInfo(PlaceID: string) {
    const Paramater = '?PID=Search&AID=GetPlaceInfo&PlaceID=' + PlaceID;
    return this.httpClient.get<ApiReturnRecord>(this.ApiUrl + Paramater).pipe(
      tap(_ => console.log(_)),
      tap( data => {
        if (!data.status) {
          console.error('取得場地詳細資訊發生錯誤!EMSG' + data.msg);
        }
      }),
      map( data => data = JSON.parse(data.data) ),
      tap(_ => console.log('fetched getPlaceInfo')),
      catchError(this.handleError<ApiReturnRecord[]>('getPlaceInfo', []))
    );
  }

  /**
   * 取得場地已報名人員數
   * @param PlaceID 場地ID
   */
  getPlacePeopleCount(PlaceID: string) {
    const Paramater = '?PID=Search&AID=GetPlacePeopleCount&PlaceID=' + PlaceID;
    return this.httpClient.get<ApiReturnRecord>(this.ApiUrl + Paramater).pipe(
      tap(_ => console.log(_)),
      tap( data => {
        if (!data.status) {
          console.error('取得場地已報名人員數發生錯誤!EMSG' + data.msg);
        }
      }),
      map( data => data = JSON.parse(data.data) ),
      tap(_ => console.log('fetched getPlacePeopleCount')),
      catchError(this.handleError<ApiReturnRecord[]>('getPlacePeopleCount', []))
    );
  }

  /**
   * 錯誤擷取器
   * @param operation any
   * @param result any
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
