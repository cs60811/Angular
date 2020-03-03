import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, distinct , catchError , filter, shareReplay } from 'rxjs/operators';
import { of, from , Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { PlaceService } from '../Service/place.service';


interface BillboardMap {
  ID: any;
  Title: any;
  Content: any;
  Reference: any;
  Importance: any;
  Daft: any;
  StartDate: any;
  EndDate: any;
  UpdateDate: any;
  Creator: any;
}


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  providers: [ PlaceService ]
})



export class IndexComponent implements OnInit {
  BillboardData: BillboardMap[] = [];
  BillboardDataOB$: any;



  constructor(private httpClient: HttpClient , private sanitized: DomSanitizer , private PlaceUtil: PlaceService) {
   }

  programName = 'index'; // 預設頁面是第一隻程式

  ngOnInit() {
    this.getBillboardMap();
    this.PlaceUtil.test();
  }

  /**
   * 取得公布欄資料
   */
  getBillboardMaps(): Observable<BillboardMap[]> {
    const Paramater = '?PID=Index&AID=GetBillboardData';
    const APIURL = 'https://script.google.com/macros/s/AKfycbwC3XKfgUHRy_NbBHMwfrEwALyAwLKAciPeg5k775uIIjf4SG0x/exec' + Paramater;
    return this.httpClient.get<BillboardMap[]>(APIURL).pipe(
          tap(_ => console.log('fetched BillboardMaps'))
        );
  }


  getBillboardMap(): void {

    this.getBillboardMaps().pipe(
      map(
        data => JSON.parse(data.toString())
      ),
      map(
        item => {
           from<any[]>(item).pipe().subscribe(data => {
              // return data;
              this.BillboardData.push(data);
            });

        }
      ),
      shareReplay(1) ,
      tap ( _ => console.log(_))
    ).subscribe( next => {console.log(this.BillboardData); } );
  }
  /**
   * 嚴重程度顏色調整
   */
  setMyStyles(ele: string) {
    const styles = {'width.px': '20',
      'height.px': '20',
      'background-color': ele === 'Height' ? 'red' : ele === 'medium' ? 'yellow' : ele === 'medium' ? 'yellow' : 'black',
      margin: '0px auto'
    };
    return styles;
  }

  setImportance(ele: string) {
    return ele === 'Height' ? '極重要' : ele === 'medium' ? '重要' : '一般';
  }

  transform(value: string) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}
