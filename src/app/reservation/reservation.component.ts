import { Component, OnInit } from '@angular/core';
import { MatSidenav, MatDrawerToggleResult } from '@angular/material';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  constructor() { }

  ngOnInit() {}
  toggleSideNav(sideNav: MatSidenav) {
    sideNav.toggle().then((result: MatDrawerToggleResult) => {
      console.log(result);
      // console.log(`選單狀態：${result}`);
    });
  }

  opened() {
    console.log('芝麻開門');
  }

  closed() {
    console.log('芝麻關門');
  }

}


