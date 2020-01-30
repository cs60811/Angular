import { Component, OnInit, Input ,Output } from '@angular/core';
import { MatSidenav, MatDrawerToggleResult } from '@angular/material';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor() { }

  programName = 'index'; // 預設頁面是第一隻程式

  ngOnInit() {
  }

  toggleSideNav(sideNav: MatSidenav) {
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
  }
}
