import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlaceService, PlaceMap } from '../Service/place.service';
import { map, filter, distinct, tap } from 'rxjs/operators';
import { from, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [ PlaceService ]
})
export class SearchComponent implements OnInit {
  basicFormGroup: FormGroup;
  PlaceList: Observable<any> ;
  SearchResult: Observable<PlaceMap[]> ;
  ResultData: PlaceMap[];
  DateList: any ;
  SubmitFlag = false;


  displayedColumns: string[] = ['Date', 'Time', 'Place', 'Max' , 'action'];

  minDate = new Date().toISOString(); // 日曆最小值
  maxDate = new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString(); // 日曆最大值


  constructor( public PlaceUtil: PlaceService , private httpClient: HttpClient) {
    PlaceUtil = new PlaceService(httpClient);
    // 表單欄位及驗證
    this.basicFormGroup = new FormGroup({
      S_Place: new FormControl('', Validators.required),
      S_Date: new FormControl('', Validators.required)
    });
   }

  ngOnInit() {
    // 取得地點清單
    this.PlaceList = this.PlaceUtil.getPlaceMaps().pipe(
      map(
        data => {
          // 轉成ArrayJson
          data = JSON.parse(data.toString());

          // 日期先過濾
          data = data.filter( e =>
            new Date(e.Date) >= new Date()
          );

          // Distinct 過濾
          data = Array.from(new Set(data.map(s => s.Place))).map( e => data.find( q => q.Place === e));

          return data;
        }
      ),
      tap(data => console.log(data))
    );
  }

  onSubmit(SubmitData: any) {
    this.SubmitFlag = true;
    this.ResultData = [];
    this.SearchResult = this.PlaceUtil.getPlaceMaps().pipe(
      map(
        data => {
          // 轉成ArrayJson
          data = JSON.parse(data.toString());

          // 日期先過濾
          data = data.filter( e =>
            new Date(e.Date).getTime() === SubmitData.S_Date.getTime()
          );

          data = data.filter( e =>
            e.Place === SubmitData.S_Place
          );

          return data;
        }
      ),
      tap(data => this.ResultData = data) ,
      tap(_ => this.SubmitFlag = false )

    );
    this.SearchResult.subscribe();
  }



}
