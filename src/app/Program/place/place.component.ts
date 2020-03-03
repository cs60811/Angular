import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { debounceTime, map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { tap, distinct , catchError , filter } from 'rxjs/operators';
import { of, from , Observable } from 'rxjs';

import * as moment from 'moment'; // add this 1 of 4


interface PlaceMap {
  ID: string;
  Place: string;
  Date: Date;
  Time: string;
  Owner: string;
  Max: number;
  Accept: string;
  CreateDate: Date;
}

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})


export class PlaceComponent implements OnInit {
  // 外面用的參數
  PlaceList: any = [];      // 地點下拉選單
  DateOfPlace: any[] = [];  // 日期下拉選單
  TimeOfDate: any[] = [];   // 時段下拉選單
  strPlace: string;         // 點選地點時的TEXT
  strDate: string;          // 點選日期時的TEXT
  strSubmitlog: any;        // 是否開起完成資訊的flag
  strSubmitFlag = false;    // 是否按下Submit
  showProcessIcon = false;  // 是否顯示Process Icon

  // 內部用的參數
  basicFormGroup: FormGroup;
  StepOneQuestion: FormGroup;
  errorMessage: any;
  isLinear: boolean;
  countries$: any;
  PlaceMaps: PlaceMap[];


  constructor(private httpClient: HttpClient , private sanitized: DomSanitizer ) {
    // 表單欄位及驗證
    this.basicFormGroup = new FormGroup({
      StepOneQuestion : new FormGroup({
        name: new FormControl('', Validators.required),
        NickName: new FormControl('', Validators.required),
        Phone: new FormControl('', [ Validators.pattern('[0-9]+') , Validators.minLength(10) , Validators.maxLength(10)]),
        Sex: new FormControl('', Validators.required)
      }),
      StepTwoQuestion : new FormGroup({
        Place: new FormControl('', Validators.required),
        Date: new FormControl('', Validators.required),
        Time: new FormControl('', Validators.required),
        PeopleCount: new FormControl('', Validators.required)
      })
    });

  }
  ngOnInit( ) {
    /*this.countries$ = this.httpClient.get<any[]>('assets/countries.json');

    this.basicFormGroup
      .get('StepTwoQuestion')
      .get('Place')
      .valueChanges.pipe(debounceTime(300))
      .subscribe(inputCountry => {
        this.countries$ = this.httpClient.get<any[]>('assets/countries.json')
        .pipe(map(countries$ => {
          return countries$.filter(country => country.name.indexOf(inputCountry) >= 0);
        }));
      });*/

    this.getPlaceMaps().pipe(
      map(
        data => JSON.parse(data.toString())
      )
    ).subscribe(
      (item: PlaceMap[]) => {
        this.PlaceMaps = item;
        this.PlaceMaps = this.PlaceMaps.filter(dd => dd.ID === '1');
      }
    );
    this.getPlaceMap();

  }


  highlightFiltered(countryName: string) {
    const inputCountry = this.basicFormGroup.get('StepTwoQuestion').get('Place').value;
    return this.transform(countryName.replace(inputCountry, '<span >' + inputCountry + '</span>'));
  }

