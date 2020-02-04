import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, distinct } from 'rxjs/operators';



interface PlaceTable {
  ID: string;
  Place: string;
  Date: Date;
  Time: string;
  Max: string;
  Accept: string;
  Owner: string;
  CreateDate: Date;
}

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})



export class IndexComponent implements OnInit {

  httpClient: any;
  data: any;
  PlaceList: PlaceTable;
  errorMessage: any;


  constructor(private http: HttpClient) {
   }

  programName = 'index'; // 預設頁面是第一隻程式

  ngOnInit() {



    const url = 'https://script.google.com/macros/s/AKfycbwC3XKfgUHRy_NbBHMwfrEwALyAwLKAciPeg5k775uIIjf4SG0x/exec?Name=LINE';
    this.http.get<any>(url).subscribe(data => {
      this.data = data;
      console.warn(data);
    });


    // tslint:disable-next-line: max-line-length
    const Paramater = '?PID=Place&AID=GetPlaceMap';
    const PlaceListURL = 'https://script.google.com/macros/s/AKfycbwC3XKfgUHRy_NbBHMwfrEwALyAwLKAciPeg5k775uIIjf4SG0x/exec' + Paramater;
    this.PlaceList = this.http.post<PlaceTable>(PlaceListURL , null , {}).pipe(
      map((data: PlaceTable) => JSON(data)),
      tap(item => console.log(item)),
      distinct((data: PlaceTable ) => [data.Place] ),
      tap(item => console.log(item))
    ).subscribe(
      data => {
        // tslint:disable-next-line: no-shadowed-variable
        distinct(( data: any ) => [data.Place]);
        this.PlaceList = data;
      }
    );


    /*this.http.post<ComboboxData>(PlaceListURL , null , {}).subscribe(
      map => (data:any) => {
        return data;
      },
      data => {
      this.PlaceList = data;
      console.warn(this.PlaceList);
    }, error =>  {
      this.errorMessage = error;
    });*/
  }

  converArray( qq: any ) {
    return Array.from(qq);
 }





  /*toggleSideNav(sideNav: MatSidenav) {
    sideNav.toggle().then((result: MatDrawerToggleResult) => {
      console.log(result);
      // console.log(`選單狀態：${result}`);
    });
  }
  show(item: string) {
    this.programName = item;
  }

  opened() {
    console.log('芝麻開門');
  }

  closed() {
    console.log('芝麻關門');
  }*/
}
