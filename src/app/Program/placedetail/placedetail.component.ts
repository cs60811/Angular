import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlaceService, PlaceDetail } from '../Service/place.service';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { CompileTemplateMetadata } from '@angular/compiler';

@Component({
  selector: 'app-placedetail',
  templateUrl: './placedetail.component.html',
  styleUrls: ['./placedetail.component.css'],
  providers: [ PlaceService ]
})
export class PlacedetailComponent implements OnInit {
  PlaceID: string;
  ResultData: any;  // 場地人員清單
  PlaceInfo: any;  // 場地資訊
  PlacePeopleCount: any; // 場人已報名人數
  displayedColumns: string[] = ['NickName', 'Sex', 'PeopleCount', 'CreateDate']; // 表格TITLE的清單

  constructor(private route: ActivatedRoute , public PlaceUtil: PlaceService , private httpClient: HttpClient) {
    this.PlaceUtil = new PlaceService(httpClient);
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.PlaceID = params.get('PlaceID');
      console.log('收到的PlaceID:' + this.PlaceID);

      this.PlaceUtil.getPlaceDetail(this.PlaceID)
      .pipe(
        tap(_ => console.log('getPlaceDetail:' + _)),
        map(data => {
          // data = JSON.parse(data['data']);
          this.ResultData = data;
        })

      )
      .subscribe(
        () => {
          console.log('Observer got a complete notification');
          this.PlaceUtil.getPlaceInfo(this.PlaceID)
          .pipe(
            tap( _ => console.log('getPlaceInfo:' + _)),
            tap( _ => {
              this.PlaceInfo = _;
              }
            )
          )
          .subscribe();

          this.PlaceUtil.getPlacePeopleCount(this.PlaceID)
          .pipe(
            tap( _ => console.log('getPlacePeopleCount:' + _)),
            tap( _ => this.PlacePeopleCount = _ )
          )
          .subscribe();

          console.log('查完的結果:' + this.ResultData);
        }
      );
    });






  }

}