  transform(value) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }

  /**
   * 提交的動作
   * @param customerData basicFormGroup
   */
  onSubmit(customerData) {
    // Process checkout data here

    const postURL = 'https://script.google.com/macros/s/AKfycbwC3XKfgUHRy_NbBHMwfrEwALyAwLKAciPeg5k775uIIjf4SG0x/exec';
    const param1 = '?PID=Place&AID=Insert&Name=' + customerData.StepOneQuestion.name ;
    // const param2 = '&NickName=' + customerData.StepOneQuestion.NickName + '&Email=' + customerData.StepOneQuestion.Email ;
    const param2 = '&NickName=' + customerData.StepOneQuestion.NickName  ;
    const param3 = '&Phone=' + customerData.StepOneQuestion.Phone + '&Sex=' + customerData.StepOneQuestion.Sex ;
    const param4 = '&PlaceID=' + customerData.StepTwoQuestion.Time;
    const param5 = '&PeopleCount=' + customerData.StepTwoQuestion.PeopleCount;
    console.log('postURL:', postURL + param1 + param2 + param3 + param4 + param5);
    console.warn('Your order has been submitted', customerData);
    this.show();
    this.httpClient.post(postURL + param1 + param2 + param3 + param4 + param5, '' )
    .subscribe( item => {
      this.showProcessIcon = false;
      console.log('回來的資訊:' + item);
      this.strSubmitlog = item;
      this.basicFormGroup.reset();
      console.warn('Commit Complete');
    });
  }

  show() {
    this.showProcessIcon = true;
    this.strSubmitFlag = true;
  }


  /**
   * 取得場地表清單，原始資料
   */
  getPlaceMaps(): Observable<PlaceMap[]> {
    const Paramater = '?PID=Place&AID=GetPlaceMap';
    const PlaceListURL = 'https://script.google.com/macros/s/AKfycbwC3XKfgUHRy_NbBHMwfrEwALyAwLKAciPeg5k775uIIjf4SG0x/exec' + Paramater;
    return this.httpClient.get<PlaceMap[]>(PlaceListURL).pipe(
          tap(_ => console.log('fetched Places')),
          catchError(this.handleError<PlaceMap[]>('getPlaceMaps', []))
        );
  }

  /**
   * 錯誤擷取器
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

  /**
   * 地點下拉選單連動動作
   * @param selectedValue any
   */
  updateDateOfPlace(selectedValue): void {
    this.strPlace = selectedValue.source.triggerValue;
    this.DateOfPlace = [];
    this.TimeOfDate = [];
    console.log('點選的ID:' + selectedValue.value);
    console.log('點選的TEXT:' + selectedValue.source.triggerValue);

    this.getPlaceMaps().pipe(
       map(
          data => JSON.parse(data.toString())
       ),
       map(
          item => {
             from<any[]>(item).pipe(
                filter((p: any) => new Date(p.Date) >= new Date(), ),
                filter((p: any) => p.Place === selectedValue.source.triggerValue, ),
                distinct((p: any) => p.Date , )
                // tap ( data => console.log("123:" + data.Date))
              ).subscribe( detail => {
                this.DateOfPlace.push(detail);
                console.log( 'qq:' + this.DateOfPlace);
              });
          }
        )
    ).subscribe();
  }


  /**
   * 取得場地清單，經過篩選後
   */
  getPlaceMap(): void {

    this.getPlaceMaps().pipe(
      map(
        data => JSON.parse(data.toString())
      ),
      map(
        item => {
           from<any[]>(item).pipe(
              filter((p: any) => new Date(p.Date) >= new Date(), ),
              distinct((p: any) => p.Place , )
            ).subscribe(data => {
              this.PlaceList.push(data);

            });

        }
      )
    ).subscribe();
  }
  /**
   * 點選時間後更新時段的動作
   * @param selectedValue any
   */
  updateTimeOfDate(selectedValue): void {
    this.TimeOfDate = [];
    console.log('點選的ID:' + selectedValue.value);
    console.log('點選的TEXT:' + selectedValue.source.triggerValue);

    this.getPlaceMaps().pipe(
       map(
          data => JSON.parse(data.toString())
       ),
        map(
          item => {
             from<any[]>(item).pipe(
                filter((p: any) => p.Place === this.strPlace, ),
                filter((p: any) => p.Date === selectedValue.value, ),
                // tap ( data => console.log("123:"+data.Date))
              ).subscribe( detail => {
                this.TimeOfDate.push(detail);
                console.log( 'qq1:' + this.TimeOfDate);
              });
          }
        )
    ).subscribe();
  }

  /**
   * 日曆的filter範例
   * @param date Date
   */
  DatePickerFilter(date: Date): boolean {
    let result = false;
    for (const i of this.DateOfPlace) {
      if ( new Date(i).getTime() === date.getTime() ) {
        result = true;
      }
    }
    return result;
  }


}
